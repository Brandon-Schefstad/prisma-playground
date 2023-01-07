import { Router } from 'express'

import { PrismaClient } from '@prisma/client'
const { comparePasswords, createJWT } = require('./modules/auth')
const prisma = new PrismaClient()
const router = Router()

router.post('/signup', async (req, res) => {})
router.post('/login', async (req, res) => {
	const user = await prisma.user.findFirst({
		where: { username: req.body.username },
	})

	if (user) {
		console.log(req.body.password === user.password)
		const isValid = await comparePasswords(req.body.password, user.password)
		if (!isValid) {
			res.status(401)
			res.send('Invalid username or password')
			return
		}

		const token = createJWT(user)
		res.json({ token })
	}
	// const result = await prisma.user.findFirst({
	// 	where: {
	// 		password: req.body.password,
	// 		username: req.body.username,
	// 	},
	// })
	// if (result) {
	// 	const todos = await prisma.todo.findMany({
	// 		where: {
	// 			userId: result.id,
	// 			deleted: false,
	// 		},
	// 	})
	// 	const deletedTodos = await prisma.todo.findMany({
	// 		where: {
	// 			userId: result.id,
	// 			deleted: true,
	// 		},
	// 	})
	// 	if (result && todos) {
	// 		res.json({ user: result, todos: todos, deletedTodos: deletedTodos })
	// 	} else {
	// 		res.sendStatus(404)
	// 	}
	// }
})

export default router
