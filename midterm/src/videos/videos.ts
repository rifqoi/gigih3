import { AutoIncrementID, AutoIncrementSimple } from "@typegoose/auto-increment"
import {
	getModelForClass,
	prop,
	DocumentType,
	ReturnModelType,
	plugin,
} from "@typegoose/typegoose"

import { RepositoryError, UnknownError } from "../error"

@plugin(AutoIncrementID, { startAt: 1 })
class Video {
	@prop({ type: Number })
	public _id!: number

	@prop({ required: true, type: String })
	public title!: string

	@prop({ required: true, type: String })
	public thumbnailURL!: string

	public async updateVideo(
		this: DocumentType<Video>,
		title?: string,
		thumbnail_url?: string
	) {
		if (title) {
			this.title = title
		}
		if (thumbnail_url) {
			this.thumbnailURL = thumbnail_url
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

	public static async addVideo(
		this: ReturnModelType<typeof Video>,
		title: string,
		thumbnailURL: string
	) {
		try {
			this.create({ title, thumbnailURL })
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
