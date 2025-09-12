import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadPdfToCloudinary = async (buffer, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "raw", //  raw for pdf/doc/txt
        folder: folder || "pdf_uploads",
        format: "pdf",
      },
      (error, result) => {
        if (error) reject(error);
        else resolve({
            url: result.secure_url,
            public_id: result.public_id,
        });
      }
    );
    stream.end(buffer);
  });
};

export const deletePDFfromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: "raw" });
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    throw error;
  }
};