import { z } from "zod"

export type CommentResponse = {
	username: string
	comment: string
	timestamp: Date
}

export const FindCommentByID = z.object({
	params: z.object({
		videoID: z.number({
			coerce: true,
			required_error: "videoID is required!",
		}),
	}),
})

export type FindCommentByIDReq = {
	videoID: string
}

export const PostComment = z.object({
	body: z.object({
		// videoID: z.number({
		// 	coerce: true,
		// 	required_error: "videoID is required!",
		// }),
		username: z.string({
			required_error: "username is required!",
		}),
		comment: z
			.string({
				required_error: "comment is required!",
			})
			.max(50),
	}),
})

export type PostComment = {
	body: {
		username: string
		comment: string
	}
	params: {
		videoID: string
	}
}
