import Playlist from "./playlists/Playlist"
import Song from "./songs/Song"

const songs = [
	new Song(
		1,
		"All Eyez on Me",
		["Tupac Shakur"],
		"https://open.spotify.com/track/2xTft6GEZeTyWNpdX94rkf"
	),
	new Song(
		2,
		"Riders on the storm",
		["The Doors"],
		"https://open.spotify.com/track/2xTft6GEZeTyWNpdX94rkf"
	),
	new Song(
		3,
		"Soviet Connection",
		["GTA IV"],
		"https://open.spotify.com/track/2xTft6GEZeTyWNpdX94rkf"
	),
	new Song(
		4,
		"Never More",
		["Shiroku Hirata"],
		"https://open.spotify.com/track/2xTft6GEZeTyWNpdX94rkf"
	),
	new Song(
		5,
		"Hotel California",
		["The Eagles"],
		"https://open.spotify.com/track/2xTft6GEZeTyWNpdX94rkf"
	),
	new Song(
		6,
		"Naruto Soundtrack",
		["Naruto"],
		"https://open.spotify.com/track/2xTft6GEZeTyWNpdX94rkf"
	),
]

const playlists = [
	new Playlist(1, "Bangers 1", songs.splice(3, 2)),
	new Playlist(2, "Bangers 2", songs.splice(4, 1)),
	new Playlist(3, "Bangers 3", songs.splice(2, 2)),
]

export { songs, playlists }
