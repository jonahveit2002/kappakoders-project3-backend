// controllers/userProfile.controller.js

const db = require("../models");
const UserProfile = db.userProfile;
// Get a user's profile by userId
exports.getUserProfile = async (req, res) => {
  const { userId } = req.params;

  try {
    const profile = await UserProfile.findOne({ where: { userId } });

    if (!profile) {
      return res.status(404).json({ message: 'User profile not found' });
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching user profile' });
  }
};

exports.createUserProfile = async (req, res) => {
  const { userId, fName, lName, phoneNum, profilePhoto } = req.body;
  console.log("New Profile");

  try {
    // Check if the profile already exists
    const existingProfile = await UserProfile.findOne({ where: { userId } });
    if (existingProfile) {
      return res.status(400).json({ message: 'User profile already exists' });
    }

    // Create a new profile
    const newProfileData = {
      userId,
      fName,
      lName,
      // Only include phoneNum and photoUrl if they are defined
      ...(phoneNum && { phoneNum }), // Add phoneNum if it exists
      ...(profilePhoto && { profilePhoto }), // Add photoUrl if it exists
    };

    console.log("0000000000000000000000000");
    console.log(newProfileData);
    console.log("0000000000000000000000000");


    const newProfile = await UserProfile.create(newProfileData);

    res.status(201).json(newProfile); // Return the created profile
  } catch (error) {
    console.error("Error creating user profile:", error);
    res.status(500).json({ message: 'Error creating user profile', error: error.message });
  }
};

exports.updateUserProfile = async (req, res) => {
  const { userId } = req.params;
  const { fName, lName, phoneNum, profilePhoto } = req.body;

  try {
    const profile = await UserProfile.findOne({ where: { userId } });

    if (!profile) {
      return res.status(404).json({ message: 'User profile not found' });
    }

    // Update fields
    profile.fName = fName;
    profile.lName = lName;
    profile.phoneNum = phoneNum;
    profile.profilePhoto = profilePhoto;

    await profile.save(); // Save the updated profile

    res.status(200).json(profile); // Return the updated profile
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating user profile' });
  }
};

exports.deleteUserProfile = async (req, res) => {
  const { userId } = req.params;

  try {
    const profile = await UserProfile.findOne({ where: { userId } });

    if (!profile) {
      return res.status(404).json({ message: 'User profile not found' });
    }

    await profile.destroy(); // Delete the profile
    res.status(200).json({ message: 'User profile deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting user profile' });
  }
};