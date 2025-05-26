import fs from 'fs';
import { parse } from 'csv-parse/sync';
import { PrismaClient } from './prisma/client/index.js';

const prisma = new PrismaClient();

async function main() {
  const filePath = process.argv[2];

  if (!filePath) {
    console.error('Please provide the path to the CSV file as an argument.');
    process.exit(1);
  }

  try {
    console.log(`Reading CSV file from: ${filePath}`);
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' });

    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });

    console.log(`Found ${records.length} records in the CSV file.`);

    for (const record of records) {
      const contactData = {
        company: record['Organization'] || '', // Assuming Organization is the company
        prefix: record['Prefix'],
        firstName: record['First Name'],
        middleName: record['Middle Name/ Initial'],
        lastName: record['Last Name'],
        suffix: record['Suffix'],
        professionalTitle: record['Title'],
        address1: record['Address 1'],
        city1: record['City'],
        state1: record['State'],
        zipCode1: record['Zip'],
        address1Type: record['Address Type'],
        address2: record['Address 2'],
        city2: record['City2'],
        state2: record['State2'],
        zipCode2: record['Zip2'],
        address2Type: record['Address Type2'],
        mainPhone: record['Main Phone'],
        directPhone: record['Direct Phone'],
        mobilePhone: record['Mobile Phone'],
        emailAddress: record['Email'],
        narrative: record['Notes'],
      };

      // Handle tag connection
      const affiliation = record['Affiliation'];
      if (affiliation) {
        contactData.tag = {
          connect: { name: affiliation },
        };
      } else {
        // If there's no affiliation, we might want to skip tag connection
        // or handle it differently based on requirements.
        // For now, we'll just not include the tag field.
      }
      
      try {
        const newContact = await prisma.contact.create({
          data: contactData,
        });
        console.log(`Created contact: ${newContact.firstName} ${newContact.lastName} (ID: ${newContact.id})`);
      } catch (dbError) {
        console.error(`Failed to create contact for record: ${JSON.stringify(record)}`, dbError);
        if (dbError.code === 'P2002' && dbError.meta?.target?.includes('name') && affiliation) {
            console.error(`Potentially, the tag "${affiliation}" does not exist. Please ensure all tags in the CSV 'Affiliation' column exist in the 'Tag' table.`);
        } else if (dbError.message.includes("An operation failed because it depends on one or more records that were required but not found. Record to connect not found.")) {
             console.error(`The tag "${affiliation}" specified in the CSV does not exist in the database. Please create it first.`);
        }
      }
    }

    console.log('Import process completed.');
  } catch (error) {
    console.error('An error occurred during the import process:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  prisma.$disconnect().finally(() => process.exit(1));
});
