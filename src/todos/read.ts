import { Request, Response } from 'express'
import { prisma } from '../db'

module.exports = {
	getAllTodos: async (req: Request, res: Response) => {
		const result = await prisma.todo.findMany({
			where: {
				deleted: false,
			},
		})
		res.json(result)
	},
	getAllDeletedTodos: async (req: Request, res: Response) => {
		const result = await prisma.todo.findMany({
			where: {
				deleted: true,
			},
		})
		res.json(result)
	},
	getAllTodosByUser: async (req: Request, res: Response) => {
		const result = await prisma.todo.findMany({
			where: {
				userId: parseInt(req.params.userId),
			},
		})
		res.json(result)
	},
	getAllCompletedTodosByUser: async (req: Request, res: Response) => {
		const result = await prisma.todo.findMany({
			where: {
				userId: parseInt(req.params.userId),
			},
		})
		res.json(result)
	},
}
