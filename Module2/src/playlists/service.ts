import Song from "../songs/Song"
import SongRepository from "../songs/repository"
import PlaylistRepository from "./repository"

class PlaylistService {
	private playlistRepo: PlaylistRepository
	private songRepo: SongRepository

	constructor(playlistRepo: PlaylistRepository, songRepo: SongRepository) {
		this.playlistRepo = playlistRepo
		this.songRepo = songRepo
	}

	findPlaylistByID = (playlistID: number) => {
		const playlist = this.playlistRepo.findPlaylistByID(playlistID)
		if (!playlist) {
			throw new Error("Playlist not found")
		}

		return playlist
	}

	addSongToPlaylist = (songID: number, playlistID: number) => {
		const song = this.songRepo.findSongByID(songID)
		if (!song) {
			throw new Error("Song not found!")
		}

		const playlist = this.playlistRepo.findPlaylistByID(playlistID)
		if (!playlist) {
			throw new Error("Playlist not found!")
		}

		const songExist = playlist.songs.some((v) => v.id === song.id)
		if (songExist) {
			throw new Error("Song already exists in playlist!")
		}

		playlist.songs.push(song)
		this.playlistRepo.updatePlaylist(playlist)
	}

	createPlaylist = (playlistName: string) => {
		this.playlistRepo.createPlaylist(playlistName)
	}

	listPlaylists = () => {
		const playlists = this.playlistRepo.listPlaylists()
		return playlists
	}
}

export default PlaylistService
