import bcrypt from 'bcrypt'

const saltRounds = 10

/**
 * Hashes the plain password using bcrypt's hashSync function
 * @param {string} plainPassword - The plain password to be hashed
 * @returns {string} The hashed password
 */

export const hashPassword = (plainPassword: string) => {
	const salt = bcrypt.genSaltSync(saltRounds)
	const hash = bcrypt.hashSync(plainPassword, salt)
	return hash
}

/**
 * Compares a plain password with a hashed password using bcrypt's compare function
 * @param {string} plainPassword - The plain password to be compared
 * @param {string} hashedPassword - The hashed password to compare against
 * @param {function} callback - The callback function to handle the result
 */
export const comparePassword = (
	plainPassword: string,
	hashedPassword: string,
	callback: Function,
) => {
	bcrypt.compare(
		plainPassword,
		hashedPassword,
		(err: Error | undefined, same: boolean) => {
			if (err) {
				callback(err, null)
			} else {
				callback(null, same)
			}
		},
	)
}

/**
 * Compares a plain password with a hashed password using bcrypt's compareSync function
 * @param {string} plainPassword - The plain password to be compared
 * @param {string} hashedPassword - The hashed password to compare against
 * @returns {boolean} A boolean indicating if the passwords match or not
 */
export const comparePasswordSync = (
	plainPassword: string,
	hashedPassword: string,
) => {
	return bcrypt.compare(plainPassword, hashedPassword)
}
