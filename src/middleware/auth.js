const jwt = require('jsonwebtoken')
module.exports = {
	protect: async (req, res, next) => {
		const bearer = req.headers.authorization

		if (!bearer) {
			res.status(401)
			res.send('Not authorized')
			return
		}

		const [, token] = bearer.split(' ')

		if (!token) {
			res.status(401)
			res.send('No Token')
			return
		}

		try {
			const payload = jwt.verify(token, process.env.JWT_SECRET)
			req.user = payload
			console.log(payload)
			next()
			return
		} catch (e) {
			console.error(e)
			res.status(401)
			res.send('JWT Invalid')
			return
		}
	},
}
