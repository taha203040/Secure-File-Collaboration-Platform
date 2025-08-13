import express, { type Request, type Response } from 'express';
import { connectMongodb, getDb } from './infrastructure/database/mongoDb/mongoClient';
import userRouter from './interfaces/http/routes/user.routes';
import filerouter from './interfaces/http/routes/file.routes';
const app = express();
app.use(express.json());
app.use('/api/v1/users', userRouter);
app.use('/api/v1/files', filerouter);

async function startServer() {
    await connectMongodb("mongodb://localhost:27017/", "mydb");
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
