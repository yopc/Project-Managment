import { useEffect } from "react";
import Profile from "../../component/Profile";
import ProfileCell from "../ProfileCell";
import { Authenticatioin } from "../Store/AuthenticateUser";
import { ProjectCreator } from "../Store/ProjectCreator";

export const convertToString = (date) => {
    return new Date(date).toLocaleDateString();
}

export const getProfileImageUrl = (profilePicture) => {

  console.log('profile ============||||||||||||||||||' + profilePicture)
  return profilePicture;
};



function assignedEmployee(value){
   return <div className="flex gap-1">{value.map((v) => <Profile imageSrc={v.profilePicture} styleProp={'h-8 min-w-8'}/>)}</div>
}

const AssgineMember = ({id}) => {
   const  {projectDetail , getProjectById} = ProjectCreator();
   //   console.log(projectDetail)
   useEffect(() => {
       getProjectById(id)
   }, [])
   return (
      <div> 
{/*      
     { projectDetail.members.map((m) => (
      <Profile imageSrc={m.profilePicture} />
         <h4>{m.fullName}</h4>
       ))
      } */}
      </div>
   )
}


export  const  validateData = (colName , value) => {
  
    switch (colName) {
        case "createdAt":
           return new Date(value).toLocaleDateString();         
        case "updatedAt":
           return new Date(value).toLocaleDateString();   
        case "createdBy": 
           return <div className="flex gap-1 flex-shrink-0"><Profile imageSrc={value.profilePicture} styleProp={'min-w-8 h-8'}/>  {value.fullName}</div>
        
        case "project":
             return value.title;
        case "submitedFile":
              return "submited file"
        case "description":
             return (value.toString().substring(0, 10) + "...")
        case "assignees":
             return assignedEmployee(value)
        case "status":
             return <div className="bg-blue-100 text-blue-800 text-sm font-roboto rounded-lg flex items-center justify-center px-2 py-1">{value}</div>
      //   case "assignees":
      //        return <Profile imageSrc={value.assignees.profilePicture} styleProp={'h-8 w-8'}/>

        default:
          return <div className="font-roboto text-sm text-gray-500">{value}</div>;
      }
}