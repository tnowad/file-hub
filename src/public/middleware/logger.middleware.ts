import { Request, Response, NextFunction } from 'express'
export default (req: Request, res: Response, next: NextFunction) => {
	res.once('finish', () => {
		console.log(req.method, res.statusCode, req.originalUrl)
	})
	next()
}
