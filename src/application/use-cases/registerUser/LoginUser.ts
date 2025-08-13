import { UserRep } from "../../../domain/repositories/UserRepository";
import bcrypt from "bcrypt";

export class LoginUser {
    constructor(private userrepo: UserRep) {
    }
    async execute(email: string, password: string) {
        try {
            const user = await this.userrepo.findByEmail(email);
            if (!user) {
                throw new Error("User not found");
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new Error("Invalid password");
            }
            return user;
        } catch (err) {
            console.error("❌ Error in LoginUser:", err);
            throw err;
        }
    }
}

