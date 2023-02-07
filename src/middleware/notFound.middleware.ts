import { Request, Response, NextFunction } from 'express'
export default (req: Request, res: Response, next: NextFunction) => {
  res.status(404)
  if (req.headers.accept?.indexOf('html'))
    res.send(
      `
        <h1>404</h1>
        <p>url: ${req.protocol}://${req.get('host')}${req.originalUrl}</p>
      `,
    )
  else res.send('URL cannot found')
}
