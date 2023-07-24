const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  firstName: { type: String, required: true, unique: false },
  lastName: { type: String, required: true, unique: false },
  age: { type: Number, required: false },
  login: { type: Boolean, required: false }
},{toJSON: {
  transform(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
},
timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;