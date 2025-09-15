import expess from 'express';
import { authMiddleware } from "../middileware/authMiddleware.js";
import { login, logout, register,refresh, getAllUsers, deleteUsers } from '../controller/authController.js';

const authRouter = expess.Router();

authRouter.post('/register',register);
authRouter.post('/admin-register',authMiddleware,register);
authRouter.get("/allusers", authMiddleware, getAllUsers); 
authRouter.delete("/deleteuser/:id", authMiddleware, deleteUsers); 
authRouter.post('/login',login);
authRouter.post('/logout',logout);
authRouter.post("/refresh", refresh);
authRouter.get("/profile", authMiddleware, (req, res) => {
  res.json({ success: true, user: req.user });
});

export default authRouter;