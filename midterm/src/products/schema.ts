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
