const express = require('express');
const router = express.Router();
const Person = require('../models/person.js'); // Fixed import

// Fetch employees by work type
router.get('/:worktype', async (req, res) => {
    try {
        const { worktype } = req.params;
        if (!['waiter', 'chef', 'manager'].includes(worktype)) {
            return res.status(400).json({ error: "Invalid work type" });
        }
        const people = await Person.find({ worktype });
        res.status(200).json(people);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a new employee
router.post('/', async (req, res) => {
    try {
        const newPerson = new Person(req.body);
        await newPerson.save();
        res.status(201).json({ message: "Person added successfully", person: newPerson });
    } catch (err) {
        res.status(500).json({ error: "Failed to add person", details: err.message });
    }
});

// Update employee details
router.put('/:id', async (req, res) => {
    try {
        const person_id = req.params.id;
        const update = req.body;

        const updatedPerson = await Person.findByIdAndUpdate(person_id, update, {
            new: true, // Returns the updated document
            runValidators: true // Ensures validation is applied
        });

        if (!updatedPerson) {
            return res.status(404).json({ error: "Person not found" });
        }

        res.status(200).json({ message: "Person updated successfully", person: updatedPerson });
    } catch (err) {
        res.status(500).json({ error: "Unable to update person", details: err.message });
    }
});

module.exports = router;
