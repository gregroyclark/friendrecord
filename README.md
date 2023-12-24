# myfriendbook

MyFriendBook is a full stack TypeScript contact info app demonstrating basic CRUD, clean UI, and TDD.

The primary purpose of this project is to demonstrate proficiency with backend software development, namely SQL and APIs (composing and consuming).

Tools used include Next.js/React, TailwindCSS, Node.js, MySQL w/Prisma ORM, and test driven development with Jest.

Prod MySQL db provisioned by Planetscale.
Deployed to Vercel.

---

## Backend

Database CRUD functions written with [Prisma](https://www.prisma.io/) ORM on top of MySQL.

Available CRUD operations:

- CREATE a friend record.
- READ full table, or grab a single record.
- UPDATE/PUT a record.
- DELETE a record.

Prod db provisioned courtesy of [Planetscale](https://planetscale.com/).

---

## TDD

MyFriendBook follows test driven development to enhance development speed & debugging and ensure application stability.

The prismaService.test.ts test suites prove that all my prisma services work correctly.

---

## UI/UX & functionality:

Add a new friend, view all your friends or a single friend, update someone's info, or clear out some old contacts & notes.

Soon: sign up or log in. Each user will have their own private data table.

---

## Frontend

// add description

## To Do

Continue building out test suite, starting with src/pages/api.

Implement authorization & authentication:

- user SQL pool
- CREATE user function & prisma service
- GET user function & prisma service
- private tables for logged in users
- front end update with sign up & log in UI flows

Add some sort of caching to minimize API calls

Add description of Frontend to README.

React Native port!?
