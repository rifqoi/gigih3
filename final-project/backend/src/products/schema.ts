import { z } from "zod"

export type ProductResponse = {
	id: number
	title: string
	url: string
	price: number
}

export const FindProductByIDSchema = z.object({
	params: z.object({
		id: z.number({
			coerce: true,
			required_error: "Id is required!",
		}),
	}),
})

export type FindProductByIDReq = {
	id: string
}

export const InputProductByVideoID = z.object({
	body: z.object({
		title: z.string({
			required_error: "title is required",
		}),
		url: z
			.string({
				required_error: "url is required",
			})
			.url("Not a valid URL."),
		price: z.number({
			required_error: "price is required",
		}),
	}),
})

export type InputProductByVideoID = z.infer<typeof InputProductByVideoID>

export const UpdateProductSchema = z.object({
	body: z.object({
		id: z.number({
			required_error: "ID is required!",
		}),
		title: z.string({}).optional(),
		url: z.string({}).url("Not a valid URL.").optional(),
		price: z.number({}).optional(),
	}),
})

export type UpdateProductReq = z.infer<typeof UpdateProductSchema>
