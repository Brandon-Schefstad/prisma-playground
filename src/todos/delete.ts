import { Request, Response } from 'express'
import { prisma } from '../db'
module.exports = {
	deleteAllTodos: async (req: Request, res: Response) => {
		await prisma.todo.deleteMany({})
		res.sendStatus(200)
	},
	deleteAllTodosByUser: async (req: Request, res: Response) => {
		await prisma.todo.deleteMany({
			where: {
				userId: parseInt(req.params.userId),
			},
		})
		res.sendStatus(200)
	},
	deleteAllUsers: async (req: Request, res: Response) => {
		await prisma.user.deleteMany({})
		res.sendStatus(200)
	},
}
