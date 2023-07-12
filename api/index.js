import Express from "express";
const app = Express()

import authRoutes from "./routes/auth.js"
import commentRoutes from "./routes/comments.js"
import likeRoutes from "./routes/likes.js"
import postRoutes from "./routes/posts.js"
import userRoutes from "./routes/users.js"
import cookieParser from "cookie-parser";
import cors from "cors"

// MIDDLEWARES
app.use(Express.json())
app.use(cors())
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/comments", commentRoutes)
app.use("/api/likes", likeRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/users", userRoutes)

app.listen(8800, () => {
    console.log("Api Working")
})