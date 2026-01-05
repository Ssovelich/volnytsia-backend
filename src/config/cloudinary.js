const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Функція-генератор сховища для різних папок
const createStorage = (folderName) => {
  return new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: folderName,
      allowed_formats: ["jpg", "png", "jpeg", "webp"],
    },
  });
};

const upload = multer({ storage: createStorage("volnytsia_awards") });

const uploadLeaders = multer({ storage: createStorage("volnytsia_leaders") });

const uploadMembers = multer({ storage: createStorage("volnytsia_members") });

const uploadBanners = multer({ storage: createStorage("volnytsia_banners") });

module.exports = { cloudinary, upload, uploadLeaders, uploadMembers, uploadBanners };