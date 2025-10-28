import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { errorHandler } from "./middlewares/errorHandler.middleware.js"

const app = express()

app.use(cors({
    // origin: "https://book-cart-rho.vercel.app",
    origin: "http://localhost:5173",
    credentials: true,
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

import userRouter from './routes/user.routes.js'
import recipeRouter from './routes/recipe.routes.js'
import likeRouter from './routes/like.routes.js'
import commentRouter from './routes/comment.routes.js'
import adminRouter from "./routes/admin.routes.js"

app.use("/api/v1/users", userRouter)
app.use("/api/v1/recipes", recipeRouter)
app.use("/api/v1/like", likeRouter)
app.use("/api/v1/comment", commentRouter)
app.use("/api/v1/admin", adminRouter)

app.use(errorHandler)

export { app }