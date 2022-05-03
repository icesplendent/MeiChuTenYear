// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';
import model from '../models';
import logger from '../libs/logger';

const userService = {
  async create(params) {
    // TODO: add hashPassword
    try {
      const result = await model.Users.create(params);
      logger.info('[User Service] Create user successfully');
      return result;
    } catch (error) {
      logger.error('[User Service] Failed to create user to database:', error);
      throw new Error(`Failed to create user database, ${error}`);
    }
  },
  async findOne(filter) {
    // TODO: add hashPassword
    try {
      const result = await model.Users.findOne(filter).lean();
      logger.info('[User Service] Find user successfully');
      return result;
    } catch (error) {
      logger.error('[User Service]', error);
      throw new Error(`Failed to find users in database, ${error}`);
    }
  },
  async findAll(params) {
    const {
      filter, limit, skip, sort = { order: -1 }
    } = params;

    try {
      const total = await model.Users.countDocuments(filter).lean();
      const data = await model.Users.find(filter, null, { limit, skip, sort }).lean;
      logger.info('[User Service] Find users successfully');
      return { total, data };
    } catch (error) {
      logger.error('[User Service]', error);
      throw new Error(`Failed to find users in database, ${error}`);
    }
  }
};

export default userService;
