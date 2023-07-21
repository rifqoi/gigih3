import { z } from "zod"

export const InputPlaylistSchema = z.object({
	body: z.object({
		name: z.string({
			required_error: "Name for playlist is required!",
		}),
	}),
})

export const AddSongToPlaylistSchema = z.object({
	body: z.object({
		songID: z.number({
			required_error: "songID is required!",
		}),
		playlistID: z.number({
			required_error: "playlistID is required!",
		}),
	}),
})

export const FindPlaylistByIDSchema = z.object({
	params: z.object({
		id: z.number({
			coerce: true,
			required_error: "Id is required!",
		}),
	}),
})
