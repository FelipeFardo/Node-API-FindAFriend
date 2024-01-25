import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'

interface SearchPetsUseCaseRequest {
  city: string,
  name?: string,
  race?: string,
  size?: string,
}

interface SearchPetsUseCaseResponse {
  pets: Pet[]
}

export class SearchPetsUseCase {
  constructor(private petsRepository: PetsRepository) { }

  async execute({
    city,
    name,
    race,
    size,
  }: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {
    const pets = await this.petsRepository.findByCharacteristics(
      city,
      name,
      race,
      size
    )

    return {
      pets,
    }
  }
}
