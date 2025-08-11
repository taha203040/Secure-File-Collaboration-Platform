import { User } from '../entities/File'
export interface UserRep {
    create(user: User): Promise<void>
    findByEmail(email: string): Promise<User | null>
}