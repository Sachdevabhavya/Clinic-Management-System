const order = require("../model/order_medicine")
const upload_img = require("../middleware/prescription_image")

const {generateQrCode} = require("../middleware/order_qrcode")

const multer = require("multer")

//create order
const placeOrder = async (req, res, next) => {
  const { pname, home_address, hname, phone_no, email_id, medicines } = req.body;

  if (!home_address || !hname || !phone_no || !email_id || !medicines) {
    return res.status(400).json({ message: 'All required fields must be provided.' });
  }

  try {
    const newOrder = new order({
      pname,
      home_address,
      hname,
      phone_no,
      email_id,
      medicine: medicines,
      prescription: req.file ? req.file.filename : null
    });

    const qrCodeFilePath = await generateQrCode(pname, phone_no, email_id, medicines);

    const savedOrder = await newOrder.save();

    console.log(`Order created: ${savedOrder}`);
    console.log(`Order created with id: ${savedOrder._id}`);

    res.status(201).json({ message: 'Order placed successfully', order: savedOrder });
  } catch (error) {
    res.status(500).json({ message: 'Error placing order', error });
  }
};

//get all orders
const getAllOrders = async (req, res) =>{
    try {
        const orders = await order.find();
    
        if (!orders.length) {
          return res.status(404).json({ message: "No Orders Found" });
        }
    
        console.log(`Orders : \n${orders}`);
    
        return res.status(200).json({ orders });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
      }
}

//prescription image upload
const UploadImgMiddleware = (req, res, next) => {
    const upload = upload_img.store_image(req.body.pname);
    upload.single("prescription")(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json({ message: err.message });
      } else if (err) {
        return res.status(500).json({ message: err.message });
      }
  
      next();
    });
  };

//get order by id 
const getOrderById = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const get_order = await order.findById(orderId);

    if (!get_order) {
      return res.status(404).json({ message: "Order Not Found" });
    }

    console.log(`Order Id fetched : ${orderId}`)
    console.log(`Order Fetched with above id :${get_order}`)
    return res.status(200).json({ get_order });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};


module.exports = {
    getAllOrders,
    getOrderById,
    placeOrder,
    UploadImgMiddleware
}