import { AutoIncrementID } from "@typegoose/auto-increment"
import {
	prop,
	plugin,
	getModelForClass,
	Ref,
	ReturnModelType,
} from "@typegoose/typegoose"
import { Video } from "../videos/videos"
import { RepositoryError, UnknownError } from "../error"
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses"

@plugin(AutoIncrementID, { startAt: 1 })
class Comment extends TimeStamps {
	@prop({ type: Number })
	public _id!: number

	@prop({ required: true, type: Number, ref: () => Video })
	public videoID!: Ref<Video>

	@prop({ required: true, type: String })
	public username!: string

	@prop({ required: true, type: String })
	public comment!: string

	@prop({ required: true, default: Date.now(), type: Date })
	public timestamps!: Date

	@prop({ type: Number, ref: () => Video })
	public video?: Ref<Video>

	public static async addComment(
		this: ReturnModelType<typeof Comment>,
		videoID: number,
		username: string,
		comment: string
	) {
		try {
			this.create({ videoID, username, comment })
		} catch (error) {
			const e = error as Error
			throw new UnknownError("Failed to add comment", e)
		}
	}

	public static async findCommentsByVideoID(
		this: ReturnModelType<typeof Comment>,
		videoID: number
	) {
		const comments = this.find({ videoID }).exec()
		return comments
	}

	public static async deleteCommentByID(
		this: ReturnModelType<typeof Comment>,
		id: number
	) {
		try {
			const res = await this.deleteOne({ _id: id })
			if (res.deletedCount != 1) {
				throw new RepositoryError("Cannot delete comment: ID not found!")
			}
		} catch (error) {
			if (error instanceof RepositoryError) throw error
			else
				throw new UnknownError(
					"Unexpected error while deleting comment.",
					error as Error
				)
		}
	}
}

const CommentModel = getModelForClass(Comment)

export default CommentModel
export { Comment }
