import { playlists } from "../data"
import Song, { sortSongs } from "../songs/Song"
import Playlist from "./Playlist"

class PlaylistRepository {
	private playlists: Playlist[]
	constructor(playlists: Playlist[]) {
		this.playlists = playlists
	}

	listPlaylists = (): Playlist[] => {
		console.log("masuk")
		let playlists = this.playlists.concat()
		console.log("masuk")
		playlists.forEach((playlist) => {
			playlist.songs = sortSongs(playlist.songs)
		})
		console.log("masuk")

		return playlists
	}

	findPlaylistByID = (id: number) => {
		return this.playlists.find((playlist) => playlist.id === id)
	}

	createPlaylist = (playlistName: string) => {
		const playlist = new Playlist(this.playlists.length++, playlistName, [])

		this.playlists.push(playlist)
	}

	updatePlaylist = (playlist: Playlist) => {
		this.playlists[playlist.id] = playlist
	}
}

export default PlaylistRepository
