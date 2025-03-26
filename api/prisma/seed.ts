import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.student.deleteMany()
  await prisma.student.createMany({
    data: [
      {
        ra: 1001,
        cpf: '999999999999',
        nome: 'João Silva',
        email: 'joao@example.com',
      },
      {
        ra: 1002,
        cpf: '999999999999',
        nome: 'Maria Santos',
        email: 'maria@example.com',
      },
      {
        ra: 1003,
        cpf: '999999999999',
        nome: 'Pedro Oliveira',
        email: 'pedro@example.com',
      },
    ],
  })

  console.log('Seed completed!')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
