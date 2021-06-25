const router = require('express').Router();

module.exports = (wagner) => {

    const categoryController = wagner.invoke((Category) =>
      require('../controllers/category.controller')(Category));

    router.get('/', (req, res) =>
      categoryController.getAll(req, res));

    router.get('/:id', (req, res) =>
      categoryController.getById(req, res));

    router.post('/create', (req, res) =>
      categoryController.createCategory(req, res));

    router.put('/:id', (req, res) =>
      categoryController.updateById(req, res));

    router.delete('/:id', (req, res) =>
      categoryController.deleteById(req, res));

    return router;
};
