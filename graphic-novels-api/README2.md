***ORIGINAL LOCAL ARRAY DB CODE***

//connect JSON datafile
import novels from './graphic-novel-db.js'

// REST API CRUD (GET ALL)
app.get("/novels", (req, res) => {
  res.json(novels);
});

//REST API CRUD (GET ONE)
app.get("/novels/:isbn", (req, res) => {
  const book = novels.find(n => n.isbn === req.params.isbn);
  if (!book) return res.status(404).json({ error: "Not found" });
  res.json(book);
});

//REST API CRUD (POST)
app.post("/novels", (req, res) => {
  const newNovel = req.body;
  novels.push(newNovel);
  res.status(201).json(newNovel);
});

//REST API CRUD (PUT)
app.put("/novels/:isbn", (req, res) => {
  const index = novels.findIndex(n => n.isbn === req.params.isbn);
  if (index === -1) return res.status(404).json({ error: "Not found" });

  novels[index] = { ...req.body, isbn: req.params.isbn }; // force isbn to match URL
  res.json(novels[index]);
});


//REST API CRUD (DELETE)
app.delete("/novels/:isbn", (req, res) => {
  const index = novels.findIndex(n => n.isbn === req.params.isbn);
  if (index === -1) return res.status(404).json({ error: "Not found" });
  const deleted = novels.splice(index, 1);
  res.json(deleted[0]);
});

//start server
app.listen(PORT, () => console.log(`Server has started on ${PORT}`))