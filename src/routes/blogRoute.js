import express from 'express'
import { createBlog, deleteAllBlogs, deleteBlogById, getAllBlogs, getBlogById, updateBlog } from '../controller/blogContoller.js';
import { upload } from '../middileware/multer.js';
import { authMiddleware } from '../middileware/authMiddleware.js';


const blogRouter = express.Router();

blogRouter.post('/',upload.single("file"), createBlog);
blogRouter.get('/',authMiddleware,getAllBlogs);
blogRouter.get('/:id',getBlogById);
blogRouter.delete('/:id',deleteBlogById);
blogRouter.delete('/',deleteAllBlogs);
blogRouter.put('/:id',upload.single("file"),updateBlog);

export default blogRouter;