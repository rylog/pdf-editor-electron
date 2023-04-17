// import fs from 'fs';
import { PDFDocument, StandardFonts } from 'pdf-lib';

const createPdf = async (): Promise<void> => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const text = 'Hello, World!';
  page.drawText(text, {
    x: 50,
    y: 500,
    size: 50,
    font,
  });

  const pdfBytes = await pdfDoc.save();
  // fs.writeFileSync('output.pdf', pdfBytes);
};

const PdfGenerator = {
  createPdf,
};

export default PdfGenerator;
