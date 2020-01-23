const Product = require("../models/product");

exports.getAll = (req, res, next) => {
  Product.find({})
    .select("name price _id image")
    .exec()
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.create = (req, res) => {
  const product = {
    name: req.body.name,
    price: req.body.price,
    // TODO: substring the /uploads, IF IMAGE name has spaces it won't be retrieved
    // str = str.replace(/\s/g, '-')
    image: req.file.path
  };

  Product.create(product)
    .then(newProduct => {
      res.status(201).json(newProduct);
    })
    .catch(err =>
      res.status(500).json({
        error: err
      })
    );
};

exports.getOne = (req, res) => {
  const _id = req.params.id;

  Product.findById({ _id })
    .then(product => {
      if (product) res.status(200).json(product);
      res.status(200).json({
        message: "There is not product with provided ID."
      });
    })
    .catch(err => {
      res.status(500).json(err);
    });
};

exports.updateOne = (req, res) => {
  const _id = req.params.id;
  const fields = req.body;

  Product.update({ _id }, fields)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json(err);
    });
};

exports.deleteOne = (req, res) => {
  const _id = req.body.id;

  Product.deleteOne(_id)
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json({ error: err }));
};
