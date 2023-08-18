const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, default: "default category description" }
 
});

categorySchema.index({description:1})

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;