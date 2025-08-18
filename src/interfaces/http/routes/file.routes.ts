import { Request, Response, Router } from "express";
import { FileRepoPostgres } from "../../../Infrastructure/database/Sql/PostgresLogic";
import { UploadFile } from "../../../Application/use-cases/File-usecases/uploadFile";
import multer from "multer";
import pool from "../../../Config/db";
import crypto from "crypto";
import { authenticate } from "../Middlewares/authMiddleware";
// import { fileScan } from "../../../Infrastructure/security/fileChecker";
import { GetFiles } from "../../../Application/use-cases/File-usecases/Files_Gets";
import { GetFileByid } from "../../../Application/use-cases/File-usecases/GetfileByid";
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
            // await fileScan("uploads/"),
            console.log("File scanned successfully");
            res.status(201).json(file);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Failed to upload file" });
        }
    }
)
filerouter.post("/generate:id", authenticate, async (req: Request, res: Response) => {
    const { id } = req.params
    // check if the id in db after we genreate a link file and be temporaly
    const filerepo = new FileRepoPostgres(pool);
    const getFiles = new GetFileByid(filerepo);

})
filerouter.get("/file/:id", authenticate, async (req: Request, res: Response) => {
    // extract id of file
    const { id } = req.params
    // If the file is in 
    if (id) {
        const filerepo = new FileRepoPostgres(pool);
        const getFiles = new GetFileByid(filerepo)
        const file = await getFiles.execute(id)
        if (file) {
            res.send({ file })
        }
    }
    else {
        res.send({ msg: " file not found" })
    }
})
filerouter.get("/getfiles", authenticate, async (req: Request, res: Response) => {
    try {
        const filerepo = new FileRepoPostgres(pool);
        const getFiles = new GetFiles(filerepo);

        const files = await getFiles.execute();
        if (files.length === 0) {
            res.send({ msg: 'Not Found' })
        }
        res.status(200).json({ files });
    } catch (error) {
        res.status(404).json({ message: "No files found" });
    }
});

export default filerouter;
