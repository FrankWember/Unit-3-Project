-- CreateTable
CREATE TABLE "Kudoboard" (
    "id" SERIAL NOT NULL,
    "picture" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Kudoboard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KudoCard" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "giphyPicture" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "upvotes" INTEGER NOT NULL DEFAULT 0,
    "kudoboardId" INTEGER NOT NULL,

    CONSTRAINT "KudoCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "kudoCardId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "KudoCard" ADD CONSTRAINT "KudoCard_kudoboardId_fkey" FOREIGN KEY ("kudoboardId") REFERENCES "Kudoboard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_kudoCardId_fkey" FOREIGN KEY ("kudoCardId") REFERENCES "KudoCard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
