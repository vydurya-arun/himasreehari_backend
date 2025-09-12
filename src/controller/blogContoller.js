import blogModel from "../models/blogModel.js";
import { uploadToCloudinary,deleteFromCloudinary } from "../utils/cloudinary.js";

export const createBlog = async(req, res) =>{
    try {
        const {title,description,tag,date}=req.body;
        

        if(!title || !description || !tag|| !date){
            return res.send(400).json({success:false,message:"invalid Field"})
        }

        // ✅ Ensure image is uploaded (because schema requires it)
        if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "Image is required",
        });
        }

    // Upload to Cloudinary using buffer instead of file path
        const cloudResult = await uploadToCloudinary(req.file.buffer, "himasreehari_blog");
        const Blogs = await blogModel.create({
            title,
            description,
            tag,
            date,
            imageUrl:cloudResult.url,
            imageId:cloudResult.public_id

        });
        return res.status(201).json({success:true, data:Blogs})

    } catch (error) {
        
    }
}

export const getAllBlogs = async(req,res) =>{
    try {
        const blogs = await blogModel.find();
        if(!blogs){
            return res.status(400).json({success:false, message:"Not found any Blogs"})
        }
        const count = blogs.length;
        return res.status(200).json({success:true, data:blogs,counts:count})
    } catch (error) {
        
    }
}

// ✅ Get Blog by ID
export const getBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await blogModel.findById(id);

        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        return res.status(200).json({ success: true, data: blog });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Delete Blog by ID
export const deleteBlogById = async (req, res) => {
    try {
        const { id } = req.params;

        const blog = await blogModel.findById(id);
        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        // Delete image from Cloudinary if exists
        if (blog.imageId) {
            await deleteFromCloudinary(blog.imageId);
        }

        await blogModel.findByIdAndDelete(id);

        return res.status(200).json({ success: true, message: "Blog deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Delete All Blogs
export const deleteAllBlogs = async (req, res) => {
    try {
        const blogs = await blogModel.find();

        if (blogs.length === 0) {
            return res.status(404).json({ success: false, message: "No blogs found to delete" });
        }

        // Delete all images from Cloudinary
        for (let blog of blogs) {
            if (blog.imageId) {
                await deleteFromCloudinary(blog.imageId);
            }
        }

        await blogModel.deleteMany();

        return res.status(200).json({ success: true, message: "All blogs deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Update Blog
export const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, tag, date } = req.body;

        let blog = await blogModel.findById(id);
        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        // If new image uploaded, delete old one & upload new
        let imageUrl = blog.imageUrl;
        let imageId = blog.imageId;
        if (req.file) {
            if (imageId) {
                await deleteFromCloudinary(imageId);
            }
            const cloudResult = await uploadToCloudinary(req.file.buffer, "himasreehari_blog");
            imageUrl = cloudResult.url;
            imageId = cloudResult.public_id;
        }

        blog = await blogModel.findByIdAndUpdate(
            id,
            { title, description, tag, date, imageUrl, imageId },
            { new: true, runValidators: true }
        );

        return res.status(200).json({ success: true, data: blog });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};