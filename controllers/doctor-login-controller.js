const login_doctor = require("../model/doctor_login");

const bcrypt = require("bcryptjs");
const multer = require("multer");

const { generateQrCode } = require("../middleware/doctor_qrcode");


const login = async (req, res, next) => {
  const { email, password } = req.body;

  console.log("Request Headers:", req.headers);
  console.log("Request Body:", req.body);

  try {
    const existing_doctor = await login_doctor.findOne({ email });

    if (!existing_doctor) {
      console.log(`Couldn't find doctor by this email: ${email}`);
      return res
        .status(404)
        .json({ message: "Couldn't find doctor by this email" });
    }

    const isPasswordValid = bcrypt.compareSync(
      password,
      existing_doctor.password
    );

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Incorrect Password" });
    }

    console.log(`Login Successful with DoctorId ${existing_doctor._id}`);
    return res.status(200).json({
      message: `Login Successful with DoctorId ${existing_doctor._id}`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

// doctor signin
const signUp = async (req, res, next) => {
  const { name, phone_no, email, password, Hname } = req.body;

  // Log the entire request body to debug the issue
  console.log("Request Body:", req.body);

  // Check if all required fields are provided
  if (!name || !phone_no || !email || !password || !Hname) {
    console.log("Missing fields:", {
      name: !!name,
      phone_no: !!phone_no,
      email: !!email,
      password: !!password,
      Hname: !!Hname,
    });
    return res.status(400).json({ message: "All fields must be provided." });
  }

  try {
    const existing_doctor = await login_doctor.findOne({ email });

    if (existing_doctor) {
      console.log(`Doctor already exists with the email id ${email}`);
      return res.status(400).json({
        message: `Doctor already exists with the given email id ${email}`,
      });
    }

    // Log the password to ensure it's being received (Do not do this in production!)
    console.log(`Received password: ${password}`);

    const hashedPassword = bcrypt.hashSync(password);

    const doctor = new login_doctor({
      name,
      phone_no,
      email,
      password: hashedPassword,
      Hname,
      image: req.file ? req.file.filename : null, // If using multer for file uploads
    });

    const qrCodeFilePath = await generateQrCode(name, Hname);

    await doctor.save();
    console.log(`Doctor created successfully: ${doctor}`);
    console.log(`Doctor successfully saved with id: ${doctor._id}`);
    return res
      .status(201)
      .json({ message: "Doctor created successfully", doctor });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

const UploadImgMiddleware = (req, res, next) => {
  const upload = upload_img.store_image(req.body.name);
  upload.single("image")(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ message: err.message });
    } else if (err) {
      return res.status(500).json({ message: err.message });
    }

    next();
  });
};



module.exports = {
  login,
  signUp,
  UploadImgMiddleware,
};
