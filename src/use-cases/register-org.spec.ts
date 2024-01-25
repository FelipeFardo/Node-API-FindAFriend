import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterOrgUseCase } from './register-org'
import { compare } from 'bcryptjs'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error';


let orgsRepository: InMemoryOrgsRepository;
let sut: RegisterOrgUseCase;


describe('Register Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterOrgUseCase(orgsRepository)
  });

  it('should hash org password open registration', async () => {
    const { org } = await sut.execute({
      phone: '12345-4444',
      address: 'Time Square',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })
    expect(org.id).toEqual(expect.any(String))
  })

  it('should hash org password open registration', async () => {
    const { org } = await sut.execute({
      phone: '12345-4444',
      address: 'Time Square',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      org.password_hash,
    )
    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'johndoe@example.com'
    await sut.execute({
      phone: '12345-4444',
      address: 'Time Square',
      name: 'John Doe',
      email,
      password: '123456',
    })

    await expect(() => sut.execute({
      phone: '12345-4444',
      address: 'Time Square',
      name: 'John Doe',
      email,
      password: '123456',
    })).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
