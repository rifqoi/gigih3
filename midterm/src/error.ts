import { Response } from "express"
import logger from "./logger"
class RepositoryError extends Error {
	origError: Error | undefined
	constructor(msg: string, error?: Error) {
		super(msg)

		this.origError = error

		Object.setPrototypeOf(this, RepositoryError.prototype)
	}

	unwrapError() {
		return this.origError
	}
}

class UnknownError extends Error {
	origError: Error | undefined
	constructor(msg: string, error?: Error) {
		super(msg)

		this.origError = error

		Object.setPrototypeOf(this, UnknownError.prototype)
	}

	public unwrapError() {
		return this.origError
	}
}

export function handleControllerError(error: unknown, res: Response) {
	let msg: string
	let status: number

	if (error instanceof RepositoryError) {
		const e = error as RepositoryError
		msg = e.message
		status = 500
	} else if (error instanceof UnknownError) {
		const e = error as UnknownError
		msg = e.message
		status = 500

		const origErr = e.unwrapError()
		logger.error(origErr?.message)
	} else {
		const e = error as Error
		msg = "UNKNOWN ERROR"
		status = 500

		logger.error(e.message)
	}

	res.status(status).json({
		error: msg,
	})
}

export { UnknownError, RepositoryError }
