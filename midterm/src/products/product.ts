import { AutoIncrementID } from "@typegoose/auto-increment"
import {
	prop,
	plugin,
	getModelForClass,
	Ref,
	ReturnModelType,
	DocumentType,
} from "@typegoose/typegoose"
import { Video } from "../videos/videos"
import { RepositoryError, UnknownError } from "../error"

@plugin(AutoIncrementID, { startAt: 1 })
class Product {
	@prop({ type: Number })
	public _id!: number

	@prop({ required: true, type: Number, ref: () => Video })
	public videoID!: Ref<Video>

	@prop({ required: true, type: String })
	public title!: string

	@prop({ required: true, type: String })
	public url!: string

	@prop({ required: true, type: Number })
	public price!: number

	@prop({ type: Number, ref: () => Video })
	public video?: Ref<Video>

	public static async addProduct(
		this: ReturnModelType<typeof Product>,
		videoID: number,
		title: string,
		url: string,
		price: number
	) {
		try {
			this.create({ videoID, title, url, price, video: videoID })
		} catch (error) {
			const e = error as Error
			throw new UnknownError("Failed to add product", e)
		}
	}

	public static async findProductsByVideoID(
		this: ReturnModelType<typeof Product>,
		videoID: number
	) {
		const product = this.find({ videoID }).exec()
		return product
	}

	public static async deleteProductByID(
		this: ReturnModelType<typeof Product>,
		id: number
	) {
		try {
			const prod = await this.deleteOne({ _id: id })
			if (prod.deletedCount != 1) {
				throw new RepositoryError("Cannot delete product: ID not found!")
			}
		} catch (error) {
			if (error instanceof RepositoryError) throw error
			else
				throw new UnknownError(
					"Unexpected error while deleting video",
					error as Error
				)
		}
	}

	public async updateProduct(
		this: DocumentType<Product>,
		title?: string,
		url?: string,
		price?: number
	) {
		if (title) {
			this.title = title
		}
		if (url) {
			this.url = url
		}

		if (price) {
			this.price = price
		}

		try {
			await this.save()
		} catch (error) {
			const e = error as Error
			throw new UnknownError("Unexpected error while updating product", e)
		}
	}
}

const ProductModel = getModelForClass(Product)

export default ProductModel
export { Product }
