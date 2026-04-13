const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let content = {
  hero: "Welcome to Megaplex Prime",
  overview: "Best real estate project in city",
  amenities: "Gym, Pool, Parking",
  about: "We build premium homes",
  faq: "Q: Price? A: Contact us"
};

// LOGIN API
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@gmail.com" && password === "1234") {
    return res.json({ success: true });
  }

  res.json({ success: false });
});

// GET CONTENT
app.get("/content", (req, res) => {
  res.json(content);
});

// UPDATE CONTENT
app.put("/content", (req, res) => {
  content = req.body;
  res.json({ message: "Updated successfully" });
});

app.listen(5000, () => console.log("Server running"));