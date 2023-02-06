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
    const isSame = await comparePasswordSync('wrongPassword', hashedPassword)
    expect(isSame).toBe(false)
  })
})

describe('comparePassword', () => {
  it('callback true if the passwords match', () => {
    const plainPassword = 'password123'
    const hashedPassword = hashPassword(plainPassword)
    comparePassword(
      plainPassword,
      hashedPassword,
      (err: Error | undefined, same: boolean) => {
        expect(err).toBeNull()
        expect(same).toBe(true)
      },
    )
  })
  it('callback false if the passwords do not match', () => {
    const plainPassword = 'password123'
    const hashedPassword = hashPassword(plainPassword)
    comparePassword(
      'wrongPassword',
      hashedPassword,
      (err: Error | undefined, same: boolean) => {
        expect(err).toBeFalsy()
        expect(same).toBe(false)
      },
    )
  })
})
