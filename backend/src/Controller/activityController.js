import ActivityLog from "../model/activity.js";


export async function getActivityOfCurrentUser(req, res) {
  try {
    const activities = await ActivityLog.find({ user: req.user._id })
      .populate('user', 'fullName profilePicture')
      .populate('resource', 'title')
      .sort({ createdAt: -1 }); // latest first (optional)

    res.json(activities);
  } catch (error) {
    console.error('Error while fetching activity:', error);
    res.status(500).json({ message: 'Failed to fetch activities' });
  }
}

export async function getActivityByProject(req, res){
  console.log('inside get activity by project method')
  try {
    const activities = await ActivityLog.find()
    .populate(({
      path:"parentProject" ,
      match:{members:req.user._id},
      select:'title'
    }))
    .populate("resource","title")
    .populate("user","fullName profilePicture")
    .sort({createdAt:-1})
    .lean()

    res.status(200).json(activities);
  } catch (error) {
    console.log('error while fetching activity' + error);
    
  }
}


export async function getActivityByProjectWithUnreadCount(req, res) {
  console.log("inside get activity by project method");
  try {
    const userId = req.user._id;

    const activities = await ActivityLog.find()
      .populate({
        path: "parentProject",
        match: { "members.user": userId }, // only projects where user is member
        select: "title",
      })
      .populate("resource", "title")
      .populate("user", "fullName profilePicture")
      .sort({ createdAt: -1 })
      .lean(); // convert Mongoose docs to plain objects

    // Filter out activities where parentProject is null (not member)
    const filtered = activities.filter((a) => a.parentProject);

    // Mark unread for this user
    const formatted = filtered.map((a) => ({
      ...a,
      isUnread: !a.readBy?.some((uid) => uid.toString() === userId.toString()),
    }));

    // Group by projectId
    const groupedByProject = formatted.reduce((acc, a) => {
      const pid = a.parentProject._id.toString();
      if (!acc[pid]) acc[pid] = [];
      acc[pid].push(a);
      return acc;
    }, {});

    // Calculate unread counts per project
    const unreadCount = formatted.reduce((acc, a) => {
      const pid = a.parentProject._id.toString();
      if (!acc[pid]) acc[pid] = 0;
      if (a.isUnread) acc[pid] += 1;
      return acc;
    }, {});

    res.status(200).json({ activities: groupedByProject, unreadCount });
  } catch (error) {
    console.log("error while fetching activity: " + error);
    res.status(500).json({ message: "Server error" });
  }
}    


export async function getActivityByProjectId(req, res) {
  try {
    const userId = req.user._id;
    const { projectId } = req.params; // assuming you pass it in the route

    if (!projectId) {
      return res.status(400).json({ message: "Project ID is required" });
    }

    // Fetch activities only for the specific project
    const activities = await ActivityLog.find({ parentProject: projectId })
      .populate({
        path: "parentProject", 
        select: "title members",
      })
      .populate("resource", "title")
      .populate("user", "fullName profilePicture")
      .sort({ createdAt: -1 })
      .lean();

    // Check if user is member of this project
    const userIsMember = activities.some(a =>
      a.parentProject?.members?.some(m => m.user.toString() === userId.toString())
    );

    if (!userIsMember) {
      return res.status(403).json({ message: "You are not a member of this project" });
    }

    // Mark unread for this user
    const formatted = activities.map((a) => ({
      ...a,
      isUnread: !a.readBy?.some((uid) => uid.toString() === userId.toString()),
    }));

    // Optionally calculate unread count for this project
    const unreadCount = formatted.reduce((acc, a) => {
      if (a.isUnread) acc += 1;
      return acc;
    }, 0);

    res.status(200).json({ activities: formatted, unreadCount });
  } catch (error) {
    console.log("Error fetching project activities:", error);
    res.status(500).json({ message: "Server error" });
  }
}



// Mark ALL activities in a project as read for the current user
export const markProjectActivitiesAsRead = async (req, res) => {
  console.log('mark project activity MARK')
  try {
    const { projectId } = req.params; // projectId from URL
    const userId = req.user._id; // assuming auth middleware sets req.user

    if (!projectId) {
      return res.status(400).json({ message: "Project ID is required" });
    }

    // Update all activities of this project where userId is not in readBy
    const result = await ActivityLog.updateMany(
      { parentProject: projectId, readBy: { $ne: userId } },
      { $push: { readBy: userId } }
    );

    return res.json({
      message: "All activities in project marked as read",
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error("Error marking project activities as read:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

