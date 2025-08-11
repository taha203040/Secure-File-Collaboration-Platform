import express, { type Request, type Response } from 'express';
import { connectMongodb, getDb } from './infrastructure/database/mongoDb/mongoClient';
import userRouter from './interfaces/http/routes/user.routes';
const app = express();
app.use(express.json());
app.use('/users', userRouter);
async function startServer() {
    await connectMongodb("mongodb://localhost:27017/filers", "mydb");
    app.listen(3000, () => console.log('Server running on port 3000'));
}

startServer().catch(err => {
    console.error("Failed to start server:", err);
});
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World');
});
app.use('/users', userRouter);


app.listen(3000, () => console.log('Server running'));
