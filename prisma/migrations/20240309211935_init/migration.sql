-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "userFirstname" TEXT NOT NULL,
    "userLastname" TEXT NOT NULL,
    "userPassword" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userId_key" ON "User"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_userEmail_key" ON "User"("userEmail");
