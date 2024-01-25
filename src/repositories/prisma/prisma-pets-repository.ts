import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository';

export class PrismaPetsRepository implements PetsRepository {
  async findByCharacteristics(city: string, name?: string, race?: string, size?: string) {
    const pets = await prisma.pet.findMany({
      where: {
        city,
        name,
        race,
        size
      }

    })
    return pets
  }
  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
      include: {
        org: true
      }
    })
    return pet;
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }
}