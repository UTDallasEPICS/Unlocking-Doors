import { PrismaClient } from "@prisma/client";
import * as fs from 'fs';

const prisma = new PrismaClient();

async function readSpreadsheet(filePath) {
    try {
      const buffer = fs.readFileSync(filePath);
      const data = await toCSV(buffer);
      await processExcelData(data)
    } catch (error) {
      console.log(error);
    } finally {
      await prisma.$disconnect();
    }
}

async function toCSV(buffer) {
  const lines = [];
  for (let i = 0; i < buffer.length; i++) {
    lines.push(buffer[i].toString());
  }
  const csvString = lines.join(',');
  return [csvString];
}

async function processExcelData(data) {
  try {
    for (const row of data) {
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
    }
  } catch (error) {
    console.error('Error creating new contact: ', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function main() {
  const excelFilePath = './test.xlsx';
  readSpreadsheet(excelFilePath);
  console.log('Sucessfully ran migration');
}

main();