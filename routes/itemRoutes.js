const express = require('express');
const multer = require('multer');
const path = require('path');
const Item = require('../models/Item');

const router = express.Router();

// Multer config for storing files in /uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// Route to add new item
router.post('/add-item', upload.single('image'), async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const image = req.file ? req.file.filename : null;

    const newItem = new Item({
      name,
      description,
      price,
      image,
    });

    await newItem.save();
    res.status(201).json({ message: 'Item added successfully', item: newItem });

  }  catch (error) {
    console.error('Error saving item:', error); // Log real error here 👈
    res.status(500).json({ error: 'Error saving item' });
  }
});

// Route to get all items
router.get('/items', async (req, res) => {
  try {
    const items = await Item.find();

    const hostUrl = `${req.protocol}://${req.headers.host}`;

    const formattedItems = items.map(item => ({
      _id: item._id,
      name: item.name,
      description: item.description,
      price: item.price,
      image: `${hostUrl}/uploads/${item.image}`,  // ⬅️ Full URL here
      createdAt: item.createdAt,
      updatedAt: item.updatedAt
    }));

    res.json(formattedItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching items' });
  }
});


module.exports = router;
