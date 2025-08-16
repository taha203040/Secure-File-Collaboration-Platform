import { UserRep } from "../../../domain/repositories/UserRepository";
import { Jwt } from "../../../domain/repositories/jwtRepoDef";
import bcrypt from "bcrypt";

export class LoginUser {
    constructor(
        private userRepo: UserRep,
        private jwt: Jwt // <- inject JWT service
    ) { }

    async execute(email: string, password: string) {
        try {
            // 1. Find user
            const user = await this.userRepo.findByEmail(email);
            if (!user) {
                throw new Error("User not found");
            }

            // 2. Validate password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new Error("Invalid password");
            }

            // 3. Generate JWT token
            const token = await this.jwt.sign({ id: user.id, email: user.email }, '237948lkjsdlf20394', "1h");

            // 4. Return safe user data + token
            return {
                id: user.id,
                email: user.email,
                token
            };
        } catch (err) {
            console.error("❌ Error in LoginUser:", err);
            throw err;
        }
    }
}
