import ActivityLog from "../model/activity.js";


const recordActivity = async (
  projectId,
  userId,
  action,
  resourceType,
  resourceId,
  details
) => {
  try {
  const  activity =  await ActivityLog.create({
      parentProject:projectId,
      user: userId,
      action,
      resourceType,
      resourceId,
      details,
    });

   return activity
  } catch (error) {
    console.log(error);
  }
};

export { recordActivity };
