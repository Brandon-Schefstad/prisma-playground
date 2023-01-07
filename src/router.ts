import { PrismaClient } from '@prisma/client'
import { Router } from 'express'
const createController = require('./todos/create')
const readController = require('./todos/read')

const prisma = new PrismaClient()
const router = Router()

router.post('/postTodo', createController.postTodo)

router.get('/todos', readController.getAllTodos)
router.get('/deletedTodos', readController.getAllDeletedTodos)
router.get('/todos/:userId', readController.getAllTodosByUser)
router.get('/todosCompleted/:userId', readController.getAllCompletedTodosByUser)
router.put('/finishTodo', async (req, res) => {
	const todo = await prisma.todo.findFirst({
		where: {
			id: parseInt(req.body.id),
		},
	})

	if (todo) {
		const result = await prisma.todo.update({
			where: {
				id: req.body.id,
			},
			data: {
				finished: !todo.finished,
			},
		})
		res.json({
			todo: 'updated',
			confirmation: result,
		})
	}
})

router.delete('/deleteAllTodo/', async (req, res) => {
	await prisma.todo.deleteMany({})
	res.sendStatus(200)
})
router.delete('/deleteTodo/:userId', async (req, res) => {
	await prisma.todo.deleteMany({
		where: {
			userId: parseInt(req.params.userId),
		},
	})
	res.sendStatus(200)
})
router.put('/deleteTodo/', async (req, res) => {
	const result = await prisma.todo.update({
		where: {
			id: req.body.id,
		},
		data: {
			deletedAt: Date.now().toString(),
			deleted: true,
		},
	})
	res.json({
		todo: 'updated',
		confirmation: result,
	})
})

export default router
