import model from '../models';
import logger from '../libs/logger';

const postService = {
  async create(params) {
    try {
      const result = await model.Posts.create(params);
      logger.info('[Post Service] Create Post successfully');
      return result;
    } catch (error) {
      logger.error('[Post Service] Failed to create post to database');
      throw new Error(`Failed to create post database, ${error}`);
    }
  },
  async findOne(filter) {
    try {
      const result = await model.Posts.findOne(filter).lean();
      logger.info('[Post Service] Find a post successfully');
      return result;
    } catch (error) {
      logger.error('[Post Service] Failed to find a post in databse');
      throw new Error(`Failed to find a post in database, ${error}`);
    }
  },
  async findAll(params) {
    try {
      const { filter, projection, limit, skip, sort } = params;
      const total = await model.Posts.countDocuments(filter).lean();
      const data = await model.Posts.find(filter, projection, { limit, skip, sort }).lean();
      logger.info('[Post Service] Find posts successfully');
      return { total, data };
    } catch (error) {
      logger.error('[Post Service] Failed to find posts in database');
      throw new Error(`Failed to find posts in database, ${error}`);
    }
  },
  async deleteAll(filter) {
    try {
      const result = await model.Posts.deleteMany(filter).lean();
      return { deletedCount: result.deletedCount };
    } catch (error) {
      logger.error('[Post Service] Failed to delete posts in database');
      throw new Error(`Failed to find posts in database, ${error}`);
    }
  }
};

export default postService;
