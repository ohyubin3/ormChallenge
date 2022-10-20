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
      include: [{ model: Product }],
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
    res
      .status(200)
      .json({ id: createTagData.id, tag_name: createTagData.tag_name });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a tag by its `id` value
  try {
    let tagDataById = await Tag.findByPk(req.params.id);

    if (tagDataById) {
      let updateTagData = await Tag.update(
        {
          tag_name: req.body.tag_name,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(200).json({ message: "Tag has been updated" });
      // .json(updateTagData);
    } else {
      res.status(404).json({ message: "Cannot find Tag with this ID" });
    }
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
    } else {
      res.status(200).json({ message: "Tag has been deleted" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
