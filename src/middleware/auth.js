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
			console.log('here')
			res.status(401)
			res.send('Not authorized')
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
			res.send('Not authorized')
			return
		}
	},
}
