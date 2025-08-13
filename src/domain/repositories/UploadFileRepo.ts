import { File } from "../entities/File_Entities"

export interface FileRepo {
    upload(file: File): Promise<void>
    getFile(file: string): Promise<File | null>
}