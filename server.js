import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './src/config/mongodb.js';
import authRouter from './src/routes/authRoute.js';
import blogRouter from './src/routes/blogRoute.js';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 4010;
connectDB();


app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({
    credentials:true
}));

//API ENDpoints

app.use('/api/auth', authRouter);
app.use('/api/blog', blogRouter);



app.get('/', (req,res) => res.send('welcome to Backend'));

app.listen(port,()=> console.log(`Server start on PORT:${port}`));