const mongoose = require('mongoose');

let booksSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories',
        require: true
    }
}, { timestamps: true });

const booksModel = mongoose.model('BooksSchema', booksSchema, 'books');

module.exports = booksModel;
