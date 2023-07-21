/**
 * Represents a song.
 */
class Song {
	id: number
	title: string
	artists: string[]
	songPlayed: number
	url: string

	constructor(id: number, title: string, artists: string[], url: string) {
		this.id = id
		this.title = title
		this.artists = artists
		this.songPlayed = 0
		this.url = url
	}

	play() {
		this.songPlayed++
	}
}

function sortSongs(songs: Song[], sort?: string): Song[] {
	const finalSort = sort ? sort : "asc"

	if (finalSort === "desc") {
		return songs.concat().sort((a, b) => b.songPlayed + a.songPlayed)
	}

	if (finalSort == "asc") {
		return songs.concat().sort((a, b) => b.songPlayed - a.songPlayed)
	}

	return []
}
export default Song
export { sortSongs }
