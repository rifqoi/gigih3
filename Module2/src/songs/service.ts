import Song from "./Song"
import SongRepository, { ISongRepository } from "./repository"

class SongService {
	songRepo: ISongRepository

	constructor(songRepo: ISongRepository) {
		this.songRepo = songRepo
	}

	findSongByID(id: number): Song {
		const song = this.songRepo.findSongByID(id)
		if (!song) {
			throw new Error(`Song with ${id} id not found!`)
		}

		return song
	}

	findSongs(title?: string, artists?: string, sort?: string): Song[] {
		const song = this.songRepo.findSongs(title, artists, sort)
		if (!song) {
			throw new Error(`Song not found`)
		}

		return song
	}

	addSong(title: string, artists: string[], url: string) {
		this.songRepo.insertSong(title, artists, url)
	}

	playSong(id: number) {
		const song = this.songRepo.findSongByID(id)
		if (!song) {
			throw new Error("Song not found")
		}

		song.songPlayed++
		this.songRepo.updateSong(song)

		return song
	}
}

export default SongService
