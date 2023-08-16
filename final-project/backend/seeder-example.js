db = connect(
	"CONNECTION_STRING_HERE"
)

db.identitycounter.drop()
db.videos.drop()
db.products.drop()
db.comments.drop()

let videos = [
	{
		title: "Oppenheimer Jualan Anduk",
		thumbnailURL:
			"https://i.ytimg.com/vi/uYPbbksJxIg/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA2M_LSAVX5C1yeaypLoWxlz78y5Q",
		videoURL: "https://www.youtube.com/embed/uYPbbksJxIg",
	},
	{
		title: "Vim > VSC*DE",
		thumbnailURL:
			"https://i.ytimg.com/vi/nhe-4_dFjLM/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAg_MEqQlJHyTWCWzMqLXGvFij-yw",
		videoURL: "https://www.youtube.com/embed/nhe-4_dFjLM",
	},
	{
		title: "AM I ACTUALLY FIT FOR THIS INDUSTRY???",
		thumbnailURL:
			"https://i.ytimg.com/vi/_fkdalNPcw0/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLC2vbGOcnZW84SlmMWcBqJDrtKBjQ",
		videoURL: "https://www.youtube.com/embed/_fkdalNPcw0",
	},
	{
		title: "BANGERS",
		thumbnailURL:
			"https://i.ytimg.com/vi/sCNlt5nvSI8/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBjYucy8Lr7U0eyYS_RLi9Ui6XGnQ",
		videoURL: "https://www.youtube.com/embed/sCNlt5nvSI8",
	},
	{
		title: "OPPENHEIMER STYLE",
		thumbnailURL:
			"https://i.ytimg.com/vi/8VgSyKl9vg0/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAUbHIih2LpvJzEZYQKefV-wdfPSA",
		videoURL: "https://www.youtube.com/embed/8VgSyKl9vg0",
	},
	{
		title: "I MISS 2013",
		thumbnailURL:
			"https://i.ytimg.com/vi/sWtEYPva4A0/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDgJivys9sJnLKp1g2XN7MmTZWfCg",
		videoURL: "https://www.youtube.com/embed/oIYgsqhwXzM",
	},
]

let products = [
	{
		title: "Anduk",
		url: "https://images.tokopedia.net/img/cache/200-square/VqbcmM/2021/10/23/428d0315-4abe-4efc-949b-164bd0614c5b.png",
		price: 10000,
	},
	{
		title: "Calcium Uyee",
		url: "https://images.tokopedia.net/img/cache/200-square/VqbcmM/2021/12/29/bb4fd591-640e-4fbf-bd84-215eb18e3a3a.jpg",
		price: 24425,
	},
	{
		title: "Vicks Chain",
		url: "https://images.tokopedia.net/img/cache/200-square/hDjmkQ/2021/10/7/291a9476-d764-42cc-aeeb-f544bc2be447.jpg",
		price: 24425,
	},
	{
		title: "Jemuran",
		url: "https://images.tokopedia.net/img/cache/200-square/VqbcmM/2021/11/19/4d754429-5b63-4d2d-be11-31eb7dab8c96.jpg",
		price: 240005,
	},
	{
		title: "Obat obatan",
		url: "https://images.tokopedia.net/img/cache/200-square/VqbcmM/2023/6/17/20ceab9b-8d1f-45c1-a8b0-2341c579b84e.png",
		price: 50000,
	},
	{
		title: "ORIGI",
		url: "https://images.tokopedia.net/img/cache/200-square/VqbcmM/2023/6/27/d5045abd-801e-4dfb-95dd-27d28ea9ca84.png",
		price: 50006,
	},
	{
		title: "IPONG",
		url: "https://images.tokopedia.net/img/cache/200-square/VqbcmM/2023/6/13/47936d26-bb71-49e1-8557-d9f0d6abdfdd.jpg",
		price: 1231231,
	},
	{
		title: "MATTE",
		url: "https://images.tokopedia.net/img/cache/200-square/hDjmkQ/2023/6/20/5653953b-9f86-4ea8-ad43-b8374eeec361.jpg",
		price: 80000,
	},
	{
		title: "WINIXX",
		url: "https://images.tokopedia.net/img/cache/200-square/VqbcmM/2023/8/14/145a5056-c9cf-42af-bba9-308fa0701143.jpg",
		price: 123123,
	},
]

for (let index = 1; index <= videos.length; index++) {
	const video = videos[index - 1]
	video["_id"] = index
	db.videos.insertOne(video)

	for (let j = 0; j < products.length; j++) {
		const product = products[j]
		console.log("Video ", index, "Product ", j)
		product["videoID"] = index
		db.products.insertOne(product)
	}
}
