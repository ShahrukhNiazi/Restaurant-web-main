import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
  email: String,
  pass: String,
  city: String,
  address: String,
  cntnum: String,
});

export const Restaurant = mongoose.model('Restaurants', restaurantSchema);