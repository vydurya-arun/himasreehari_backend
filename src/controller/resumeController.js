import resumeModel from "../models/resumeModel.js";
import { deletePDFfromCloudinary, uploadPdfToCloudinary } from "../utils/pdfCloudinary.js";

// ✅ Create Resume (uploading PDF to Cloudinary)
export const createResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "PDF file is required" });
    }

    // upload to cloudinary
    const { url, public_id } = await uploadPdfToCloudinary(req.file.buffer, "resumes");

    const { title } = req.body;
    const resume = new resumeModel({
      title,
      resumePdfUrl: url,
      PdfId: public_id,
      isActive:true,
    });

    const savedResume = await resume.save();
    res.status(201).json({ success: true, data: savedResume });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get All Resumes
export const getAllResumes = async (req, res) => {
  try {
    const resumes = await resumeModel.find();
    res.status(200).json({ success: true, data: resumes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get Resume by ID
export const getResumeById = async (req, res) => {
  try {
    const resume = await resumeModel.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({ success: false, message: "Resume not found" });
    }
    res.status(200).json({ success: true, data: resume });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update Resume (replace PDF in Cloudinary if new file uploaded)
export const updateResume = async (req, res) => {
  try {
    const resume = await resumeModel.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({ success: false, message: "Resume not found" });
    }

    let updatedData = req.body;

    if (req.file) {
      // delete old pdf
      if (resume.PdfId) {
        await deletePDFfromCloudinary(resume.PdfId);
      }
      // upload new pdf
      const { url, public_id } = await uploadPdfToCloudinary(req.file.buffer, "resumes");
      updatedData.resumePdfUrl = url;
      updatedData.PdfId = public_id;
    }

    const updatedResume = await resumeModel.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: updatedResume });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete Resume by ID (and remove from Cloudinary)
export const deleteResumeById = async (req, res) => {
  try {
    const resume = await resumeModel.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({ success: false, message: "Resume not found" });
    }

    if (resume.PdfId) {
      await deletePDFfromCloudinary(resume.PdfId);
    }

    await resume.deleteOne();
    res.status(200).json({ success: true, message: "Resume deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete All Resumes (and their PDFs in Cloudinary)
export const deleteAllResumes = async (req, res) => {
  try {
    const resumes = await resumeModel.find();

    // delete from cloudinary
    for (const resume of resumes) {
      if (resume.PdfId) {
        await deletePDFfromCloudinary(resume.PdfId);
      }
    }

    await resumeModel.deleteMany({});
    res.status(200).json({ success: true, message: "All resumes deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};