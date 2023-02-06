import { Request, Response } from 'express'
const getAllUser = (req: Request, res: Response) => {
	res.status(200).send('3hi')
}
export default {
	getAllUser,
}
