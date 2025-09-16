import express from "express";
import {
  createResume,
  getAllResumes,
  getResumeById,
  updateResume,
  deleteResumeById,
  deleteAllResumes,
} from "../controller/resumeController.js";
import {uploadPdf} from '../middileware/pdfmulter.js'

const resumeRouter = express.Router();

// Create Resume
resumeRouter.post("/", uploadPdf.single("file"), createResume);

// Get All Resumes
resumeRouter.get("/", getAllResumes);

// Get Resume by ID
resumeRouter.get("/:id", getResumeById);

// Update Resume
resumeRouter.put("/:id", uploadPdf.single("file"), updateResume);

// Delete Resume by ID
resumeRouter.delete("/:id", deleteResumeById);

// Delete All Resumes
resumeRouter.delete("/", deleteAllResumes);

export default resumeRouter;
