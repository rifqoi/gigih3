import { Request, Response, Router } from "express"
import SongService from "./service"
import { validate } from "../middleware"
import { FindSongSchema, InputSongSchema } from "./schema"

type FindSongs = {
	title?: string
	artist?: string
	sort?: string
}

type InputSong = {
	title: string
	artists: string[]
	url: string
}

type FindSongByID = {
	id: string
}

class SongController {
	private songService: SongService
	public router = Router()

	constructor(songService: SongService) {
		this.songService = songService
		this.initializeRoutes()
	}

	initializeRoutes() {
		this.router.post("/songs", validate(InputSongSchema), this.addSong)
		this.router.get("/songs", this.findSongs)
		this.router.get("/songs/:id", validate(FindSongSchema), this.findSongByID)
		this.router.post("/songs/play/:id", validate(FindSongSchema), this.playSong)
	}

	findSongByID = (req: Request<FindSongByID>, res: Response) => {
		const id = Number(req.params.id)

		const song = this.songService.findSongByID(id)
		try {
			res
				.json({
					msg: "fetch success",
					data: song,
				})
				.status(200)
		} catch (e) {
			if (e instanceof Error) res.json({ error: e.message }).status(500)
		}
	}
	addSong = (req: Request<any, any, InputSong>, res: Response) => {
		const { title, artists, url } = req.body

		try {
			this.songService.addSong(title, artists, url)
			res.json({
				msg: "song added!",
			})
		} catch (e) {
			if (e instanceof Error) res.json({ error: e.message }).status(500)
		}
	}

	findSongs = (req: Request<any, any, any, FindSongs>, res: Response) => {
		const { title, artist, sort } = req.query

		try {
			const song = this.songService.findSongs(title, artist, sort)
			res.status(200).json({
				msg: "Sucessfully get songs",
				data: song,
			})
		} catch (e) {
			if (e instanceof Error) res.json({ error: e.message }).status(500)
		}
	}

	playSong = (req: Request<FindSongByID>, res: Response) => {
		const id = Number(req.params.id)
		try {
			const song = this.songService.playSong(id)
			res.status(200).json({
				msg: "Song played!",
				data: song,
			})
		} catch (e) {
			if (e instanceof Error) res.json({ error: e.message }).status(500)
		}
	}
}

export default SongController
