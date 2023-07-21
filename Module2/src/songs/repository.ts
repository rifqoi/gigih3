import Song, { sortSongs } from "./Song"

interface ISongRepository {
	findSongByID(id: number): Song | undefined
	findSongs(
		songName?: string,
		artist?: string,
		sort?: string
	): Song[] | undefined
	findExactSongByTitle(songName: string): Song | undefined
	findSongByArtists(artistName: string): Song[] | undefined
	insertSong(title: string, artists: string[], url: string): void
	updateSong(song: Song): void
}

class SongRepository {
	private songs: Song[]
	constructor(songs: Song[]) {
		this.songs = songs
	}

	findSongByID(id: number): Song | undefined {
		const song = this.songs.find((v) => v.id === id)

		return song
	}

	findSongs(
		songName?: string,
		artistName?: string,
		sort?: string
	): Song[] | undefined {
		let songs: Song[] = []
		if (songName && artistName) {
			songs = this.songs.filter((song) =>
				song.title.toLowerCase().includes(songName.toLowerCase())
			)
			songs = songs.filter((song) =>
				song.artists.some((artist) =>
					artist.toLowerCase().trim().includes(artistName.trim().toLowerCase())
				)
			)
		} else if (songName) {
			songs = this.songs.filter((song) =>
				song.title.toLowerCase().includes(songName.toLowerCase())
			)
		} else if (artistName) {
			const name = artistName.trim().toLowerCase()
			songs = this.songs.filter((song) =>
				song.artists.some((artist) =>
					artist.toLowerCase().trim().includes(name)
				)
			)
		} else {
			songs = this.songs
		}

		songs = sortSongs(songs, sort)

		return songs
	}

	findExactSongByTitle(songName: string): Song | undefined {
		const song = this.songs.find(
			(song) => song.title.toLowerCase() === songName.toLowerCase()
		)

		return song
	}

	findSongByArtists(artistName: string): Song[] | undefined {
		const name = artistName.trim().toLowerCase()
		const songs = this.songs.filter((song) =>
			song.artists.some((artist) => artist.toLowerCase().trim().includes(name))
		)

		return songs
	}

	insertSong(title: string, artists: string[], url: string) {
		const song = new Song(this.songs.length + 1, title, artists, url)

		this.songs.push(song)
	}

	updateSong(song: Song) {
		this.songs[song.id] = song
	}
}

export default SongRepository
export { ISongRepository }
