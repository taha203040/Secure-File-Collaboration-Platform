import { Router, Request, Response } from "express"
import { RegistserUser } from "../../../application/use-cases/registerUser/RegisterUser"
import { UserRepoMongo } from "../../../domain/repositories/UserRepoMongoDb"
import { getDb } from "../../../infrastructure/database/mongoDb/mongoClient"
const userRouter = Router()
userRouter.post('/register', async (req: Request, res: Response) => {
    try {
        const { username, password, email } = req.body
        if (!username || !password || !email) {
            return res.status(400).json({ error: "All fields are required" })
        }
        const userrepo = new UserRepoMongo(getDb())
        const userRegister = new RegistserUser(userrepo)
        await userRegister.execute(email, password, username)
        res.status(201).json({ message: "User registered successfully" })
    } catch (err) {
        console.error(err)
    }
})
export default userRouter