import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()
module.exports = {
	postTodo: async (req: Request, res: Response) => {
		console.log(req.body)
		const { todo, finished } = req.body
		const result = await prisma.todo.create({
			data: {
				todo: todo,
				finished: finished,
				userId: req.body.userId,
			},
		})
		res.json(result)
	},
}
