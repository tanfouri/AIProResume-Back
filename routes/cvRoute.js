const express = require('express');
const multer = require('multer');
const { createCv , getCv ,deleteCv, updateCv} = require('../controllers/cvController');
const path = require("path");
const router = express.Router();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  
  const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 },
  });
  

router.route('/')
.post( upload.single('headshotImage'), createCv)
.get(getCv)
router.route('/:id').delete(deleteCv)
                    .put(upload.single('headshotImage'),updateCv)
                    
module.exports = router;