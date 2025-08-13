import { File } from "../../../domain/entities/File_Entities";
import { FileRepo } from "../../../domain/repositories/UploadFileRepo";

export class UploadFile {
    constructor(private filerepo: FileRepo) {
    }
    async execute(name: string, mime_type: string, size: number, owner_id: string) {
        const file = new File(
            crypto.randomUUID(),
            name, mime_type, size, owner_id = crypto.randomUUID(), new Date(), new Date()
        )
        await this.filerepo.upload(file)
        return file
    }
}