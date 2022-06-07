import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  //qualquer alteração feita no banco de dados ira aparecer no log as query
  log: ["query"],
});
