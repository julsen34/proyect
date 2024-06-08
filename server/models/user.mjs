// user.mjs

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  nombre: String,
  email: { type: String, unique: true },
  password: String,
});

const User = mongoose.model('User', userSchema);

export default User;