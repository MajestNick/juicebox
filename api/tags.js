const express = require('express');
const tagsRouter = express.Router();

tagsRouter.use((req, res, next) => {
    console.log("A request is being made to /tags");
    next();
  });

  const { getAllTags, getPostsByTagName } = require('../db');



tagsRouter.get('/', async (req, res) => {
    const tags = await getAllTags();
  
    res.send({
      tags
    });
  });

tagsRouter.get('/:tagName/posts', async (req, res, next) => {
    let tagName = req.params.tagName;
    try {
        let posts = getPostsByTagName(tagName).filter((post)=>(post.active || post.author.id === req.user.id));
        res.send({ posts });
    } catch ({ name, message }) {
            next({name, message})
    }
});

  module.exports = tagsRouter;