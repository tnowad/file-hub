import {
	hashPassword,
	comparePassword,
	comparePasswordSync,
} from '../../utils/hashPassword.utils'

describe('comparePasswordSync', () => {
	it('returns true if the passwords match', async () => {
		const plainPassword = 'password123'
		const hashedPassword = hashPassword(plainPassword)
		const isSame = await comparePasswordSync(plainPassword, hashedPassword)
		expect(isSame).toBe(true)
	})

	it('returns false if the passwords do not match', async () => {
		const plainPassword = 'password123'
		const hashedPassword = hashPassword(plainPassword)
		const isSame = await comparePasswordSync(
			'wrongPassword',
			hashedPassword,
		)
		expect(isSame).toBe(false)
	})
})
