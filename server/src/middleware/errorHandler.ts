import type { NextFunction, Request, Response } from 'express';

export const errorHandler = (error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(error);
  if (error instanceof Error) {
    res.status(500).json({ message: error.message });
  } else {
    res.status(500).json({ message: 'Unexpected error' });
  }
};
