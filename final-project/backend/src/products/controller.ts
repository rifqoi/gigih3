import { Router, Request, Response } from "express"
import ProductModel from "./product"
import {
	FindProductByIDReq,
	FindProductByIDSchema,
	InputProductByVideoID,
	ProductResponse,
	UpdateProductReq,
	UpdateProductSchema,
} from "./schema"
import { handleControllerError } from "../error"
import { validate } from "../middleware"
import VideoModel from "../videos/videos"

class ProductController {
	basePath: string = "/products"
	router: Router = Router()

	constructor() {
		this.initializeRoutes()
	}

	initializeRoutes() {
		this.router.get(
			`${this.basePath}/video/:id`,
			validate(FindProductByIDSchema),
			this.findProductByVideoID
		)
		this.router.get(
			`${this.basePath}/:id`,
			validate(FindProductByIDSchema),
			this.findProductByID
		)

		this.router.post(
			`${this.basePath}/video/:id`,
			validate(InputProductByVideoID),
			this.addProductByVideoID
		)

		this.router.delete(
			`${this.basePath}/:id`,
			validate(UpdateProductSchema),
			this.deleteProductByID
		)

		this.router.put(
			`${this.basePath}/:id`,
			validate(UpdateProductSchema),
			this.updateProductByID
		)
	}

	findProductByID = async (req: Request<FindProductByIDReq>, res: Response) => {
		const id = Number(req.params.id)
		try {
			const product = await ProductModel.findById(id)
			if (!product || product === null) {
				res.status(404).json({
					msg: "Product not found!",
				})
				return
			}

			res.status(200).json({
				msg: "Sucessfully find the video",
				data: {
					id: product._id,
					title: product.title,
					url: product.url,
					price: product.price,
				} as ProductResponse,
			})
		} catch (error) {
			handleControllerError(error, res)
		}
	}

	addProductByVideoID = async (
		req: Request<FindProductByIDReq, any, InputProductByVideoID["body"]>,
		res: Response
	) => {
		const id = Number(req.params.id)
		const { url, price, title } = req.body
		try {
			const video = await VideoModel.findVideoByID(id)
			if (!video || video === null) {
				res.status(404).json({
					msg: "Video not found!",
				})
				return
			}

			await ProductModel.addProduct(id, title, url, price)

			res.status(200).json({
				msg: "Sucessfully add the product for video " + id,
				// data: products,
			})
		} catch (error) {
			handleControllerError(error, res)
		}
	}

	findProductByVideoID = async (
		req: Request<FindProductByIDReq>,
		res: Response
	) => {
		const id = Number(req.params.id)
		try {
			const resProducts = await ProductModel.findProductsByVideoID(id)
			if (!resProducts || resProducts === null) {
				res.status(404).json({
					msg: "Product not found!",
				})
				return
			}

			const products: ProductResponse[] = []
			resProducts.map((p) => {
				const product: ProductResponse = {
					id: p._id,
					price: p.price,
					url: p.url,
					title: p.title,
				}

				products.push(product)
			})

			res.status(200).json({
				msg: "Sucessfully find the video",
				data: products,
			})
		} catch (error) {
			handleControllerError(error, res)
		}
	}

	deleteProductByID = async (
		req: Request<FindProductByIDReq>,
		res: Response
	) => {
		const id = Number(req.params.id)
		try {
			const product = await ProductModel.deleteProductByID(id)

			res.status(200).json({
				msg: `Product with id ${id} sucessfully deleted!`,
			})
		} catch (error) {
			handleControllerError(error, res)
		}
	}

	updateProductByID = async (
		req: Request<any, any, UpdateProductReq["body"]>,
		res: Response
	) => {
		const { id, title, url, price } = req.body
		try {
			const product = await ProductModel.findById(id)
			if (!product || product === null) {
				res.status(404).json({
					msg: "Product not found!",
				})
				return
			}

			await product.updateProduct(title, url, price)
			res.status(200).json({
				msg: "Product is updated!",
			})
		} catch (error) {
			handleControllerError(error, res)
		}
	}
}

export default ProductController
