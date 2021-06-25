const mongoose = require('mongoose');
const _ = require('underscore');

module.exports = (wagner) => {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost:27017/library', {useUnifiedTopology: true, useNewUrlParser: true});

    wagner.factory('db', () => mongoose);
    const User = require('./user.model');
    const Book = require('./book.model');
    const Category = require('./category.model');

    const models = {
        User,
        Book,
        Category
    };

    _.each(models, (v, k) => {
        wagner.factory(k, () => v);
    });
}
