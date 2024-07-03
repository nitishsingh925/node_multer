import express from "express";
import multer from "multer";

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./uploads"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

// const upload = multer({ dest: "uploads/" });

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("homepage");
});

app.post("/", upload.single("fileNamefromEJS"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  res.send("File uploaded successfully");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
