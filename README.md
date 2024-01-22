# Overview 
This project is a database for Unlocking Doors to store their contacts of helping ex-offenders reintegrate back into society. Users (depends on the roles mentioned below) can add, delete, and view contacts in the database. There is a tag feature to allow users to sort contacts based on what they are (ex. employment services).

There are 3 roles: 
Admin: can edit, add, and delete viewers and editors (gets below permissions as well)
Editor: can edit, add, and delete contacts (gets below permissions as well)
Viewer: can view and search the database

# Functionality
The application must maximize utility of each page as follows:

The auth0 login page is the first page users land on. After successful authorization, they are redirected to the index.vue page which contains all search functionality and is the main page of the application. 

SEARCH (index.vue) displays the organizations contacts in a table format. Attributes like name, phone number, email, and company take precedence over others in the table. A search bar is also present which must allow for searchabilty through all attributes (the attributes of a contact are further specified in the Add Contact section). The header of the search page allows the user to seamlessly navigate the application by clicking on the text. The SEARCH page also contains a left column which the user can use to narrow search results by: specific tags.

ADD CONTACT page can be accessed from the header and allows the user to create a new instance of contact. The body of the page contains fields which the user can fill in such as: name, company, address, and phones/other ways of contact. Additionally a section allows for the user to specify the narrative/use case of each contact and tags provide a functional form to filter and sort through the list of contacts. Data fields such as "prefix" and "salutation" can later be integrated in conjuction with 3rd party applications for the purpose of blast emails and the like. Upon confirming the "Create Contact" button, the user is redirected to the search page where the new contact will appear.

EDIT CONTACT page can be accessed by simply clicking on the contact that a user would like to edit. Only users who are authorized as editors or admins will be redirected to the edit contact page after clicking on their desired contact. This page is similar in structure to the add contact page and displays all the saved information about that specific contact. A user can change the information in the many fields and upon clicking the save button, their edits will be saved to our database and they'll be redirected back to the search page. If they wish to cancel their edits they can press the cancel button which will return them to the search page.

ADMIN page shows the list of users that have access to the application. As per the name, only admins can access this page. Admins can view and manage all the users who have access to the application as well as their type of access. Admins can also delete users who should not have access to the application anymore.

ADD USER page allows admins to add new users to the application. When a new user wants to sign up, they can do so by going going to the intitial auth0 page and sign up with an email/username and password. However they won't be granted access to the application until an existing admin adds their email/username and permission level via this page. This prevents anyone who has access to the auth0 page from signing up and getting access and must be verified/added by an existing admin. 

# Tech Stack + Third Party Integrations
This project uses Auth0 (connected to Taz's account) primarily for user authentication (logging in, confirming email, and logging out). However, from Taz's side, he can manually override user permissions, as well as add and delete users. 

Front end: Vue.js <br>
Meta: Nuxt.js <br>
Database: PostGreSQL <br>
Other: Prisma, Docker <br>
Auth0: Authentication service <br>

Deployment status: Not deployed

# Starting AND Setting up the Project Checklist

Clone the repository. <br>
Run npm install to download all the necessary packages and dependencies. <br>
Create a .env file and copy over .env.example with the correct information. <br>
Update the nuxt.config.ts with the necessary auth0 information. (ASK TAZ) <br>
Run docker-compose up. <br>
Run npx prisma studio. Brings up the database where you should add yourself as a new user in the User table. <br>
Run npm run dev. Open localhost:3000 and sign up with the same username/email you added to the database.

# Running Migration Script

npm i -D tsx (only need to run once)
npx tsx scripts/migration.ts (run the actual migration script)
