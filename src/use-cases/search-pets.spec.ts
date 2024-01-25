import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository';
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchPetsUseCase } from './search-pets';


let petsRepository: InMemoryPetsRepository;
let sut: SearchPetsUseCase;


describe('Search Pets Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    sut = new SearchPetsUseCase(petsRepository)
  })

  it('should be able to search for pets around the city', async () => {
    await petsRepository.create({
      name: 'Picole',
      race: "Pug",
      size: 'large',
      city: "New York",
      org_id: "org-01"
    })

    await petsRepository.create({
      name: 'Picole',
      race: "Pug",
      size: 'large',
      city: "San Francisco",
      org_id: "org-01"
    })

    const { pets } = await sut.execute({
      city: "New York"
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({ name: 'Picole', }),
    ])
  })

  it('should be able to search for pets around the size and name', async () => {
    await petsRepository.create({
      name: 'CBUM',
      race: "Pug",
      size: 'large',
      city: "New York",
      org_id: "org-01"
    })

    await petsRepository.create({
      name: 'Picole',
      race: "Golden Shower",
      size: 'large',
      city: "New York",
      org_id: "org-01"
    })

    const { pets } = await sut.execute({
      city: "New York",
      race: 'Pug',
      name: 'CBUM'
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({ name: 'CBUM', }),
    ])
  })


  it('should not be able to search for pets by city', async () => {
    await petsRepository.create({
      name: 'CBUM',
      race: "Pug",
      size: 'large',
      city: "New York",
      org_id: "org-01"
    })

    await petsRepository.create({
      name: 'Picole',
      race: "Golden Shower",
      size: 'large',
      city: "New York",
      org_id: "org-01"
    })

    const { pets } = await sut.execute({
      city: 'San Francisco',
      race: 'Pug',
      name: 'CBUM'
    })

    expect(pets).toHaveLength(0)
  })
})
