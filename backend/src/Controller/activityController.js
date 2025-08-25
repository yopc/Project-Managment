import ActivityLog from "../model/activity.js";


export async function getActivityOfCurrentUser(req, res) {
  try {
    const activities = await ActivityLog.find({ user: req.user._id })
      .populate('user', 'fullName profilePicture')
      .sort({ createdAt: -1 }); // latest first (optional)

    res.json(activities);
  } catch (error) {
    console.error('Error while fetching activity:', error);
    res.status(500).json({ message: 'Failed to fetch activities' });
  }
}
