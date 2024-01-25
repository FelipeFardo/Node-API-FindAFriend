import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository"
import { AuthenticateUseCase } from "../authenticate"

export function makeAuthenticateOrgUseCase() {
  const prismaOrgsRepository = new PrismaOrgsRepository()
  const authenticateOrgUseCase = new AuthenticateUseCase(prismaOrgsRepository)

  return authenticateOrgUseCase

}