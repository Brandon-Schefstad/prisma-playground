import { PrismaClient } from '@prisma/client'
import { Router } from 'express'

const prisma = new PrismaClient()
const router = Router()

/**
 * Product
 */
router.get('/todos', async (req, res) => {
	const result = await prisma.todo.findMany()
	res.json(result)
})
router.get('/todos/:userId', async (req, res) => {
	const result = await prisma.todo.findMany({
		where: {
			userId: parseInt(req.params.userId),
		},
	})
	res.json(result)
})
router.post('/postUser', async (req, res) => {
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
router.post('/postTodo', async (req, res) => {
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
})
router.delete('/deleteTodo', async (req, res) => {
	await prisma.todo.deleteMany()
	res.send(200)
})

router.get('/', (req, res) => {
	res.json({ success: false })
})
export default router
