export function correctImageSting(tasks){
   
    const tasksWithBase64 = tasks.map(task => {
    if (
        task.createdBy &&
        task.createdBy.profilePicture &&
        task.createdBy.profilePicture.data
    ) {
        const pic = task.createdBy.profilePicture;
        task.createdBy.profilePicture = `data:${pic.contentType};base64,${pic.data.toString('base64')}`;
        console.log('task with base64:', task.createdBy.profilePicture);
    }
    return task;
    });

    return tasksWithBase64
}

// convert profilePicture to base64 string
