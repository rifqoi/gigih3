import { Router, Request, Response } from "express"
import { Server } from "socket.io"
import {
	CommentResponse,
	FindCommentByID,
	FindCommentByIDReq,
	PostComment,
} from "./schema"
import CommentModel from "./comment"
import { handleControllerError } from "../error"
import { validate } from "../middleware"
import VideoModel from "../videos/videos"

// interface ServerToClientEvents {
// 	noArg: () => void
// 	basicEmit: (a: number, b: string, c: Buffer) => void
// 	withAck: (d: string, callback: (e: number) => void) => void
// }
//
// interface ClientToServerEvents {
// 	postComment: () => void
// }
//
// interface SocketData {
// 	name: string
// 	age: number
// }

class CommentController {
	basePath: string = "/comments"
	router: Router = Router()
	// io: Server

	constructor() {
		// this.io = io
		this.initializeRoutes()
	}

	initializeRoutes() {
		this.router.get(
			`${this.basePath}/video/:videoID`,
			validate(FindCommentByID),
			this.getComments
		)

		this.router.post(
			`${this.basePath}/video/:videoID`,
			validate(PostComment),
			this.postComment
		)
	}

	getComments = async (req: Request<FindCommentByIDReq>, res: Response) => {
		const videoID = Number(req.params.videoID)
		try {
			const video = await VideoModel.findVideoByID(videoID)
			if (!video || video === null) {
				res.status(404).json({
					msg: "Video not found!",
				})
				return
			}

			const resComments = await CommentModel.findCommentsByVideoID(videoID)

			const comments: CommentResponse[] = []
			resComments.map((value) => {
				const comment: CommentResponse = {
					comment: value.comment,
					username: value.username,
					timestamp: value.timestamp,
				}

				comments.push(comment)
			})
			res.status(200).json({
				msg: "Successfully find the comments!",
				data: comments,
			})
		} catch (error) {
			handleControllerError(error, res)
		}
	}

	postComment = async (
		req: Request<PostComment["params"], any, PostComment["body"]>,
		res: Response
	) => {
		const { username, comment } = req.body
		const videoID = Number(req.params.videoID)
		try {
			const video = await VideoModel.findVideoByID(videoID)
			if (!video || video === null) {
				res.status(404).json({
					msg: "Video not found!",
				})
				return
			}

			await CommentModel.addComment(videoID, username, comment)
			res.status(200).json({
				msg: "Successfully added the comment!",
			})
		} catch (error) {
			handleControllerError(error, res)
		}
	}

	// receiveMessage = () => {
	// 	const io = this.io as Server<
	// 		ClientToServerEvents,
	// 		ServerToClientEvents,
	// 		any,
	// 		SocketData
	// 	>
	//
	// 	io.on("connection", (socket) => {
	// 		socket.on("postComment", () => {})
	// 	})
	// }
}

export default CommentController
