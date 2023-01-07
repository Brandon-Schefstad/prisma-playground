import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import authRouter from './authRouter'
import router from './router'
const { protect } = require('./middleware/auth.js')

const cors = require('cors')
const prisma = new PrismaClient()
const express = require('express')
const app = express()
require('dotenv').config({ path: './env' })

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
async function main() {
	app.get('/', (req: Request, res: Response) => {
		res.json({ hello: 'world' })
	})
	app.use('/api', protect, router)
	app.use('/auth', authRouter)

	app.listen(2121, () => {
		console.log(`http://localhost:${2121}`)
	})
}

main()
	.catch((e) => {
		throw e
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
