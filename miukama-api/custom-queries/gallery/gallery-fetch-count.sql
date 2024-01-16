SELECT COUNT("Gallery"."id") FROM "Galleries" AS "Gallery" JOIN "Users" AS "User" ON "Gallery"."userId" = "User"."id" AND "User"."deletedAt" IS NULL AND "Gallery"."deletedAt" IS NULL
