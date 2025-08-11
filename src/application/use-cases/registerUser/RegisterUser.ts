import type { User } from "../../../domain/entities/File";
import type { UserRep } from "../../../domain/repositories/UserRepository";

export class RegistserUser {
    constructor(private userrepo: UserRep) {
    }
    async execute(email: string, password: string, username: string) {
        const existing = await this.userrepo.findByEmail(email)
        if (existing) throw new Error('User Exists')
        // const hashed = await hashPass(password, 10)
        const user: User = {
            id: crypto.randomUUID(),
            password: password,
            email: email,
            username: username
        }
        await this.userrepo.create(user)
    }
}
 