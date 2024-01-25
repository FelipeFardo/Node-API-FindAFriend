import request from "supertest";
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";


describe('Search Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })


  it('should be able to get a pets', async () => {
    const org = await prisma.org.create({
      data: {
        name: 'Bixo Vadio',
        email: 'johndoe@example.com',
        password_hash: await hash('123456', 6),
        address: "Times square",
        phone: "12345-6789"
      }
    })


    await prisma.pet.create({
      data: {
        city: 'New York',
        name: "Picole",
        race: "Pug",
        size: "Large",
        org_id: org.id
      }
    })

    const pet = await prisma.pet.create({
      data: {
        city: 'New York',
        name: "CBUM",
        race: "Pug",
        size: "Large",
        org_id: org.id
      }
    })

    const response = await request(app.server)
      .get('/pets/search')
      .query({
        city: 'New York',
      })


    expect(response.statusCode).toEqual(200)
    expect(response.body.pets.length).toEqual(2)
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        name: "Picole",
      }),
      expect.objectContaining({
        name: "CBUM",
      })
    ])

  })
})