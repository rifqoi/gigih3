import express, { Request, Response } from "express"
import VideoController from "./videos/controller"
import mongoose from "mongoose"
import logger from "pino-http"
import ProductController from "./products/controller"
import CommentController from "./comments/controller"
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME } from "./config"

const app = express()

// For socket.io
// import http from "http"
// import { Server } from "socket.io"
// const server = http.createServer(app)
// const io = new Server(server)

app.use(logger())
app.use(express.json())
app.use(
	express.urlencoded({
		extended: true,
	})
)

const videoController = new VideoController()
const productController = new ProductController()
const commentController = new CommentController()

// commentController.receiveMessage(io)

app.use("/", videoController.router)
app.use("/", productController.router)
app.use("/", commentController.router)

const port = 8000

console.log(DB_USERNAME)

const start = async (): Promise<void> => {
	try {
		await mongoose.connect(
			`mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
		)
		app.listen(port, () => {
			console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
		})
	} catch (error) {
		console.error(error)
		process.exit(1)
	}
}

void start()
