/*
    module references 
*/ 
    // user model 
    const userModel = require('../../../models/users/User')
/*
    tool
*/ 
const deleteUnverifiedUser = async() => {
  /**
   *  The first '0' is for seconds.
      The '*' is for minutes, it means run the job every minutes.
      The '*' is for hours, it means run the job every hour.
      The '*' is for days of the month, it means run the job every day.
      The '*' is for months, it means run the job every month.
      The '*' is for days of the week, it means run the job every day of the week.
  */
  try {
    // Get the current time
    const now = Date.now();

    // Find unverified users created more than an hour ago
    const users = await userModel.find({
      isVerified: false,
      createdAt: { $lte: now - 60 * 60 * 1000 }
    });

    // Delete the unverified users
    for (const user of users) {
      await userModel.findOneAndDelete({ _id: user._id });
    }
  } catch (err) {
    console.error(err);
  }
}
/*
    give access to the tool delete unverified user 
*/ 
module.exports = deleteUnverifiedUser;