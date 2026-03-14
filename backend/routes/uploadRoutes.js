import express from "express";
import multer from "multer";
import ImageKit from "imagekit";

const router = express.Router();

// ImageKit config
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

// Use memory storage instead of disk
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const mimetypes = /image\/jpg|image\/jpeg|image\/png|image\/webp/;
  if (mimetypes.test(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Images only"));
  }
};

const upload = multer({ storage, fileFilter });

router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ message: "No image file provided" });
    }

    // Upload to ImageKit
    const result = await imagekit.upload({
      file: req.file.buffer,           // file buffer from multer memory storage
      fileName: `product-${Date.now()}`,
      folder: "/products",             // folder in ImageKit
    });

    res.status(200).json({
      message: "Image uploaded successfully",
      image: result.url,               // ImageKit URL returned to frontend
    });

  } catch (error) {
    console.error("ImageKit upload error:", error);
    res.status(500).json({ message: "Image upload failed" });
  }
});

export default router;
