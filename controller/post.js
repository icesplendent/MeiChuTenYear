import logger from '../libs/logger';
import validator from '../libs/validator';
import service from '../service';

const idRule = {
  type: 'multi',
  rules: [
    { type: 'String' },
    { type: 'object' }
  ]
};

const postController = {
  async addPost(req, res) {
    const rule = {
      name: {
        type: 'string',
        allowEmpty: true
      },
      description: {
        type: 'string',
        allowEmpty: false
      },
      short_description: {
        type: 'string',
        allowEmpty: false,
        max: 30
      },
      slide: {
        type: 'string',
        allowEmpty: false
      },
      link: {
        type: 'array',
        items: 'string',
        allowEmtpy: false
      },
      thumbnail_path: {
        type: 'string',
        allowEmpty: false
      }
    };
    try {
      validator.validate(req.body, rule);
      const body = await service.post.create(req.body);
      res.json(body);
    } catch (error) {
      logger.error('[Post Controller] Failed to addPost');
      res.status(400).json({ message: `Failed to addPost, ${error}` });
    }
  },

  async getPost(req, res) {
    const rule = {
      _id: idRule
    };
    try {
      validator.validate(req.body, rule);
      const result = await service.post.findOne(req.body);
      res.json(result);
    } catch (error) {
      logger.error('[Post Controller] Failed to getPost');
      res.status(400).json({ message: `Failed to getPost, ${error}` });
    }
  },

  async getPosts(req, res) {
    const rule = {
      filter: {
        type: 'object',
        optional: true
      },
      projection: {
        type: 'string',
        optional: true
      },
      skip: {
        type: 'number',
        optional: true
      },
      sort: {
        type: 'object',
        optional: true
      },
      limit: {
        type: 'number',
        optional: true
      }
    };

    try {
      validator.validate(req.body, rule);
      const result = await service.post.findAll(req.body);
      res.json(result);
    } catch (error) {
      logger.error('[Post Controler] Failed to getPosts');
      res.status(400).json({ message: `Failed to getPost, ${error}` });
    }
  },

  // async modifyPost();

  // async removePost();

  async removePosts(req, res) {
    const rule = {
      filter: {
        type: 'object',
        optional: true
      }
    };
    try {
      validator.validate(req.body, rule);
      const result = await service.post.deleteAll(req.body);
      res.json(result);
    } catch (error) {
      logger.error('[Post Service] Failed to removePosts');
      res.status(400).json({ message: `Failed to removePosts, ${error}` });
    }
  }

};

export default postController;
