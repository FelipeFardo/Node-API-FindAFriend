
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface CreatePetUseCaseRequest {
  name: string,
  race: string,
  size: string,
  city: string,
  org_id: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(private petsRepository: PetsRepository) { }

  async execute({
    name,
    race,
    size,
    city,
    org_id,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {

    const pet = await this.petsRepository.create({
      name,
      race,
      size,
      city,
      org_id
    })

    return {
      pet,
    }
  }
}
