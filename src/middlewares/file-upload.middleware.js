import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/");
  },
  filename: function (req, file, cb) {
    const path = file.fieldname + "-" + file.originalname;
    cb(null, path);
  },
});

export const upload = multer({ storage: storage });

export const UploadSingle = (name) => {
  return upload.single(name);
  // next();
};
