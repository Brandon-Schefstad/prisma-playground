import { PrismaClient } from '@prisma/client'
import { Router } from 'express'

const prisma = new PrismaClient()
const router = Router()

router.post('/signup', async (req, res) => {
	console.log(req.body)
	const result = await prisma.user.create({
		data: {
			email: req.body.email,
			password: req.body.password,
			username: req.body.username,
		},
	})
	res.json(result)
})
router.post('/login', async (req, res) => {
	console.log(req.body)
	const result = await prisma.user.findFirst({
		where: {
			password: req.body.password,
			username: req.body.username,
		},
	})
	if (result) {
		const todos = await prisma.todo.findMany({
			where: {
				userId: result.id,
				deleted: false,
			},
		})
		const deletedTodos = await prisma.todo.findMany({
			where: {
				userId: result.id,
				deleted: true,
			},
		})
		if (result && todos) {
			res.json({ user: result, todos: todos, deletedTodos: deletedTodos })
		} else {
			res.sendStatus(404)
		}
	}
})

export default router
