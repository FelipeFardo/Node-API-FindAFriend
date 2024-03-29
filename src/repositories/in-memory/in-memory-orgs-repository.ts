import { Prisma, Org } from "@prisma/client";
import { OrgsRepository } from "../orgs-repository";
import { randomUUID } from "node:crypto";

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async findById(id: string) {
    const org = this.items.find(item => item.id === id)

    if (!org) return null

    return org
  }

  async findByEmail(email: string) {
    const org = this.items.find(item => item.email === email)

    if (!org) return null

    return org
  }

  async create(data: Prisma.OrgUncheckedCreateInput) {
    const org = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      address: data.address,
      phone: data.phone,
      password_hash: data.password_hash,
      created_at: new Date()
    }
    this.items.push(org)

    return org
  }
}