export class File {
    constructor(
        public id: string,            // unique ID (UUID or DB ID)
        public name: string,          // file name (e.g., "photo.png")
        public mimeType: string,      // content type (e.g., "image/png")
        public size: number,          // file size in bytes
        public ownerId: string,       // reference to the User who owns it
        public created_at: Date,       // when file was uploaded
        public updated_at: Date) {
    }
}