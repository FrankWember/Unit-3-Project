const express = require("express"); // importing express module
const { PrismaClient } = require("@prisma/client"); // importing prisma client
const cors = require("cors");
const app = express();
const prisma = new PrismaClient();
const PORT = 3000;
app.use(express.json()); // Middleware to parse the json request bodies
app.use(cors());
//endpoint for user signup

app.post("/signup", async (req, res) => {
  const { username, password } = req.body; // extracting the username and the password from the request

  try {
    //creating a new user in the my user database
    const user = await prisma.user.create({
      data: {
        username,
        password,
      },
    });
    res.json(user); //Sending the corresponding user as a responds
  } catch (error) {
    console.error(error);
  }
});

//Endpoint for adding a new kudo board
app.post("/kudoboard", async (req, res) => {
  const { title, category, authorId } = req.body;

  try {
    const newKudo = await prisma.kudoboard.create({
      data: {
        title,
        category,
      },
    });
    res.json(newKudo);
  } catch (error) {
    console.error("Error creating kudo board:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
//Endpoint for getting all the kudoboard

app.get("/kudoboard", async (req, res) => {
  // retreiving all the kudoboard from the database
  const kudoboard = await prisma.kudoboard.findMany({
    include: {},
  });

  res.json(kudoboard); //Sending all the retrieved kudoboard as responds
});

app.delete("/kudoboard/:id", async (req, res) => {
  const { id } = req.params; //Extracting the id from the request parameters

  try {
    const deletedkudo = await prisma.kudoboard.delete({
      where: { id: parseInt(id) }, //converting the string to Integer before comparing
    });
    res.json(deletedkudo);
  } catch (error) {
    console.error(error);
  }
});

//Kudocard

// Endpoint for adding a new KudoCard to a Kudoboard
// Endpoint for adding a new KudoCard to a Kudoboard
// Endpoint for adding a new KudoCard to a Kudoboard
app.post("/kudoboard/:boardId/kudocard", async (req, res) => {
  const { upvotes = 0, giphyPicture, title, description, authorId } = req.body;
  const { boardId } = req.params;

  try {
    const newKudoCard = await prisma.kudoCard.create({
      data: {
        upvotes,
        giphyPicture,
        title,
        description,

        kudoboard: { connect: { id: parseInt(boardId) } }, // Linking the KudoCard to the Kudoboard with boardId
      },
    });
    res.json(newKudoCard);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating KudoCard");
  }
});

// Endpoint for getting all KudoCards for a Kudoboard
app.get("/kudoboard/:boardId/kudocards", async (req, res) => {
  const { boardId } = req.params;

  try {
    const kudoCards = await prisma.kudoCard.findMany({
      where: { kudoboardId: parseInt(boardId) }, // Filter by Kudoboard ID
    });
    res.json(kudoCards);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving KudoCards");
  }
});

// Endpoint for updating a KudoCard
app.put("/kudocard/:cardId", async (req, res) => {
  const { cardId } = req.params;
  const { upvote, giphyPicture, title, description } = req.body;

  try {
    const updatedKudoCard = await prisma.kudoCard.update({
      where: { id: parseInt(cardId) },
      data: {
        upvote,
        giphyPicture,
        title,
        description,
      },
    });
    res.json(updatedKudoCard);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating KudoCard");
  }
});

// Endpoint for deleting a KudoCard
app.delete("/kudocard/:cardId", async (req, res) => {
  const { cardId } = req.params;

  try {
    const deletedKudoCard = await prisma.kudoCard.delete({
      where: { id: parseInt(cardId) },
    });
    res.json(deletedKudoCard);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting KudoCard");
  }
});

app.post("/kudoboard/:boardId/kudocard/:cardId/upvote", async (req, res) => {
  const { cardId } = req.params;

  try {
    const updatedKudoCard = await prisma.kudoCard.update({
      where: { id: parseInt(cardId) },
      data: { upvotes: { increment: 1 } },
    });
    res.json(updatedKudoCard);
  } catch (error) {
    res.status(500).json({ error: "Failed to upvote KudoCard" });
  }
});

app.post("/kudoboard/:boardId/kudocard/:cardId/comment", async (req, res) => {
  const { cardId } = req.params;
  const { text } = req.body;

  try {
    const comment = await prisma.comment.create({
      data: {
        text,
        kudoCardId: parseInt(cardId),
      },
    });
    res.json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding comment");
  }
});

app.get("/kudoboard/:boardId/kudocard/:cardId/comments", async (req, res) => {
  const { cardId } = req.params;

  try {
    const comments = await prisma.comment.findMany({
      where: {
        kudoCardId: parseInt(cardId),
      },
    });
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching comments");
  }
});

app.put("/kudocard/:cardId/upvote", async (req, res) => {
  const { cardId } = req.params;

  try {
    const updatedKudoCard = await prisma.kudoCard.update({
      where: { id: parseInt(cardId) },
      data: { upvotes: { increment: 1 } },
    });
    res.json(updatedKudoCard);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating upvote");
  }
});

app.listen(PORT, () => {
  console.log(`Port is running on port ${PORT}`);
});
