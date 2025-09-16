import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    resumePdfUrl: {
      type: String,
      required: true,
    },
    PdfId: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const resumeModel = mongoose.model("Resume", resumeSchema);

export default resumeModel;
