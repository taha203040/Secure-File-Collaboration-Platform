import { Pool } from "pg";
import { User } from "../../../domain/entities/User_Entities";
import { UserRep } from "../../../domain/repositories/UserRepository";

export class UserRepoPostgress implements UserRep {
    constructor(private pool: Pool) {
    }
    async create(user: User) {
        await this.pool.query("INSERT INTO users (email , password) VALUES ($1,$2)", [user.email, user.password])
    }
    async findByEmail(email: string): Promise<User | null> {
        const result = await this.pool.query("SELECT * FROM users WHERE email = $1", [email])
        return result.rows[0] || null
    }
}