import PdfPrinter from 'pdfmake';
import path from 'node:path';
import type { TDocumentDefinitions } from 'pdfmake/interfaces';
import type { Document } from '@prisma/client';

const fonts = {
  Roboto: {
    normal: path.resolve('node_modules/pdfmake/fonts/Roboto-Regular.ttf'),
    bold: path.resolve('node_modules/pdfmake/fonts/Roboto-Medium.ttf'),
    italics: path.resolve('node_modules/pdfmake/fonts/Roboto-Italic.ttf'),
    bolditalics: path.resolve('node_modules/pdfmake/fonts/Roboto-MediumItalic.ttf')
  }
};

const printer = new PdfPrinter(fonts);

export const createDocumentPdf = async (document: Document & { lines: { itemName: string; quantity: number; unitPrice: number; amount: number }[] }) => {
  const docDefinition: TDocumentDefinitions = {
    content: [
      { text: 'Vehicle Management System Document', style: 'header' },
      { text: `Type: ${document.type}`, margin: [0, 10, 0, 0] },
      { text: `Issue Date: ${document.issueDate.toDateString()}` },
      { text: `Due Date: ${document.dueDate.toDateString()}` },
      {
        table: {
          headerRows: 1,
          widths: ['*', 'auto', 'auto', 'auto'],
          body: [
            ['Item', 'Qty', 'Unit Price', 'Amount'],
            ...document.lines.map((line) => [
              line.itemName,
              line.quantity,
              line.unitPrice,
              line.amount
            ])
          ]
        }
      },
      { text: `Subtotal: ${document.subtotal}` },
      { text: `Tax (${document.taxRate}%): ${document.tax}` },
      { text: `Total: ${document.total}`, style: 'total' }
    ],
    styles: {
      header: { fontSize: 18, bold: true },
      total: { bold: true, margin: [0, 10, 0, 0] }
    }
  };

  return printer.createPdfKitDocument(docDefinition);
};
