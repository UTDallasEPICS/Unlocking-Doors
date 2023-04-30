import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

/** 
* logic for our api will go here
*/
export default {
  path: '/api',
  handler: app
}

//create a contact
app.post('/contact', async (req, res) => {
    const result = await prisma.Contact.create({
      data: {
        company: req.body.company,

        firstName: req.body.firstName,

        mainPhone: req.body.mainPhone,

      },
    })
    res.json(result)
  })

//get all contacts
app.get('/contact', async (req, res) => {
    const contacts = await prisma.user.findMany()
    res.json(contacts)
  })
  

//create a user
app.post(`/user`, async (req, res) => {
    const result = await prisma.User.create({
      data: {
        username: req.body.username,
        permission: req.body.permission,
      },
    })
    res.json(result)
  })

//get all users
  app.get('/user', async (req, res) => {
    const users = await prisma.user.findMany()
    res.json(users)
  })
