const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    dish: {
        type: String,
        required: true
    },
    is_drink: {
        type: Boolean,
        default: false
    },
    taste: {
        type: String,
        enum: ['sour', 'sweet'],
        required: true
    },
    ingredients: {
        type: [String],
        default: []
    }
});

const Menu = mongoose.model('Menu', menuSchema);
module.exports = Menu;
