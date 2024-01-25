import { Prisma, Pet } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { PetsRepository } from "../pets-repository";
import { InMemoryOrgsRepository } from './in-memory-orgs-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async findById(id: string) {
    const pet = this.items.find(item => item.id === id)

    if (!pet) return null

    const inMemoryOrgsRepository = new InMemoryOrgsRepository();
    const org = inMemoryOrgsRepository.findById(pet.org_id)
    return { ...pet, org }
  }

  async findByCharacteristics(city: string, name?: string, race?: string, size?: string) {
    const pets = this.items
      .filter(item => item.city.includes(city))
      .filter(item => item.name.includes(name ?? ''))
      .filter(item => item.race.includes(race ?? ''))
      .filter(item => item.race.includes(size ?? ''))


    return pets
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      race: data.race,
      size: data.size,
      city: data.city,
      created_at: new Date(),
      org_id: data.org_id,
    }

    this.items.push(pet)

    return pet
  }
}