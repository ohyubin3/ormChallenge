const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryDataById = Category.findByPk({
      include: [{ model: Product }],
    });
    if (!categoryDataById) {
      res.status(404).json({ message: "No product by this Id!" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", (req, res) => {
  // create a new category
  try {
    const createCategory = Category.create(req.body);
    res.status(200).json(createCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!updateCategory) {
      res.status(404).json({ message: "No category by this Id!" });
    }
    res.status(200).json(updateCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
