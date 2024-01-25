import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository"
import { CreatePetUseCase } from "../create-a-pet"

export function makeCreatePetUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const createUseCase = new CreatePetUseCase(prismaPetsRepository)

  return createUseCase

}