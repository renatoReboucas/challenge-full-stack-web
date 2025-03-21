import { FastifyInstance } from 'fastify'
import z from 'zod'
import { prisma } from '../lib/prisma'

export async function StudentRoutes(app: FastifyInstance) {
  app.get('/', async request => {
    try {
      const student = await prisma.student.findMany()
      return student
    } catch (err) {
      return err
    }
  })

  app.post('/', async (request, reply) => {
    const createStudentSchema = z.object({
      ra: z.number(),
      cpf: z.string(),
      nome: z.string(),
      email: z.string().email(),
    })

    try {
      const { ra, cpf, nome, email } = createStudentSchema.parse(request.body)

      const existingStudent = await prisma.student.findFirst({
        where: {
          OR: [
            { email },
            { cpf },
            { ra }
          ]
        }
      })

      if (existingStudent) {
        return reply.status(400).send({
          error: 'Email, CPF or RA already registered'
        })
      }

      const student = await prisma.student.create({
        data: {
          ra,
          cpf,
          nome,
          email
        }
      })

      return reply.status(201).send(student)
    } catch (err) {
      if (err instanceof z.ZodError) {
        return reply.status(400).send({ error: 'Validation error', details: err.errors })
      }
      return reply.status(500).send({ error: 'Internal server error' })
    }
  })
}
