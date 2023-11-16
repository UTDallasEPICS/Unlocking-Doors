import { PrismaClient } from "@prisma/client";
import * as fs from 'fs';

const prisma = new PrismaClient();
//const fs = require('fs');

async function readSpreadsheet(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const rows = content.split('\n').map(row => row.split(','));
      //skip headers in row 1
      const data = rows.slice(1)
      await processExcelData(data)
    } catch (error) {
      console.log(error);
    } finally {
      await prisma.$disconnect();
    }
}

async function processExcelData(data) {
  try {
    const createContactPromises = data.map(async (row) => {
      const newContact = await prisma.contact.create({
        data: {
          prefix : row[7],
          firstName : row[5],
          lastName : row[4],
          suffix : row[8],
          salutation : row[7],
          professionalTitle : row[10],
          address : row[11],
          city : row[12],
          state : row[13],
          zipCode : row[14],
          country : row[14],
          mainPhone : row[22],
          directPhone : row[23],
          mobilePhone : row[24],
          emailAddress : row[21],
          narrative : row[25],
          company : row[9],
        },
    });
    console.log('New Contact: ', newContact);
    return newContact;
    });
    const importedContacts = await Promise.all(createContactPromises);
  } catch (error) {
    console.error('Error creating new contact: ', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function main() {
  const excelFilePath = './test.csv';
  readSpreadsheet(excelFilePath);
  console.log('Sucessfully ran migration');
}

main();