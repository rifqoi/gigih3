import { z } from "zod"

export const InputSongSchema = z.object({
	body: z.object({
		title: z.string({
			required_error: "Title is required!",
		}),
		artists: z.array(
			z.string({
				required_error: "Artists is required!",
			})
		),
		url: z
			.string({
				required_error: "URL is required!",
			})
			.url(),
	}),
})

export const FindSongSchema = z.object({
	params: z.object({
		id: z.coerce.number({
			required_error: "ID must be a number",
		}),
	}),
})
