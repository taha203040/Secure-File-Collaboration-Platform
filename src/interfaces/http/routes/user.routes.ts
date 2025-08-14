import { Router, Request, Response } from "express"
import { RegistserUser } from "../../../application/use-cases/registerUser/RegisterUser"
import { LoginUser } from "../../../application/use-cases/registerUser/LoginUser"
import { UserRepoPostgress } from "../../../infrastructure/database/Sql/PostgresLogic"
import pool from "../../../config/db"

const userRouter = Router()
userRouter.post('/register', async (req: Request, res: Response) => {
    try {
        const { username, password, email } = req.body
        if (!username || !password || !email) {
            return res.status(400).json({ error: "All fields are required" })
        }
        const userrepo = new UserRepoPostgress(pool)
        const userRegister = new RegistserUser(userrepo)
        await userRegister.execute(email, password, username)
        res.status(201).json({ message: "User registered successfully" })
    } catch (err) {
        console.error(err)
    }
})
userRouter.get('/signin', async (req: Request, res: Response) => {
    try {
        const { password, email } = req.body
        if (!password || !email)
            return res.status(400).json({ error: "All fields are required" })

        const userrepo = new UserRepoPostgress(pool)
        const loginUser = new LoginUser(userrepo)
        await loginUser.execute(email, password)
        res.status(201).json({ message: "User registered successfully" })
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
})

export default userRouter 