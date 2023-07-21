import { Router, Request, Response } from "express"
import PlaylistService from "./service"
import { validate } from "../middleware"
import {
	AddSongToPlaylistSchema,
	FindPlaylistByIDSchema,
	InputPlaylistSchema,
} from "./schema"

type InputPlaylistReq = {
	name: string
}

type AddSongToPlaylistReq = {
	songID: string
	playlistID: string
}

type FindByIDReq = {
	id: string
}

class PlaylistController {
	playlistService: PlaylistService
	router: Router = Router()

	constructor(playlistService: PlaylistService) {
		this.playlistService = playlistService
		this.initializeRoutes()
	}

	initializeRoutes() {
		this.router.get(
			"/playlists/:id",
			validate(FindPlaylistByIDSchema),
			this.findPlaylistByID
		)
		this.router.get("/playlists", this.listPlaylists)
		this.router.post(
			"/playlists",
			validate(InputPlaylistSchema),
			this.createPlaylist
		)
		this.router.post(
			"/playlists/song",
			validate(AddSongToPlaylistSchema),
			this.addSongToPlaylist
		)
	}

	listPlaylists = (_req: Request, res: Response) => {
		try {
			const playlists = this.playlistService.listPlaylists()
			res.status(200).json({
				msg: "fetch playlist",
				data: playlists,
			})
		} catch (e) {
			if (e instanceof Error) res.json({ error: e.message }).status(500)
		}
	}

	createPlaylist = (
		req: Request<any, any, InputPlaylistReq>,
		res: Response
	) => {
		const { name } = req.body

		try {
			this.playlistService.createPlaylist(name)
			res.status(200).json({
				msg: "Playlist sucessfully created!",
			})
		} catch (e) {
			if (e instanceof Error) res.json({ error: e.message }).status(500)
		}
	}

	addSongToPlaylist = (
		req: Request<any, any, AddSongToPlaylistReq>,
		res: Response
	) => {
		const songID = Number(req.body.songID)
		const playlistID = Number(req.body.playlistID)
		try {
			this.playlistService.addSongToPlaylist(songID, playlistID)
			res.status(200).json({
				msg: "Song added to playlist!",
			})
		} catch (e) {
			if (e instanceof Error) res.json({ error: e.message }).status(500)
		}
	}
	findPlaylistByID = (req: Request<FindByIDReq>, res: Response) => {
		const id = Number(req.params.id)
		try {
			const playlist = this.playlistService.findPlaylistByID(id)
			res.status(200).json({
				msg: "Sucessfully fetch playlist!",
				data: playlist,
			})
		} catch (e) {
			if (e instanceof Error) res.json({ error: e.message }).status(500)
		}
	}
}

export default PlaylistController
