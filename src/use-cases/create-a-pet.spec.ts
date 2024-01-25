
import { beforeEach, describe, expect, it } from 'vitest'
import { CreatePetUseCase } from './create-a-pet'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'


let petsRepository: InMemoryPetsRepository;
let sut: CreatePetUseCase;


describe('Create a Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new CreatePetUseCase(petsRepository)
  });

  it('it should be able to raise a pet', async () => {
    const { pet } = await sut.execute({
      name: 'Picole',
      race: "Pug",
      size: 'large',
      city: "New York",
      org_id: "org-01"
    })
    expect(pet.id).toEqual(expect.any(String))
  })

})
