const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');


const {validationResult,check} = require('express-validator');
//@route  GET api/profile/me
//@desc   get current user profile
//@aceess Private
router.get('/me', auth, async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id }).populate(
        'user',
        ['name','avatar']
      );
  
      if (!profile) {
        return res.status(400).send('there is no profile for this user');
      }
  
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });
  



//@route GET api/profile/user/:user_id
//@desc get profile by user_id
//@access  public
router.get('/user/:user_id', async (req, res) => {
    try {
      const profile = await Profile.findOne({
        user: req.params.user_id,
      }).populate('user', ['name', 'avatar']);
      if (!profile) {
        return res.status(400).send('Profile not found');
      }
      res.json(profile);
    } catch (err) {
      if (err.kind == 'ObjectId') {
        //in case of passing anon valid object id its not an error on the server
        return res.status(400).send('Profile not found');
      }
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });


  // @route    POST api/profile
// @desc     Create or update user profile
// @access   Private

router.post(
  '/',
  [
    auth,
    [
      check('status', 'status is required').not().isEmpty(),
      check('therapies', 'therapies is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      business,
      website,
      location,
      bio,
      status,
      therapies,
      youtube,
      facebook,
      twitter,
      instagram,
    } = req.body;

    const profileFeilds = {};
    profileFeilds.user = req.user.id;
    if (business) profileFeilds.business = business;
    if (website) profileFeilds.website = website;
    if (location) profileFeilds.location = location;
    if (bio) profileFeilds.bio = bio;
    if (status) profileFeilds.status = status;
    if (!Array.isArray(therapies)) {
      profileFeilds.therapies = therapies.split(',').map(therapy => therapy.trim());
    }
    profileFeilds.social = {};
    if (youtube) profileFeilds.social.youtube = youtube;
    if (facebook) profileFeilds.social.facebook = facebook;
    if (twitter) profileFeilds.social.twitter = twitter;
    if (instagram) profileFeilds.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        //update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFeilds },
          { new: true }
        );
        return res.json(profile);
      }
      //create
      profile = new Profile(profileFeilds);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);


//@route GET api/profile/
//@desc get all profiles
//@access  public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    return res.json(profiles);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
});


//@route DELETE api/profile/
//@desc DELETE profile, user & posts
//@access  private
router.delete('/', auth, async (req, res) => {
  try {
    //remove user posts
    await Post.deleteMany({ user: req.user.id });
    //remove profile
    await Profile.findOneAndDelete({ user: req.user.id });
    //remove user
    await User.findOneAndDelete({ _id: req.user.id });
    res.json('user removed');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});



module.exports = router;