const mongoose = require('mongoose');
const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
  business: {
    type: String,
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  therapies: {
    type: [String],
    required: true,
  },
  bio: {
    type: String,
  },
  social: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  appointments: [
    {
      client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        default:null
      },
      day:{
        type:String,
        required:true
      },
      startTime: {
        type: String,
        required: true,
      },
      endTime: {
        type: String,
        required: true,
      },
      status: {
        type: Boolean,
        default: false,
      },
      title: {
        type: String,
      },
    },
  ],
  bookedAppointments: [
    {
      appointmentId:{
        type:String,
        required:true
      },
      location: {
        type: String,
      },
      saloonName: {
        type: String,
        required: true,
      },
      therapist: {
        type: String,
      },
      therapistId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
      },
      from: {
        type: String,
        required: true,
      },
      to: {
        type: String,
        required:true

      },
      day:{
        type:String,
        required:true
      }
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = profile = mongoose.model('profile', ProfileSchema);
