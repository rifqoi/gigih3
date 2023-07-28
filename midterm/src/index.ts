import express, { Request, Response } from "express"
import VideoController from "./videos/controller"
import mongoose from "mongoose"
import logger from "pino-http"

const app = express()

app.use(logger())
app.use(express.json())
app.use(
	express.urlencoded({
		extended: true,
	})
)

const videoController = new VideoController()

app.use("/", videoController.router)

const port = 8000

const start = async (): Promise<void> => {
	try {
		await mongoose.connect(
			"mongodb://tokopediaAdmin:password@localhost:27017/tokopedia-play"
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
