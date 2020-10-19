const User = require("../models/user");
const Order = require("../models/order");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user was found in DB"
      });
    }
    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  return res.json(req.profile);
};
exports.createDetails = (req, res) => {
  const user = req.profile;
  user.role=req.body.role;
  user._id=req.body._id;
  user.name=req.body.name;
  user.email=req.body.email;
  user.phone =req.body.phone;
  user.address=req.body.address;

  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        error: "NOT able to save more details of user"
      });
    }
    res.json({
      name:user.name,
      email:user.email,
      phone: user.phone,
      address: user.address,
      id: user._id
    });
  });
};


exports.updateUser = (req, res) => {
  Order.updateMany(
    { _id: req.profile._id },
    { $set: req.body},
    (err, user) => {
      console.log(user);
      if (err) {
        return res.status(400).json({
          error: "You are not authorized to update this user"
        });
      }
      
      user.salt = undefined;
      user.encry_password = undefined;
      res.json(user);
    }
  );
};




exports.pushOrderInPurchaseList = (req, res, next) => {
  let purchases = [];
  req.body.order.products.forEach(product => {
    purchases.push({
      _id: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      quantity: product.quantity,
      amount: req.body.order.amount,
      transaction_id: req.body.order.transaction_id
    });
  });

  //store thi in DB
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { purchases: purchases } },
    { new: true },
    (err, purchases) => {
      if (err) {
        return res.status(400).json({
          error: "Unable to save purchase list"
        });
      }
      next();
    }
  );
};
