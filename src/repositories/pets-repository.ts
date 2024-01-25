import { Prisma, Pet } from '@prisma/client'


export interface PetsRepository {
  findById(id: string): Promise<Pet | null>
  findByCharacteristics(city: string, name?: string, race?: string, size?: string): Promise<Pet[]>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
