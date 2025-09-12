import multer from "multer";

// Store PDFs in memory
const storage = multer.memoryStorage();

// Allow only PDF
const pdfFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") cb(null, true);
  else cb(new Error("Only PDF files are allowed!"), false);
};

// Limit 10MB per file
const limits = { fileSize: 10 * 1024 * 1024 };

export const uploadPdf = multer({ storage, fileFilter: pdfFilter, limits });
