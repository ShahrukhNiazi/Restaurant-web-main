import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
  email: String,
  pass: String,
  city: String,
  address: String,
  cntnum: String,
});

// Check if the model already exists
export const Restaurant = mongoose.models.Restaurants || mongoose.model('Restaurants', restaurantSchema);