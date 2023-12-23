import prisma from "./prisma";

/*
    ==========================================

    test suite for prisma.ts

    ==========================================

  */

describe("Prisma Client", () => {
  it("should initialize the Prisma Client", async () => {
    // check if the prisma client is defined
    expect(prisma).toBeDefined();

    // try to connect to the database
    await prisma.$connect();

    // if the connection is successful, the test will pass
  });
});
