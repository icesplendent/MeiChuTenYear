import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  short_description: {
    type: String,
    required: true
  },
  slide: {
    type: String,
    required: true
  },
  link: [{
    type: String,
    required: true
  }],
  thumbnail_path: {
    type: String,
    requied: false
    // default: zxcfv
  }
  // TODO: team_id
});

export default mongoose.model('Post', PostSchema);
