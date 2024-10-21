const express = require("express");
const app = express();
const port = 3000;

app.use(express.json()); // middleware pour parser les données JSON

// tableau pour stocker les items (in-memory)
let items = [];

// POST - pour ajouter un nouvel item
app.post("/items", (req, res) => {
  const newItem = req.body;
  items.push(newItem);
  res.status(201).send(newItem);
});

// GET - pour récupérer tous les items
app.get("/items", (req, res) => {
  res.status(200).send(items);
});

// GET - Récupérer un item par ID
app.get("/items/:id", (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = items.find((i) => i.id === itemId);

  if (item) {
    res.status(200).send(item);
  } else {
    res.status(404).send({ error: "Item not found" });
  }
});

// PUT - Mettre à jour un item existant
app.put("/items/:id", (req, res) => {
  const itemId = parseInt(req.params.id);
  const updatedItem = req.body;
  const index = items.findIndex((i) => i.id === itemId);

  if (index !== -1) {
    items[index] = updatedItem;
    res.status(200).send(updatedItem);
  } else {
    res.status(404).send({ error: "Item not found" });
  }
});

// DELETE - pour supprimer un item par ID
app.delete("/items/:id", (req, res) => {
  const itemId = parseInt(req.params.id);
  const index = items.findIndex((i) => i.id === itemId);

  if (index !== -1) {
    items.splice(index, 1);
    res.status(200).send({ message: "Item deleted" });
  } else {
    res.status(404).send({ error: "Item not found" });
  }
});

// pour lancer le serveur
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
