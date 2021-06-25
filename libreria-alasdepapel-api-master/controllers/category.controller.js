const handler = require('../utils/handler');
const status = require('http-status');

let _category;


const getAll = (req, res) => {  
    _category.find({ })
        .sort({})
        .exec(handler.handleOne.bind(null, 'categories', res));
  };

const getById = (req, res) => {
    const { id } = req.params;
    _category.findOne({ _id: id })
        .sort({})
        .exec(handler.handleOne.bind(null, 'category', res));
};

const createCategory = (req, res) => {
    const category = req.body;
    _category.create(category)
        .then(
            (data) => {
                res.status(status.OK);
                res.json({ msg: 'Categoria creada correctamente', data: data });
            }
        )
        .catch(
            (err) => {
                res.status(status.BAD_REQUEST);
                res.json({ msg: 'No se ha creado', data: err })
            }
        )

};

const deleteById = (req, res) => {
    const id = req.params.id;

    _category.remove({ _id: id }, (err, data) => {
        if (err) {
            res.status(status.BAD_REQUEST);
            res.json({ msg: "No se pudo realizar la operación, intente nuevamente" });
        } else {
            res.status(status.OK);
            res.json({ msg: "La categoria se eliminó correctamente" });
        }
    });
};

const updateById = (req, res) => {
    const id = req.params.id;
    const newData = req.body;

    const query = { _id: id };

    _category.findOneAndUpdate(query, newData, (err, data) => {
        if (err) {
            res.status(status.BAD_REQUEST);
            res.json({ msg: "No se realizar la operación, intente nuevamente" });
        } else {
            res.status(status.OK);
            res.json({ msg: "La categoria se modificó correctamente" });
        }
    });
};

module.exports = (Category) => {
    _category = Category;
    return ({
        getAll,
        getById,
        createCategory,
        updateById,
        deleteById
    });
}
