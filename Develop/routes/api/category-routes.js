const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryDataById = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!categoryDataById) {
      res.status(404).json({ message: "No category by this Id!" });
    } else {
      res.status(200).json(categoryDataById);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const createCategory = await Category.create(req.body);
    res.status(200).json({
      message: `New category created with Category_Id = ${createCategory.id}`,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryDataById = await Category.findByPk(req.params.id);

    if (categoryDataById) {
      const updateCategory = await Category.update(
        {
          category_name: req.body.category_name,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      res.status(200).json(updateCategory);
    } else {
      res.status(404).json({ message: "No category by this ID!" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteCategory) {
      res.status(404).json({ message: "No Category with this ID!" });
    } else {
      res.status(200).json(deleteCategory);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
