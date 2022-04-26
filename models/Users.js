import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  },
  username: {
    type: String,
    required: true
  },
  passward: {
    type: String,
    required: true
  },
  goodPost: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'File' // fileSchema
  },
  questions: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'FAQ'
  }
});

UserSchema.index({ username: 1 });

export default mongoose.model('User', UserSchema);
