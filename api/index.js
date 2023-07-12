//This file sets up an Express server that we use to connect to our frontend.
//We use prisma client to define API endpoints and connect to the database. 

//required modules
const express = require('express')
const { PrismaClient } = require('@prisma/client');
const cors = require('cors')

//new instance of prisma client
const prisma = new PrismaClient()

//new instance of Express
const app = express()

app.use(cors())
app.use(express.json())

//root
app.get('/', (req, res) => {
  res.send('hello from express');
});

// create a new contact
// lists fields of information
// uses prisma to create a new contact
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
      zipCode,
      country,
      mainPhone,
      directPhone,
      mobilePhone,
      emailAddress,
      narrative,
      company,
    }
  })

  res.json(newContact)
})

// Update a contact
// gets a contact's ID and updates the changes made to it using prisma
app.put('/contact/:id', async (req, res) => {
  const { id } = req.params;
  const updatedContact = req.body;
  const contactId = parseInt(id);

  try {
    const contact = await prisma.contact.update({
      where: { id: contactId },
      data: updatedContact
    });

    res.json(contact);
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({ error: 'Failed to update contact' });
  }
});


// get all contacts
// using the built in prisma -> findMany()
app.get('/contact', async (req, res) => {
    const contacts = await prisma.contact.findMany()
    res.json(contacts)
  })

  // get contact by name
  // not just name anymore, can get it by firstName, lastName, and company
  app.get('/contact/searchByName', async (req, res) => {
    const { firstName, lastName, company } = req.query;
    
    const users = await prisma.contact.findMany({
      where: {
        AND: [
          {
            firstName: {
              contains: firstName || '',
              mode: 'insensitive'
            }
          },
          {
            lastName: {
              contains: lastName || '',
              mode: 'insensitive'
            }
          },
          {
            company: {
              contains: company || '',
              mode: 'insensitive'
            }
          }
        ]
      }
    });
  
    res.json(users);
  });
  
  // delete by id
  app.delete('/contact/:id', async (req, res) => {
    const { id } = req.params;
    const contactId = parseInt(id);
  
    try {
      await prisma.contact.delete({
        where: { id: contactId }
      });
  
      res.json({ message: 'Contact deleted successfully' });
    } catch (error) {
      console.error('Error deleting contact:', error);
      res.status(500).json({ error: 'Failed to delete contact' });
    }
  });
  

// the rest are similar basic endpoints for the user table

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

// delete a user by username
app.delete('/user/:username', async (req, res) => {
  const { username } = req.params
  const deletedUsers = await prisma.user.deleteMany({
    where: {
      username: {
        equals: username,
        mode: 'insensitive'
      }
    }
  })
  res.json(deletedUsers)
})

  //starts the server and we're listening on port 5000
  app.listen(5000, () => {
    console.log('Server is listening on port 5000')
  })  

  module.exports = {
    path: '/api',
    handler: app
  }
