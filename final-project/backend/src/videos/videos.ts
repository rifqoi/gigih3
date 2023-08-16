import { AutoIncrementID, AutoIncrementSimple } from "@typegoose/auto-increment"
import {
	getModelForClass,
	prop,
	DocumentType,
	ReturnModelType,
	plugin,
} from "@typegoose/typegoose"

import { RepositoryError, UnknownError } from "../error"
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses"

@plugin(AutoIncrementID, { startAt: 1 })
class Video extends TimeStamps {
	@prop({ type: Number })
	public _id!: number

	@prop({ required: true, type: String })
	public title!: string

	@prop({ required: true, type: String })
	public thumbnailURL!: string

	@prop({ required: true, type: String })
	public videoURL!: string

	public async updateVideo(
		this: DocumentType<Video>,
		title?: string,
		thumbnail_url?: string,
		videoURL?: string
	) {
		if (title) {
			this.title = title
		}
		if (thumbnail_url) {
			this.thumbnailURL = thumbnail_url
		}

		if (videoURL) {
			this.videoURL = videoURL
		}

		try {
			await this.save()
		} catch (error) {
			const e = error as Error
			throw new UnknownError("Unexpected error while updating video", e)
		}
	}

	public static async findVideoByID(
		this: ReturnModelType<typeof Video>,
		id: number
	) {
		const res = await this.findOne({ _id: id }).exec()
		return res
	}

	public static async findVideos(
		this: ReturnModelType<typeof Video>,
		query?: string
	) {
		try {
			if (query) {
				console.log(query)
				const videos = await this.find({
					title: { $regex: `.*${query}.*`, $options: "i" },
				}).exec()
				console.log(videos)
				return videos
			}

			console.log("sini")
			return this.find()
		} catch (error) {
			const e = error as Error
			throw new UnknownError("Unexpected error while creating video", e)
		}
	}

	public static async addVideo(
		this: ReturnModelType<typeof Video>,
		title: string,
		thumbnailURL: string,
		videoURL: string
	) {
		try {
			this.create({ title, thumbnailURL, videoURL })
		} catch (error) {
			const e = error as Error
			throw new UnknownError("Unexpected error while creating video", e)
		}
	}

	public static async deleteVideoByID(
		this: ReturnModelType<typeof Video>,
		id: number
	) {
		try {
			const video = await this.deleteOne({ _id: id })
			if (video.deletedCount != 1) {
				throw new RepositoryError("Cannot delete video: ID not found!")
			}

			return video
		} catch (error) {
			if (error instanceof RepositoryError) throw error
			else
				throw new UnknownError(
					"Unexpected error while deleting video",
					error as Error
				)
		}
	}
}

const VideoModel = getModelForClass(Video)

export default VideoModel
export { Video }
