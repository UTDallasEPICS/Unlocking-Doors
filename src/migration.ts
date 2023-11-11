import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function readSpreadsheet(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target) {
          const result = event.target.result as string;
          resolve(result);
        } else {
          reject(new Error('Unable to read file.'));
        }
    };

    reader.onerror = (event) => {
      reject(new Error('Unable to read file: ' + (event.target?.error as any)?.message));
    };

    reader.readAsText(file);
  });
}

async function toCSV(CSVStr: string): any[][] {
  return CSVStr.split('\n').map(row => row.split(','));
}

async function processExcelData(data: any[][]) {
  try {
    for (const row of data) {
      const newContact = await prisma.Contact.create({
        data: {
          prefix : row[8],
          firstName : row[6],
          lastName : row[5],
          suffix : row[9],
          salutation : row[8],
          professionalTitle : row[11],
          address : row[12],
          city : row[13],
          state : row[14],
          zipCode : row[15],
          country : row[15],
          mainPhone : row[23],
          directPhone : row[24],
          mobilePhone : row[25],
          emailAddress : row[22],
          narrative : row[26],
          company : row[10],
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