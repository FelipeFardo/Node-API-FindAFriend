import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository"
import { RegisterOrgUseCase } from "../register-org"

export function makeRegisterUseCase() {
  const prismaOrgsRepository = new PrismaOrgsRepository()
  const registerUseCase = new RegisterOrgUseCase(prismaOrgsRepository)

  return registerUseCase
}