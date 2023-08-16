import { z } from "zod"

export type VideoResponse = {
	id: number
	title: string
	thumbnailURL: string
	videoURL: string
}

export const InputVideoSchema = z.object({
	body: z.object({
		title: z.string({
			required_error: "Title is required!",
		}),
		thumbnailURL: z
			.string({
				required_error: "thumbnailURL is required!",
			})
			.url("Not a valid URL."),
		videoURL: z
			.string({
				required_error: "thumbnailURL is required!",
			})
			.url("Not a valid URL."),
	}),
})

export type InputVideoReq = z.infer<typeof InputVideoSchema>

export const FindVideoByIDSchema = z.object({
	params: z.object({
		id: z.number({
			coerce: true,
			required_error: "Id is required!",
		}),
	}),
})

export type FindVideoByIDReq = {
	id: string
}

export const UpdateVideoSchema = z.object({
	body: z.object({
		id: z.number({
			required_error: "ID is required!",
		}),
		title: z.string({}).optional(),
		thumbnailURL: z.string({}).url("Not a valid URL.").optional(),
		videoURL: z.string({}).url("Not a valid URL.").optional(),
	}),
})

export type UpdateVideoReq = z.infer<typeof UpdateVideoSchema>

export const FindVideos = z.object({
	query: z.object({
		query: z.string().optional(),
	}),
})

export type FindVideos = z.infer<typeof FindVideos>
