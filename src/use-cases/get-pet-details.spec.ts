
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { GetPetDetailsUseCase } from './get-pet-details';


let petsRepository: InMemoryPetsRepository;
let sut: GetPetDetailsUseCase;


describe('Get Pet Details Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetDetailsUseCase(petsRepository)
  });

  it('it should be able to raise a pet', async () => {
    const createdPet = await petsRepository.create({
      name: 'Picole',
      race: "Pug",
      size: 'large',
      city: "New York",
      org_id: "org-01"
    })


    const { pet } = await sut.execute({
      pet_id: createdPet.id
    })

    expect(pet.name).toEqual('Picole')
  })

})
