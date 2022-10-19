const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const findTagData = await Tag.findAll();
    res.status(200).json(findTagData);
  } catch {
    res.status.apply(200).json();
  }
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagDataFindById = await Tag.findByPk(req.params.id, {
      include: [{}],
    });
    if (!tagDataFindById) {
      res
        .status(404)
        .json({ message: "Tag by ID you provided does not exist!" });
      return;
    }
    res.status(200).json(tagDataFindById);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new tag
  try {
    const createTagData = await Tag.create(req.body);
    res.status(200).json(createTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a tag by its `id` value
  try {
    const updateTagData = await Tag.update(
      {
        tag_name: req.body.tag_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!updateTagData) {
      res.status(404).json({ message: "Cannot find Tag with this ID" });
    }
    res.status(200).json(updateTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteTagData) {
      res
        .status(404)
        .json({ message: "No tag with this ID was found to delete" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
