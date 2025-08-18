import { Request, Response, Router } from "express";
import { FileRepoPostgres } from "../../../infrastructure/database/Sql/PostgresLogic";
import { UploadFile } from "../../../application/use-cases/uploadFile/uploadFile";
import multer from "multer";
import pool from "../../../config/db";
import crypto from "crypto";
import { authenticate } from "../middlewares/authMiddleware";
import { fileScan } from "../../../infrastructure/security/fileChecker";
const filerouter = Router();
const upload = multer({ dest: "uploads/" });

filerouter.post(
    "/upload"
    , authenticate,
    // authenticate, // 👈 protect this route
    upload.single("file"),
    async (req: Request, res: Response) => {
        try {
            const { originalname, mimetype, size } = req.file as Express.Multer.File;
            const filerepo = new FileRepoPostgres(pool);
            const uploadfile = new UploadFile(filerepo);
            const random = crypto.randomUUID();
            const file = await uploadfile.execute(originalname, mimetype, size, random);
            await fileScan("uploads/"),
                console.log("File scanned successfully");
            res.status(201).json(file);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Failed to upload file" });
        }
    }
);

export default filerouter;
