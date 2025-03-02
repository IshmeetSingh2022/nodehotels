const express = require('express');
const db = require('./db.js');  // Ensure database connection is established
const Menu = require('./models/menu.js');
const personRoutes = require('./routes/person.js'); // Corrected import

const app = express();
app.use(express.json());

app.get('/menu', async (req, res) => {
    try {
        const data = await Menu.find();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: "Cannot fetch menu" });
    }
});

app.post('/menu', async (req, res) => {
    try {
        const newItem = new Menu(req.body);
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(500).json({ error: "Cannot add to menu", details: err.message });
    }
});

// Use the correct router for handling people
app.use("/person", personRoutes);

app.listen(3000, () => console.log("Server started at port 4000"));
