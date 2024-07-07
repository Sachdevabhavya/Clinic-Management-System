const multer = require("multer");
const path = require("path");

const prescription_img_dir = path.join(__dirname, "../prescription_images/");

async function store_image(pname) {
  const Storage = multer.diskStorage({
    destination: (req, prescription_img, cb) => {
      cb(null, prescription_img_dir);
    },

    filename: async (req, prescription_img, cb) => {
      const ext = path.extname(prescription_img.originalname);
      const FileName = `${pname}-${ext}`;
      cb(null, FileName);
    },
  });

  const upload = multer({
    storage: Storage,
    fileFilter: (req, user_img, cb) => {
      if (
        user_img.mimetype == "image/png" ||
        user_img.mimetype == "image/jpeg" ||
        user_img.mimetype == "image/jpg"
      ) {
        cb(null, true);
      } else {
        cb(null, false);
        console.log("Wrong file type alert");

        return cb(alert("Only JPG , JPEG and PNG file types are allowed"));
      }
    },
  });

  return upload;
}

module.exports = { store_image };
