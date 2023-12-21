# myfriendbook

MyFriendBook is a full stack TypeScript contact info app demonstrating basic CRUD, clean UI, and TDD.

Tools used include Next.js/React, TailwindCSS, Node.js, MySQL w/Prisma ORM, and test driven development with Jest.

Prod MySQL db provisioned by Planetscale.
Deployed to Vercel.

## UI/UX & functionality:

Sign up or log in and add a new friend, update someone's info, or clear out some old contacts & notes.

---

## TDD

MyFriendBook follows test driven development to enhance development speed & debugging and ensure application stability.

My prismaService.test.ts test suites prove that all my prisma services work correctly.

---

## Backend

The primary purpose of this project is to demonstrate proficiency with backend software development, namely SQL and APIs.

Database CRUD functions written with [Prisma](https://www.prisma.io/) ORM on top of MySQL.

Prod db provisioned courtesy of [Planetscale](https://planetscale.com/).

Currently writing unit tests to troubleshoot findUnique, PUT, and DESTROY API routes.

---

## Frontend

// add description

## TODO

Implement full suite of unit tests to troubleshoot why these CRUD operations have bugs

- findUniqueOrThrow() (showFriend)
- update (updateFrind)
- delete (deleteFriend)

Authorization & authentication implemention in progress.

Add description of Frontend to README.
