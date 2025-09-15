import express from 'express'
import { createBlog, deleteAllBlogs, deleteBlogById, getAllBlogs, getBlogById, updateBlog } from '../controller/blogContoller.js';
import { upload } from '../middileware/multer.js';
import { authMiddleware } from '../middileware/authMiddleware.js';


const blogRouter = express.Router();

blogRouter.post('/',authMiddleware,upload.single("file"), createBlog);
blogRouter.get('/',authMiddleware,getAllBlogs);
blogRouter.get('/public',getAllBlogs);
blogRouter.get('/:id',authMiddleware,getBlogById);
blogRouter.delete('/:id',authMiddleware,deleteBlogById);
blogRouter.delete('/',authMiddleware,deleteAllBlogs);
blogRouter.put('/:id',authMiddleware,upload.single("file"),updateBlog);

export default blogRouter;