import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

const __dirname = path.resolve();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "backend", "uploads"));
  },

  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    cb(null, `image-${Date.now()}${extname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpg|jpeg|png|webp/;
  const mimetypes = /image\/jpg|image\/jpeg|image\/png|image\/webp/;

  const extname = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;

  if (filetypes.test(extname) && mimetypes.test(mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Images only"));
  }
};

const upload = multer({ storage, fileFilter });

router.post("/", upload.single("image"), (req, res) => {
  if (req.file) {
    res.status(200).send({
      message: "Image uploaded successfully",
      image: `/uploads/${req.file.filename}`,
    });
  } else {
    res.status(400).send({ message: "No image file provided" });
  }
});

export default router;