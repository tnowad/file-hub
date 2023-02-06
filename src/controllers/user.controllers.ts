import { Request, Response } from 'express'
const getAllUser = (req: Request, res: Response) => {
	res.send('hi')
}
export default {
	getAllUser,
}
