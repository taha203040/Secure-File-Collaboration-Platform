import type { User } from "../../../domain/entities/File";
import type { UserRep } from "../../../domain/repositories/UserRepository";
import bcrypt from "bcrypt";

export class RegistserUser {
    constructor(private userrepo: UserRep) {
    }
    async execute(email: string, password: string, username: string) {
        const existing = await this.userrepo.findByEmail(email)
        if (existing) throw new Error('User not Exists')
        const hashed = await bcrypt.hash(password, 10)
        const user: User = {
            id: crypto.randomUUID(),
            password: hashed,
            email: email,
            username: username
        }
        await this.userrepo.create(user)
    }
}

// defin the constructor  
