const Order = require("../models/order");
const Product = require("../models/product");

exports.getAll = (req, res) => {
  Order.find()
    .populate("product", "name")
    .then(orders => {
      res.status(200).json(orders);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.create = (req, res) => {
  const productId = req.body.product;

  Product.findById(productId)
    .then(product => {
      if (!product)
        return res
          .status(404)
          .json({ error: "A product with the provided ID not found!" });

      const order = {
        product: productId,
        quantity: req.body.quantity
      };

      Order.create(order).then(result => {
        console.log(result);
        res.status(201).json(result); // TODO:
      });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};

exports.getOne = (req, res) => {
  const _id = req.params.id;

  Order.findById(_id)
    .then(order => {
      if (order) res.status(200).json(order);
      res
        .status(500)
        .json({ 
            message: "The order with the provided ID is not found."
         });
    })
    .catch(err => {
      res.status(500).json({
        error: err + " , error here"
      });
    });
};

exports.deleteOne = (req, res) => {
  const _id = req.params.id;

  Order.deleteOne({ _id })
    .then(result => {
      console.log(result);
      res.status(200).json(result); // TODO:
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};
