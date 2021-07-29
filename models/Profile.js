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
  social: 
    {
      youtube: {
        type: String
      },
      twitter:{
        type:String
      },
      facebook:{
        type:String
      },
      linkedin:{
        type:String
      },
      instagram:{
        type:String
      },
    },
    date:{
      type:Date,
      default:Date.now
    }
});

module.exports=profile=mongoose.model('profile',ProfileSchema);
