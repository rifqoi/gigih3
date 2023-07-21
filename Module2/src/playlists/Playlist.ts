import Song from "../songs/Song"

/**
 * Represents a playlist of songs.
 * @class
 */
class Playlist {
	public id: number
	public name: string

	public songs: Song[]

	/**
	 * Create a new Playlist.
	 * @param {number} id - The ID of the playlist (integer).
	 * @param {string} name - The name of the playlist (string).
	 * @param {Song[]} songs - An array of songs in the playlist (array of Song objects).
	 */
	constructor(id: number, name: string, songs: Song[]) {
		this.id = id
		this.name = name
		this.songs = songs
	}
}

export default Playlist
