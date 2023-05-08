const express = require('express')
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

// create a new contact
app.post('/contact', async (req, res) => {

  const {
    prefix,
    firstName,
    lastName,
    suffix,
    salutation,
    professionalTitle,
    address,
    city,
    state,
    zipCode,
    country,
    mainPhone,
    directPhone,
    mobilePhone,
    emailAddress,
    narrative,
    company,
  } = req.body

  const newContact = await prisma.contact.create({
    data: {
      prefix,
      firstName,
      lastName,
      suffix,
      salutation,
      professionalTitle,
      address,
      city,
      state,
      zipCode: parseInt(zipCode) || null,
      country,
      mainPhone: parseInt(mainPhone) || null,
      directPhone: parseInt(directPhone) || null,
      mobilePhone: parseInt(mobilePhone) || null,
      emailAddress,
      narrative,
      company,
    }
  })

  res.json(newContact)
})


//get all contacts
app.get('/contact', async (req, res) => {
    const contacts = await prisma.contact.findMany()
    res.json(contacts)
  })

  //get contact by name
  app.get('/contact/searchByFirstName', async (req, res) => {
    const { firstName } = req.query
    const users = await prisma.contact.findMany({
      where: {
        name: {
          contains: firstName || '',
          mode: 'insensitive'
        }
      }
    })
    res.json(users)
  })

// create a new user
app.post('/user', async (req, res) => {
  const {
    username,
    permission
  } = req.body

  const newUser = await prisma.user.create({
    data: {
      username,
      permission
    }
  })

  res.json(newUser)
})

//get all users
  app.get('/user', async (req, res) => {
    const users = await prisma.user.findMany()
    res.json(users)
  })

  app.listen(5000, () => {
    console.log('Server is listening on port 5000')
  })  

  module.exports = {
    path: '/api',
    handler: app
  }
