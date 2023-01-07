import { Router } from 'express'

const createController = require('./todos/create')
const readController = require('./todos/read')
const updateController = require('./todos/update')
const deleteController = require('./todos/delete')

const router = Router()

router.post('/postTodo', createController.postTodo)

router.get('/todos', readController.getAllTodos)
router.get('/deletedTodos', readController.getAllDeletedTodos)
router.get('/todos/:userId', readController.getAllTodosByUser)
router.get('/todosCompleted/:userId', readController.getAllCompletedTodosByUser)

router.put('/finishTodo', updateController.finishTodo)
router.put('/deleteTodo/', updateController.softDelete)

router.delete('/deleteAllTodo/', deleteController.deleteAllTodos)
router.delete('/deleteTodo/:userId', deleteController.deleteAllTodosByUser)
router.delete('/deleteUsers', deleteController.deleteAllUsers)

export default router
