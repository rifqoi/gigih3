db = connect("mongodb://localhost/spotify")

db.songs.drop()
db.artists.drop()
db.popularSongs.drop()

let songs = [
	{
		title: "One Love",
		artists: ["Bob Marley"],
		album: "Legend",
	},
	{
		title: "No Woman, No Cry",
		artists: ["Bob Marley"],
		album: "Live!",
	},
	{
		title: "Redemption Song",
		artists: ["Bob Marley"],
		album: "Uprising",
	},
	{
		title: "Buffalo Soldier",
		artists: ["Bob Marley"],
		album: "Confrontation",
	},
	{
		title: "Is This Love",
		artists: ["Bob Marley"],
		album: "Kaya",
	},
	{
		title: "Three Little Birds",
		artists: ["Bob Marley"],
		album: "Exodus",
	},
	{
		title: "Jamming",
		artists: ["Bob Marley"],
		album: "Exodus",
	},
	{
		title: "Get Up, Stand Up",
		artists: ["Bob Marley"],
		album: "Burnin'",
	},
	{
		title: "Could You Be Loved",
		artists: ["Bob Marley"],
		album: "Uprising",
	},
	{
		title: "Stir It Up",
		artists: ["Bob Marley"],
		album: "Catch a Fire",
	},
]

let artists = [
	{
		name: "Bob Marley",
		"date of birth": "6 February 1945",
		genre: ["Reggae"],
	},
	{
		name: "Ariel",
		"date of birth": "14 July 2001",
		genre: ["Pop", "R n B"],
	},
	{
		name: "Rhoma",
		"date of birth": "14 July 2001",
		genre: ["Dangdut"],
	},
]

let popularSongs = [
	{
		title: "One Love",
		played: 4000,
		period_of_time: 2023,
	},
	{
		title: "One Love",
		played: 4000,
		period_of_time: 2023,
	},
	{
		title: "One Love",
		played: 4000,
		period_of_time: 2023,
	},
	{
		title: "One Love",
		played: 4000,
		period_of_time: 2023,
	},
	{
		title: "One Love",
		played: 4000,
		period_of_time: 2023,
	},
	{
		title: "One Love",
		played: 4000,
		period_of_time: 2023,
	},
	{
		title: "One Love",
		played: 4000,
		period_of_time: 2023,
	},
	{
		title: "One Love",
		played: 4000,
		period_of_time: 2023,
	},
	{
		title: "One Love",
		played: 4000,
		period_of_time: 2023,
	},
	{
		title: "One Love",
		played: 4000,
		period_of_time: 2023,
	},
]

db.songs.insertMany(songs)
db.artists.insertMany(artists)
db.popularSongs.insertMany(popularSongs)
