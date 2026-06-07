import express,{ Request, Response } from 'express';
import dotenv from 'dotenv';
import allRoutes from './routes/allRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
// health check route

app.get("/health", (req:Request, res:Response) => {
    return res.status(200).json({
        status: true,
        message: "Server is healthy"
    })
})

app.use("/api/v1",allRoutes)


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})