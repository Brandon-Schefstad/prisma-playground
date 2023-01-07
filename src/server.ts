import authRouter from './authRouter'
import { prisma } from './db'
// @ts-ignore
import { protect } from './middleware/auth.js'
import router from './router'

const cors = require('cors')
const express = require('express')
const app = express()
require('dotenv').config({ path: './env' })

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
async function main() {
	app.get('/', (req, res) => {
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
