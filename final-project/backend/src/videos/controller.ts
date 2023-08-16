import { Router, Request, Response } from "express"
import {
	FindVideoByIDReq,
	FindVideoByIDSchema,
	FindVideos,
	InputVideoReq,
	InputVideoSchema,
	UpdateVideoReq,
	UpdateVideoSchema,
	VideoResponse,
} from "./schema"
import VideoModel from "./videos"
import { handleControllerError } from "../error"
import { validate } from "../middleware"

class VideoController {
	basePath: string = "/videos"
	router: Router = Router()

	constructor() {
		this.initizalizeRoutes()
	}

	initizalizeRoutes() {
		this.router.get(
			`${this.basePath}/:id`,
			validate(FindVideoByIDSchema),
			this.findVideoByID
		)

		this.router.get(`${this.basePath}/`, this.findVideos)

		this.router.delete(
			`${this.basePath}/:id`,
			validate(FindVideoByIDSchema),
			this.deleteVideoByID
		)

		this.router.post(
			`${this.basePath}/`,
			validate(InputVideoSchema),
			this.addVideo
		)

		this.router.put(
			`${this.basePath}/`,
			validate(UpdateVideoSchema),
			this.updateVideoByID
		)
	}

	addVideo = (req: Request<any, any, InputVideoReq["body"]>, res: Response) => {
		const { title, thumbnailURL, videoURL } = req.body

		try {
			VideoModel.addVideo(title, thumbnailURL, videoURL)
			res.status(200).json({
				msg: "Sucessfully created the video",
			})
		} catch (error) {
			handleControllerError(error, res)
		}
	}
	findVideos = async (
		req: Request<any, any, any, FindVideos["query"]>,
		res: Response
	) => {
		const id = Number(req.params.id)
		try {
			const { query } = req.query
			const videos = await VideoModel.findVideos(query)
			if (!videos || videos === null) {
				res.status(404).json({
					msg: "Video not found!",
				})
				return
			}

			const resData: VideoResponse[] = []
			videos.map((video) => {
				resData.push({
					id: video._id,
					title: video.title,
					thumbnailURL: video.thumbnailURL,
					videoURL: video.videoURL,
				} as VideoResponse)
			})

			res.status(200).json({
				msg: "Sucessfully find the video",
				data: resData,
			})
		} catch (error) {
			handleControllerError(error, res)
		}
	}

	findVideoByID = async (req: Request<FindVideoByIDReq>, res: Response) => {
		const id = Number(req.params.id)
		try {
			const video = await VideoModel.findVideoByID(id)
			if (!video || video === null) {
				res.status(404).json({
					msg: "Video not found!",
				})
				return
			}

			const resData: VideoResponse = {
				id: video._id,
				title: video.title,
				thumbnailURL: video.thumbnailURL,
				videoURL: video.videoURL,
			}

			res.status(200).json({
				msg: "Sucessfully find the video",
				data: resData,
			})
		} catch (error) {
			handleControllerError(error, res)
		}
	}

	deleteVideoByID = async (req: Request<FindVideoByIDReq>, res: Response) => {
		const id = Number(req.params.id)
		try {
			const video = await VideoModel.deleteVideoByID(id)

			res.status(200).json({
				msg: `Video with id ${id} sucessfully deleted!`,
			})
		} catch (error) {
			handleControllerError(error, res)
		}
	}

	updateVideoByID = async (
		req: Request<any, any, UpdateVideoReq["body"]>,
		res: Response
	) => {
		const { id, title, thumbnailURL, videoURL } = req.body
		try {
			const video = await VideoModel.findVideoByID(id)
			if (!video || video === null) {
				res.status(404).json({
					msg: "Video not found!",
				})
				return
			}

			await video.updateVideo(title, thumbnailURL, videoURL)
			res.status(200).json({
				msg: "Video is updated!",
			})
		} catch (error) {
			handleControllerError(error, res)
		}
	}
}

export default VideoController
