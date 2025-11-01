import type { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../config/prisma';
import { createDocumentPdf } from '../utils/pdf';

const documentLineSchema = z.object({
  itemName: z.string().min(1),
  description: z.string().min(1),
  quantity: z.number().int().positive(),
  unitPrice: z.number().nonnegative(),
  amount: z.number().nonnegative()
});

const documentSchema = z.object({
  type: z.enum(['QUOTATION', 'DELIVERY', 'INVOICE', 'RECEIPT']),
  issueDate: z.string().refine((value) => !Number.isNaN(Date.parse(value))),
  dueDate: z.string().refine((value) => !Number.isNaN(Date.parse(value))),
  customerId: z.string().uuid(),
  issuerId: z.string().uuid(),
  remarks: z.string().optional(),
  subtotal: z.number().nonnegative(),
  taxRate: z.number().nonnegative(),
  tax: z.number().nonnegative(),
  total: z.number().nonnegative(),
  lines: z.array(documentLineSchema).min(1)
});

export const listDocuments = async (req: Request, res: Response) => {
  const documents = await prisma.document.findMany({
    where: { type: req.query.type ? String(req.query.type) : undefined },
    include: { lines: true, customer: true, issuer: true },
    orderBy: { issueDate: 'desc' }
  });
  res.json({ data: documents, total: documents.length });
};

export const createDocument = async (req: Request, res: Response) => {
  const payload = documentSchema.parse(req.body);
  const document = await prisma.document.create({
    data: {
      type: payload.type,
      issueDate: new Date(payload.issueDate),
      dueDate: new Date(payload.dueDate),
      customerId: payload.customerId,
      issuerId: payload.issuerId,
      remarks: payload.remarks,
      subtotal: payload.subtotal,
      taxRate: payload.taxRate,
      tax: payload.tax,
      total: payload.total,
      lines: {
        create: payload.lines.map((line) => ({
          itemName: line.itemName,
          description: line.description,
          quantity: line.quantity,
          unitPrice: line.unitPrice,
          amount: line.amount
        }))
      }
    },
    include: { lines: true }
  });
  res.status(201).json(document);
};

export const downloadDocumentPdf = async (req: Request, res: Response) => {
  const document = await prisma.document.findUnique({
    where: { id: req.params.id },
    include: { lines: true, customer: true, issuer: true }
  });
  if (!document) {
    return res.status(404).json({ message: 'Document not found' });
  }
  const pdfDoc = await createDocumentPdf(document);
  res.setHeader('Content-Type', 'application/pdf');
  pdfDoc.pipe(res);
  pdfDoc.end();
};
