const multer = require("multer");
const mongoose = require("mongoose");
const { Reason, Product } = require("../Model/AddProduct");
const { NewKeyListInstance } = require("twilio/lib/rest/api/v2010/account/newKey");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "productImg") {
      cb(null, "uploads/");
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
function fileFilter(req, file, cb) {
  file.mimetype === "image/jpeg" || file.mimetype === "image/png"
    ? cb(null, true)
    : cb(null, false);
}
const upload = multer({ storage: storage, fileFilter: fileFilter });
const addProduct = async (req, resp) => {
  const { id } = req.params;
  const {
    name,
    description,
    size,
    gender,
    basePrice,
    stock,
    discountType,
    discount,
    category,
  } = req.body;
  const file = req.file ? req.file.path : "default-file-path";
  console.log(file);
  const data = await Product.create({
    name,
    description,
    size,
    gender,
    basePrice,
    stock,
    discountType,
    discount,
    productImg: file,
    category,
    createdBy: id,
  });
  data.save();
  if (data) {
    resp.status(200).json({
      message: "successfully added",
      success: true,
      data: data,
    });
  }

  console.log(req.file);
};
const getAll = async (req, resp) => {
  const data = await Product.aggregate([
    {
      $sort: { _id: -1 },
    },
    {
      $lookup: {
        from: "users",
        let: { user_id: "$createdBy" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$_id", "$$user_id"],
              },
            },
          },
        ],
        as: "user_Data"
      },
    },
    {
      $unwind:
      {
        path: "$user_Data",
        // preserveNullAndEmptyArrays: false
      }
    },
  ]);
  console.log(data);
  return resp.status(200).json({
    data: data,
    mesaage: "all products listing",
  });
};
const getallByUserId = async (req, resp) => {
  const { userId } = req.query; // Or req.params.userId depending on your route

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return resp.status(400).json({ message: "Invalid userId" });
  }

  const data = await Product.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $sort: { _id: -1 },
    },
    {
      $lookup: {
        from: "users",
        let: { user_id: "$createdBy" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$_id", "$$user_id"],
              },
            },
          },
        ],
        as: "user_Data",
      },
    },
    {
      $unwind: {
        path: "$user_Data",
        preserveNullAndEmptyArrays: true,
      },
    },
  ]);

  return resp.status(200).json({
    data: data,
    message: "Filtered products by user",
  });
};
module.exports = {
  addProduct,
  upload,
  getAll,
  getallByUserId
};
