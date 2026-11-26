const express = require("express");
const { requireAuth } = require("../middleware");

const router = express.Router();

// Sample data stored in a JavaScript array (no database)
let items = [
  {
    id: 1,
    itemName: "Black Wallet",
    category: "Personal",
    location: "University Library",
    status: "Lost",
    date: "2026-11-20",
    description: "Small black wallet"
  },
  {
    id: 2,
    itemName: "Blue Water Bottle",
    category: "Accessories",
    location: "Campus Cafeteria",
    status: "Found",
    date: "2026-11-21",
    description: "Blue metal water bottle"
  },
  {
    id: 3,
    itemName: "Student ID Card",
    category: "Documents",
    location: "Main Gate",
    status: "Found",
    date: "2026-11-22",
    description: "University student card"
  },
  {
    id: 4,
    itemName: "Wireless Earbuds",
    category: "Electronics",
    location: "Computer Lab",
    status: "Lost",
    date: "2026-11-23",
    description: "White wireless earbuds case"
  },
  {
    id: 5,
    itemName: "Black Umbrella",
    category: "Accessories",
    location: "Parking Area",
    status: "Found",
    date: "2026-11-24",
    description: "Foldable black umbrella"
  }
];

// Specific search route must come before /:id
router.get("/search", (req, res) => {
  const keyword = (req.query.q || "").toLowerCase();

  if (!keyword) {
    return res.status(400).json({
      success: false,
      message: "Please provide a search keyword using ?q="
    });
  }

  const results = items.filter((item) =>
    item.itemName.toLowerCase().includes(keyword) ||
    item.location.toLowerCase().includes(keyword) ||
    item.description.toLowerCase().includes(keyword)
  );

  res.status(200).json({ success: true, count: results.length, data: results });
});

// Optional route part: /items/category or /items/category/Personal
router.get("/category{/:name}", (req, res) => {
  const categoryName = req.params.name;

  if (!categoryName) {
    return res.status(200).json({ success: true, data: items });
  }

  const filteredItems = items.filter(
    (item) => item.category.toLowerCase() === categoryName.toLowerCase()
  );

  res.status(200).json({
    success: true,
    count: filteredItems.length,
    data: filteredItems
  });
});

// List all items
router.get("/", (req, res) => {
  res.status(200).json({ success: true, count: items.length, data: items });
});

// Create a new item
router.post("/", (req, res) => {
  const { itemName, category, location, status, date, description } = req.body;

  if (!itemName || !category || !location || !status || !date || !description) {
    return res.status(400).json({
      success: false,
      message: "Please provide itemName, category, location, status, date and description"
    });
  }

  if (!["Lost", "Found", "Returned"].includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Status must be Lost, Found or Returned"
    });
  }

  const newItem = {
    id: items.length ? Math.max(...items.map((item) => item.id)) + 1 : 1,
    itemName,
    category,
    location,
    status,
    date,
    description
  };

  items.push(newItem);
  res.status(201).json({ success: true, message: "Item report created", data: newItem });
});

// Group GET, PUT and DELETE methods for /items/:id
router.route("/:id")
  .get(async (req, res) => {
    const item = items.find((entry) => entry.id === Number(req.params.id));

    if (!item) {
      const error = new Error("Item not found");
      error.status = 404;
      throw error;
    }

    res.status(200).json({ success: true, data: item });
  })
  .put(async (req, res) => {
    const item = items.find((entry) => entry.id === Number(req.params.id));

    if (!item) {
      const error = new Error("Item not found");
      error.status = 404;
      throw error;
    }

    const { itemName, category, location, status, date, description } = req.body;

    if (!itemName || !category || !location || !status || !date || !description) {
      return res.status(400).json({
        success: false,
        message: "Please provide all item fields to update"
      });
    }

    if (!["Lost", "Found", "Returned"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be Lost, Found or Returned"
      });
    }

    item.itemName = itemName;
    item.category = category;
    item.location = location;
    item.status = status;
    item.date = date;
    item.description = description;

    res.status(200).json({ success: true, message: "Item updated", data: item });
  })
  .delete(requireAuth, async (req, res) => {
    const itemIndex = items.findIndex((entry) => entry.id === Number(req.params.id));

    if (itemIndex === -1) {
      const error = new Error("Item not found");
      error.status = 404;
      throw error;
    }

    const deletedItem = items.splice(itemIndex, 1)[0];
    res.status(200).json({ success: true, message: "Item deleted", data: deletedItem });
  });

module.exports = router;