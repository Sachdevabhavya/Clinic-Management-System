const order = require("../model/order_medicine")
const upload_img = require("../middleware/prescription_image")

const order_qr_code = require("../middleware/order_qrcode")

const multer = require("multer")

const placeOrder = async(req , res , next) =>{
    const {pname ,home_address, hname, phone_no, email_id, medicines, order_prescription_qrcode } = req.body;

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
            medicines,
            order_prescription_qrcode,
            prescrption: req.file ? req.file.filename : null
        });

        const qrCodeFilePath = await order_qr_code.generateQrCode(req.body.pname,req.body.phone_no,req.body.emailId , req.body.medicines);
        newOrder.qrcode = qrCodeFilePath

        await newOrder.save();

        res.status(201).json({ message: 'Order placed successfully', order: newOrder });
    } catch (error) {
        res.status(500).json({ message: 'Error placing order', error });
    }
}


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

const UploadImgMiddleware = (req, res, next) => {
    const upload = upload_img.store_image(req.body.pname);
    upload.single("image")(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json({ message: err.message });
      } else if (err) {
        return res.status(500).json({ message: err.message });
      }
  
      next();
    });
  };


const getOrderById = async (req, res) => {
  const orderId = req.params.order_id;
  try {
    const get_order = await order.findById(orderId);

    if (!get_order) {
      return res.status(404).json({ message: "Order Not Found" });
    }

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