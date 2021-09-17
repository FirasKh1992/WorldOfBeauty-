const express = require('express');
const router = express.Router();

const {cloudinary} = require('../../utils/cloudinary')

const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');

const { validationResult, check } = require('express-validator');
//@route  GET api/profile/me
//@desc   get current user profile
//@aceess Private
router.get('/me', auth, async (req, res) => {
  try {
    
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar']
    );
    console.log('api is working')
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
      base64EncodedImage,
    } = req.body;
    
 
    const profileFeilds = {};
    profileFeilds.user = req.user.id;
    if (business) profileFeilds.business = business;
    if (website) profileFeilds.website = website;
    if (location) profileFeilds.location = location;
    if (bio) profileFeilds.bio = bio;
    if (status) profileFeilds.status = status;
    if (!Array.isArray(therapies)) {
      profileFeilds.therapies = therapies
        .split(',')
        .map(therapy => therapy.trim());
    }
    profileFeilds.social = {};
    if (youtube) profileFeilds.social.youtube = youtube;
    if (facebook) profileFeilds.social.facebook = facebook;
    if (twitter) profileFeilds.social.twitter = twitter;
    if (instagram) profileFeilds.social.instagram = instagram;

    try {
      if(base64EncodedImage){
      
      const uploadedResponce = await cloudinary.uploader.upload(base64EncodedImage,{upload_preset:'world_of_beauty'});
     
      const user = await User.findById(req.user.id).select("-password");
      console.log(uploadedResponce.url)
      user.avatar=uploadedResponce.url;
      await user.save();
    }
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
    // //remove user
    // await User.findOneAndDelete({ _id: req.user.id });
    res.json('user removed');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


router.delete('/appointment/:appointment_id/:client_id', auth, async (req, res) => {

  try {
   
    const profile = await Profile.findOne({ user: req.params.client_id });
    const removeIndex = profile.bookedAppointments
      .map(item => item.appointmentId)
      .indexOf(req.params.appointment_id);
   
    profile.bookedAppointments.splice(removeIndex, 1);

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(`Server error ${err.message}`);
  }
});

//@route POST api/profile/appointments
//@desc add profile appointments
//@access  private
router.put(
  '/appointments',
  [
    auth,

    [
      [
        check('appointments.*.startTime', 'Starting time  is required')
          .not()
          .isEmpty(),
        check('appointments.*.endTime', 'End time date is required')
          .not()
          .isEmpty(),
        check('appointments.*.day', 'day is required').not().isEmpty(),
      ],
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const appointments = [...req.body];
    try {
      const profile = await Profile.findOne({ user: req.user.id })
      profile.appointments = [...appointments];
      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);



//@route POST api/profile/appointments/:appointment_id
//@desc remove  booked appointment
//@access  private
router.delete('/appointments/:appointment_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const removeIndex = profile.bookedAppointments
      .map(item => item.id)
      .indexOf(req.params.appointment_id);
    const BookedAppointmentId =
      profile.bookedAppointments[removeIndex].appointmentId;
    const therapistId = profile.bookedAppointments[removeIndex].therapistId;
    profile.bookedAppointments.splice(removeIndex, 1);

    const therapistProfile = await Profile.findOne({ user: therapistId });
    therapistProfile.appointments.map(appointment => {
      if (appointment._id.toString() === BookedAppointmentId.toString()) {
        appointment.status = 'false';
        appointment.client = null;
      }
    });

    await therapistProfile.save();
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(`Server error ${err.message}`);
  }
});


//@route delete api/profile/appointments/:client_id
//@desc remove   booked appointments by the therapist.
//@access  private




//@route Post api/profile/appointment
//@desc update  appointment
//@access  private
router.put(
  '/appointments/:therapist_id/:appointment_id',

  [auth, [check('status', 'status is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { status } = req.body;
    try {
      let profile = await Profile.findOne({
        user: req.params.therapist_id,
      }).populate('user', ['name', 'avatar']);
      const currentAppointment = profile.appointments
        .filter(
          appointment =>
            appointment._id.toString() === req.params.appointment_id.toString()
        )
        .find(app => app);
      //in case the client want to book new appointment;
      if (status.toString() === 'true') {
        // check if the appointment is already taken.
        if (
          currentAppointment.status &&
          currentAppointment.client &&
          currentAppointment.client.toString() !== req.user.id
        ) {
          return res.status(400).json({
            msg: `the appointment is already taken`,
          });
        }

        //
        if (
          currentAppointment.status &&
          currentAppointment.client &&
          currentAppointment.client.toString() === req.user.id
        ) {
          return res.status(400).json({
            msg: `you have already book this appointment`,
          });
        }

        //client can have only 1 appointment for each treatments type
        if (
          profile.appointments.filter(
            appointment =>
              appointment.status &&
              appointment.client &&
              appointment.client.toString() === req.user.id
          ).length > 0
        ) {
          return res.status(400).json({
            msg: `you already have an appointment for this type of treatment`,
          });
        }

        currentAppointment.client = req.user.id;
        currentAppointment.status = status;

        // in case the client want to unbook an appointment
      } else {
        if (
          currentAppointment.client &&
          currentAppointment.client.toString() === req.user.id
        ) {
          currentAppointment.client = null;
          currentAppointment.status = status;
        }

        if (
          currentAppointment.client &&
          currentAppointment.client.toString() !== req.user.id
        ) {
          return res.status(400).json({
            msg: `You did not book this appointment`,
          });
        }
      }

      profile.appointments.map(appointment => {
        if (appointment._id.toString() === req.params.appointment_id) {
          appointment = Object.assign(appointment, currentAppointment);
        }
      });
     
      const bookedAppointment = {
        appointmentId: currentAppointment._id,
        location: currentAppointment.location,
        from: currentAppointment.startTime,
        to: currentAppointment.endTime,
        day: currentAppointment.day,
        saloonName: profile.business,
        therapist: profile.user.name,
        therapistId: req.params.therapist_id,
      };

      let ClientProfile = await Profile.findOne({
        user: req.user.id,
      }).populate('user', ['name', 'avatar']);

      await profile.save();
      
      ClientProfile.bookedAppointments.push(bookedAppointment);
      await ClientProfile.save();

    
  
      res.json(ClientProfile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send(`Server Error ${err.message}`);
    }
  }
);

module.exports = router;
