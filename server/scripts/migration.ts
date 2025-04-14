import { PrismaClient } from "@prisma/client";
import * as fs from 'fs';

const prisma = new PrismaClient();
//const fs = require('fs');

async function readSpreadsheet(filePath: string) {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const rows = content.split('\n').map(row => row.split(','));
      //skip headers in row 1
      const data = rows.slice(1)
      await processExcelData(data)
    } catch (error) {
      console.log(error);
    } finally {
      await event.context.client.$disconnect();
    }
}

async function processExcelData(data: string[][]) {
  try {
    const createContactPromises = data.map(async (row) => {
      const newTags = [];
      for (let k = 0; k < 4; k++) {
        if (row[k] != null) {
          newTags.push(row[k]);
        }
      }
      
      //Create tags first
      const tagPromises = newTags
      .filter(tagText => tagText.trim() !== '') // Only use valid tag values
      .map(async (tagText) => {
        return event.context.client.tag.upsert({
          where: { name: tagText },
          create: { name: tagText },
          update: { name: tagText },
        });
      });
    
      const createdTags = await Promise.all(tagPromises);

      const newContact = await event.context.client.contact.create({
        data: {
          prefix : row[7],
          firstName : row[5],
          middleName : row[6],
          lastName : row[4],
          suffix : row[8],
          professionalTitle : row[10],
          address1 : row[11],
          city1 : row[12],
          state1 : row[13],
          zipCode1 : row[14],
          address1Type : row[15],
          address2 : row[16],
          city2 : row[17],
          state2 : row[18],
          zipCode2 : row[19],
          address2Type: row[20],
          mainPhone : row[22],
          directPhone : row[23],
          mobilePhone : row[24],
          emailAddress : row[21],
          narrative : row[25],
          company : row[9],
          tag : {
            connect: createdTags.map((tag) => ({ id: tag.id })), //Connect tags to each contact
          },
        },
    });
    console.log('New Contact: ', newContact);
    return newContact;
    });
    const importedContacts = await Promise.all(createContactPromises);
  } catch (error) {
    console.error('Error creating new contact: ', error);
  } finally {
    await event.context.client.$disconnect();
  }
}

async function main() {
  const excelFilePath = './test.csv';
  readSpreadsheet(excelFilePath);
  console.log('Sucessfully ran migration');
}

main();