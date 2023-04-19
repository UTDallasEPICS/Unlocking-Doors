# Unlocking Doors
A non-profit organization that aims to support people in need, with a focus on those that have been through the criminal justice system. They feature a network of resources that include rehab, schooling, job employement and more. It is crucial for Unlocking Doors to keep track of the many different kinds of contacts they have in order to find the best services someone in need may require.

## What they require?
A user friendly and accessible database that organizes all the contacts that Unlocking Door uses.

## Functional Requirements

**Users and Permissions**
- Viewers   
    Can only view contact information.
- Editors    
    Can create, view and edit contact information.
- Admins    
    Can create, view and edit contact information. Can also create, view and edit users and their access to the database.


**Pages**
- Login Page   
    Directs users to auth0 which will handle authentication.

- Search Contacts Page    
    Homepage of database. This is where contacts will be displayed and users will find specific ones based on filters.

- View Contacts Page    
    Users can view all fields of information.

- Add Contacts Page    
    Users can edit fields of information and apply filters to selected contact.

- Admins Page    
    Only accessible to admins. List of all users who have access to the database along with their privileges.


##Tech Stack
- Nuxt.js
- PostgreSQL
- Prisma
- Auth0
