import mongoose from 'mongoose';

const FestivalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for this festival'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description for this festival'],
  },
  startDate: {
    type: Date,
    required: [true, 'Please provide a start date'],
  },
  endDate: {
    type: Date,
    required: [true, 'Please provide an end date'],
  },
  location: {
    type: String,
    required: [true, 'Please specify the location'],
  },
  address: {
    type: String,
    required: [true, 'Please provide an address'],
  },
  imageUrl: {
    type: String,
    required: [true, 'Please provide an image URL'],
  },
  tags: {
    type: [String],
    default: [],
  },
  ticketUrl: {
    type: String,
  },
  contactEmail: {
    type: String,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Festival || mongoose.model('Festival', FestivalSchema);