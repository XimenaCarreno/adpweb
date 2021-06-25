const mongoose = require('mongoose');

let categoriesSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    }
});

const categoriesModel = mongoose.model('CategoriesSchema', categoriesSchema, 'categories');

module.exports = categoriesModel;
