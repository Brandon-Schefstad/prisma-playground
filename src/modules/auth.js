const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
module.exports = {
	createJWT: (user) => {
		const token = jwt.sign(
			{ id: user.id, username: user.username },
			process.env.JWT_SECRET
		)
		return token
	},

	comparePasswords: (first, second) => {
		return first === second
	},

	hashPassword: (password) => {
		return bcrypt.hash(password, 5)
	},
}
