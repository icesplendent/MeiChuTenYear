import logger from '../libs/logger';
import service from '../service';
import validator from '../libs/validator';

const idRule = {
  type: 'multi',
  rules: [
    { type: 'string' },
    { type: 'object' }
  ]
};
const userController = {
  async register(req, res) {
    const rule = {
      isAdmin: {
        type: 'boolean',
        allowEmpty: false
      },
      username: {
        type: 'string',
        allowEmpty: false,
        min: 1
      },
      password: {
        type: 'string',
        allowEmpty: false,
        min: 6
      }
      // goodPost: {
      //   type: 'array',
      //   items: idRule
      // },
      // questions: {
      //   type: 'array',
      //   items: idRule
      // }

    };

    try {
      validator.validate(req.body, rule);
      const body = await service.user.create(req.body);
      res.json(body);
    } catch (error) {
      logger.error('[User Controller] Failed to register:', error);
      res.status(400).json({ message: `Failed to register, ${error}` });
    }
  },
  async getUser(req, res) {
    const rule = {
      _id: idRule
    };
    try {
      validator.validate(req.body, rule);
      const user = await service.user.findOne(req.body);
      res.json(user);
    } catch (error) {
      logger.error('[User Controller] Failed to getUser:', error);
      res.status(400).json({ message: `Failed to getUser, ${error}` });
    }
  },
  async getUsers(req, res) {
    const rule = {
      filter: {
        type: 'object',
        optional: true
      },
      limit: {
        type: 'number',
        optional: true
      },
      skip: {
        type: 'number',
        optional: true
      },
      sort: {
        type: 'object',
        optional: true
      }
    };

    try {
      validator.validate(req.body, rule);
      const user = await service.user.findAll(req.body);
      res.json(user);
    } catch (error) {
      logger.error('[User Controller] Failed to getUsers:', error);
      res.status(400).json({ message: `Failed to getUsers, ${error}` });
    }
  },
  async modifyUser(req, res) {
    const rule = {
      _id: idRule,
      isAdmin: {
        type: 'forbidden'
      },
      username: {
        type: 'forbidden'
      },
      password: {
        type: 'string',
        allowEmpty: false,
        min: 6
      }
    //   goodPost: {
    //     type: 'array',
    //     items: idRule
    //   },
    //   questions: {
    //     type: 'array',
    //     items: idRule
    //   }
    };

    try {
      validator.validate(req.body, rule);
      const user = await service.user.updateOne(req.body);
      res.json(user.n > 0 ? { success: true } : {});
    } catch (error) {
      logger.error('[User Controller] Failed to modifyUser:', error);
      res.status(400).json({ message: `Failed to modifyUser, ${error}` });
    }
  },
  async removeUser(req, res) {
    const rule = {
      _id: idRule
    };

    try {
      validator.validate(req.body, rule);
      const user = await service.user.deleteOne(req.body);
      res.json(user);
    } catch (error) {
      logger.error('[User Controller] Failed to removeUser:', error);
      res.status(400).json({ message: `Failed to removeUser, ${error}` });
    }
  },
  async login(req, res) {
    const rule = {
      username: {
        type: 'string'
      },
      password: {
        type: 'string'
      }
    };
    try {
      validator.validate(req.body, rule);
      const user = await service.user.login(req.body);
      res.json(user);
    } catch (error) {
      logger.error('[User Controller] Failed to login:', error);
      res.status(400).json({ message: `Failed to login, ${error}` });
    }
  },
  async getCurrentUser(req, res) {
    if (req.user) {
      const user = await service.user.findOne({ _id: req.user._id });
      res.json(user);
    } else {
      res.status(400).json({ message: 'Not logged in.' });
    }
  }
};

export default userController;
