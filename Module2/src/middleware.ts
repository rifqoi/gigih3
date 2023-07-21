import express, { Request, Response, NextFunction } from "express"
import { z, AnyZodObject, ZodError } from "zod"

const validate =
	(schema: AnyZodObject) =>
	(req: Request, res: Response, next: NextFunction) => {
		try {
			schema.parse({
				body: req.body,
				query: req.query,
				params: req.params,
			})
			return next()
		} catch (error) {
			const e = error as ZodError
			return res.status(400).json({
				msg: "INVALID REQUEST",
				error: e.issues,
			})
		}
	}

export { validate }
