import { UserRep } from "../../../domain/repositories/UserRepository";
import bcrypt from "bcrypt";

export class LoginUser {
    constructor(private userrepo: UserRep) {
    }
    async execute(email: string, password: string) {
        try {
            // 1. جلب المستخدم من قاعدة البيانات
            const user = await this.userrepo.findByEmail(email);
            if (!user) {
                throw new Error("User not found");
            }

            // 2. التحقق من كلمة المرور
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new Error("Invalid password");
            }

            // 3. إرجاع المستخدم إذا كل شيء صحيح
            return user;

        } catch (err) {
            // 4. تسجيل الخطأ وإعادة رميه
            console.error("❌ Error in LoginUser:", err);
            throw err;
        }
    }
}

