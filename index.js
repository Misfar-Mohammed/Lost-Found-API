const express = require("express");
const itemRoutes = require("./routes/items");
const { logger, notFound, errorHandler } = require("./middleware");

const app = express();
const PORT = 3000;

// Built-in middleware to read JSON request bodies
app.use(express.json());

// Log every incoming request
app.use(logger);

// Welcome route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the Lost & Found Management API",
    student: "Rahumathulla Misfar Mohammed",
    theme: "Lost & Found Management"
  });
});

// Mount the item routes
app.use("/items", itemRoutes);

// Show the requested path for wildcard-route practice
app.get("/files/*path", (req, res) => {
  res.status(200).json({
    message: "Wildcard route example",
    path: req.params.path
  });
});

// Unknown URL handler
app.use(notFound);

// Four-parameter error handler must be last
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Lost & Found API is running at http://localhost:${PORT}`);
});