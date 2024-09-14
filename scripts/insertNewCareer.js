const { PrismaClient } = require('@prisma/client')

const database = new PrismaClient()

// eslint-disable-next-line no-unused-vars
async function insertNewCareer({ company, startDate }) {
  await database.career.create({
    data: {
      company,
      startDate,
    },
  })
}
