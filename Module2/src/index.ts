import express, { Request, Response } from "express"
import SongRepository from "./songs/repository"
import SongService from "./songs/service"
import SongController from "./songs/controller"
import { songs, playlists } from "./data"
import PlaylistRepository from "./playlists/repository"
import PlaylistService from "./playlists/service"
import PlaylistController from "./playlists/controller"

const app = express()

app.use(express.json())
app.use(
	express.urlencoded({
		extended: true,
	})
)

const songRepo = new SongRepository(songs)
const songService = new SongService(songRepo)
const songController = new SongController(songService)

const playlistRepo = new PlaylistRepository(playlists)
const playlistService = new PlaylistService(playlistRepo, songRepo)
const playlistController = new PlaylistController(playlistService)

app.use("/", songController.router)
app.use("/", playlistController.router)

const port = 8000
app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
