const router = require('express').Router();

module.exports = (wagner) => {

    const bookController = wagner.invoke((Book, Category) =>
      require('../controllers/book.controller')(Book, Category));

    router.get('/', (req, res) =>
      bookController.getAll(req, res));

    router.get('/new', (req, res) =>
      bookController.getAllNewBooks(req, res));

    router.get('/last', (req, res) =>
      bookController.getLastBooks(req, res));

    router.get('/category', (req, res) =>
      bookController.getAllByCategory(req, res));

    router.get('/:id', (req, res) =>
      bookController.getById(req, res));

    router.get('/category/:id', (req, res) =>
      bookController.getByCategoryId(req, res));

    router.post('/create', (req, res) =>
      bookController.createBook(req, res));

    router.put('/:id', (req, res) =>
      bookController.updateById(req, res));

    router.delete('/:id', (req, res) =>
      bookController.deleteById(req, res));

    return router;
};
