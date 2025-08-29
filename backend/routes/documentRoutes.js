// const express = require("express");
// const Document = require("../models/Document");
// const bcrypt = require("bcryptjs");
// const router = express.Router();

// // 🆕 Middleware: dummy auth (replace with real auth middleware)
// const authMiddleware = (req, res, next) => {
//   req.user = { _id: "68b059c9fcb268103f018c44" }; // replace with real user ID from JWT
//   next();
// };

// router.use(authMiddleware);

// // 🆕 Create new document with optional password
// router.post("/", async (req, res) => {
//   try {
//     const { title, content, password } = req.body;
//     if (!title) return res.status(400).json({ error: "Title is required" });

//     const doc = new Document({
//       title,
//       content,
//       owner: req.user._id,
//       password: password || undefined,
//     });

//     await doc.save();
//     res.status(201).json(doc);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // 📄 Get all documents owned by or shared with user
// router.get("/", async (req, res) => {
//   try {
//     const docs = await Document.find({
//       $or: [{ owner: req.user._id }, { sharedWith: req.user._id }],
//     }).sort({ updatedAt: -1 });

//     res.json(docs);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // 🔍 Get single document by ID with password check
// router.get("/:id", async (req, res) => {
//   try {
//     const doc = await Document.findById(req.params.id);
//     if (!doc) return res.status(404).json({ error: "Document not found" });

//     // Check owner or sharedWith
//     if (
//       doc.owner.toString() !== req.user._id.toString() &&
//       !doc.sharedWith.includes(req.user._id)
//     ) {
//       return res.status(403).json({ error: "Not authorized" });
//     }

//     // Password check
//     if (doc.password) {
//       const { password } = req.query;
//       const valid = await bcrypt.compare(password || "", doc.password);
//       if (!valid) return res.status(401).json({ error: "Incorrect password" });
//     }

//     res.json(doc);
//   } catch (err) {
//     res.status(400).json({ error: "Invalid document ID" });
//   }
// });

// // ✏️ Update document (only owner)
// router.put("/:id", async (req, res) => {
//   try {
//     const { title, content, password } = req.body;

//     const doc = await Document.findById(req.params.id);
//     if (!doc) return res.status(404).json({ error: "Document not found" });

//     // Only owner can update
//     if (doc.owner.toString() !== req.user._id.toString()) {
//       return res.status(403).json({ error: "Not authorized" });
//     }

//     // Update fields
//     doc.title = title;
//     doc.content = content;
//     if (password) {
//       const salt = await bcrypt.genSalt(10);
//       doc.password = await bcrypt.hash(password, salt);
//     }

//     await doc.save();
//     res.json(doc);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // 🗑️ Delete document (only owner)
// router.delete("/:id", async (req, res) => {
//   try {
//     const doc = await Document.findById(req.params.id);
//     if (!doc) return res.status(404).json({ error: "Document not found" });

//     // Only owner can delete
//     if (doc.owner.toString() !== req.user._id.toString()) {
//       return res.status(403).json({ error: "Not authorized" });
//     }

//     await doc.deleteOne();
//     res.json({ message: "Document deleted successfully" });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // 🆕 Share document with another user
// router.post("/:id/share", async (req, res) => {
//   try {
//     const { userIdToShare } = req.body;
//     const doc = await Document.findById(req.params.id);
//     if (!doc) return res.status(404).json({ error: "Document not found" });

//     if (doc.owner.toString() !== req.user._id.toString())
//       return res.status(403).json({ error: "Not authorized" });

//     if (!doc.sharedWith.includes(userIdToShare)) {
//       doc.sharedWith.push(userIdToShare);
//       await doc.save();
//     }

//     res.json({ message: "Permission granted" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;


const express = require("express");
const Document = require("../models/Document");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const multerS3 = require("multer-s3");
const s3 = require("../config/s3");

const router = express.Router();

// 🆕 Middleware: dummy auth (replace with real auth middleware)
const authMiddleware = (req, res, next) => {
  req.user = { _id: "68b059c9fcb268103f018c44" }; // replace with real user ID from JWT
  next();
};

router.use(authMiddleware);

// ------------------- S3 Storage Setup -------------------
console.log("Bucket:", process.env.AWS_BUCKET_NAME);
console.log("Region:", process.env.AWS_REGION);
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: "public-read", // file accessible via public URL
    key: (req, file, cb) => {
      cb(null, Date.now().toString() + "-" + file.originalname);
    },
  }),
});

// ------------------- Document CRUD -------------------

// 🆕 Create new document with optional password
router.post("/", async (req, res) => {
  try {
    const { title, content, password } = req.body;
    if (!title) return res.status(400).json({ error: "Title is required" });

    const doc = new Document({
      title,
      content,
      owner: req.user._id,
      password: password || undefined,
    });

    await doc.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📄 Get all documents owned by or shared with user
router.get("/", async (req, res) => {
  try {
    const docs = await Document.find({
      $or: [{ owner: req.user._id }, { sharedWith: req.user._id }],
    }).sort({ updatedAt: -1 });

    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔍 Get single document by ID with password check
router.get("/:id", async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: "Document not found" });

    if (
      doc.owner.toString() !== req.user._id.toString() &&
      !doc.sharedWith.includes(req.user._id)
    ) {
      return res.status(403).json({ error: "Not authorized" });
    }

    if (doc.password) {
      const { password } = req.query;
      const valid = await bcrypt.compare(password || "", doc.password);
      if (!valid) return res.status(401).json({ error: "Incorrect password" });
    }

    res.json(doc);
  } catch (err) {
    res.status(400).json({ error: "Invalid document ID" });
  }
});

// ✏️ Update document (only owner)
router.put("/:id", async (req, res) => {
  try {
    const { title, content, password } = req.body;

    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: "Document not found" });

    if (doc.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Not authorized" });
    }

    doc.title = title;
    doc.content = content;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      doc.password = await bcrypt.hash(password, salt);
    }

    await doc.save();
    res.json(doc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🗑️ Delete document (only owner)
router.delete("/:id", async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: "Document not found" });

    if (doc.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Not authorized" });
    }

    await doc.deleteOne();
    res.json({ message: "Document deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🆕 Share document with another user
router.post("/:id/share", async (req, res) => {
  try {
    const { userIdToShare } = req.body;
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: "Document not found" });

    if (doc.owner.toString() !== req.user._id.toString())
      return res.status(403).json({ error: "Not authorized" });

    if (!doc.sharedWith.includes(userIdToShare)) {
      doc.sharedWith.push(userIdToShare);
      await doc.save();
    }

    res.json({ message: "Permission granted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ------------------- S3 Upload & Download -------------------

// 📤 Upload file to S3
router.post("/upload", upload.single("file"), (req, res) => {
  res.json({
    message: "File uploaded successfully!",
    fileUrl: req.file.location, // S3 public URL
  });
});

// 📥 Download file from S3
router.get("/download/:key", (req, res) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: req.params.key,
  };

  s3.getObject(params, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });

    res.attachment(req.params.key);
    res.send(data.Body);
  });
});

module.exports = router;
