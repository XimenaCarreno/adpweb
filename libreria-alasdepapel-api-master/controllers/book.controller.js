const handler = require('../utils/handler');
const status = require('http-status');

let _book;
let _category;


const getAll = (req, res) => {  
    _book.find({})
        .populate({path: 'category', model: 'CategoriesSchema' })
        .exec(handler.handleOne.bind(null, 'books', res));
};

const getAllNewBooks = (req, res) => {
    _book.find({})
        .sort({'createdAt': 1})
        .exec(handler.handleOne.bind(null, 'books', res));
};

const getLastBooks = (req, res) => {  
    _book.find({})
        .sort({'createdAt': 1})
        .limit(5)
        .exec(handler.handleOne.bind(null, 'books', res));
};

const getById = (req, res) => {
    const { id } = req.params;
    _book.findOne({ _id: id })
        .exec(handler.handleOne.bind(null, 'book', res));
};

const getAllByCategory = async (req, res) => {
    const categories = await _category.find({});
    const getBook = (category) => {
        return _book.find({category: category._id}).sort({'createdAt': 1}).limit(5);
    };

    const results = Promise.all(categories.map(getBook));
    results
        .then((data) => {
            const final = data.map((c, idx) => new Object({category: categories[idx], books: c}) );
            return res.status(status.OK).json({ books: final });
        })
        .catch((error) => {
            return res.status(status.INTERNAL_SERVER_ERROR).json({ error: error });
        });
};

const getByCategoryId = (req, res) => {
    const { id } = req.params;
    _book.find({ category: id })
        .sort({})
        .exec(handler.handleOne.bind(null, 'books', res));
};

const createBook = (req, res) => {
    const book = req.body;
    _book.create(book)
        .then(
            (data) => {
                res.status(status.OK);
                res.json({ msg: 'Libro creado correctamente', data: data });
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
    const { id } = req.params;

    _book.remove({ _id: id }, (err, data) => {
        if (err) {
            res.status(status.BAD_REQUEST);
            res.json({ msg: "No se pudo realizar la operación, intente nuevamente" });
        } else {
            res.status(status.OK);
            res.json({ msg: "El libro se eliminó correctamente" });
        }
    });
};

const updateById = (req, res) => {
    const { id } = req.params;
    const newData = req.body;

    _book.findOneAndUpdate({ _id: id }, newData, (err, data) => {
        if (err) {
            res.status(status.BAD_REQUEST);
            res.json({ msg: "No se realizar la operación, intente nuevamente" });
        } else {
            res.status(status.OK);
            res.json({ msg: "El libro se modificó correctamente" });
        }
    });
};

module.exports = (book, category) => {
    _book = book;
    _category = category;
    return ({
        getAll,
        getAllNewBooks,
        getLastBooks,
        getAllByCategory,
        getById,
        getByCategoryId,
        createBook,
        updateById,
        deleteById
    });
}
