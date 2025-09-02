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
   
function decorePriority(value){
   switch(value){
      case "High":
         return  <div className="bg-red-100 text-red-800 text-sm font-roboto rounded-lg flex items-center justify-center px-2 py-1">{value}</div>
      case "Medium":
         return  <div className="bg-yellow-100 text-yellow-800 text-sm font-roboto rounded-lg flex items-center justify-center px-2 py-1">{value}</div>
      case "Low":
         return  <div className="bg-blue-100 text-blue-800 text-sm font-roboto rounded-lg flex items-center justify-center px-2 py-1">{value}</div>


   }
}

function decoreStatus(value){
   switch(value){
      case "To Do":
         return  <div className="bg-blue-100 text-blue-800 text-sm font-roboto rounded-lg flex items-center justify-center px-2 py-1">{value}</div>

      case  "In Progress":
          return <div className="bg-purple-100 text-blue-800 text-sm font-roboto rounded-lg flex items-center justify-center px-2 py-1">{value}</div>
 
      case  "Review":
         return <div className="bg-red-100 text-red-800 text-sm font-roboto rounded-lg flex items-center justify-center px-2 py-1">{value}</div>

      case  "Completed":
          return <div className="bg-green-100 text-green-800 text-sm font-roboto rounded-lg flex items-center justify-center px-2 py-1">{value}</div>

   }
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
             return () =>  {console.log('description ' + value.toString()) (value.toString().substring(0, 10) || " "+ "...")}
        case "assignees":
             return assignedEmployee(value)
        case "status":
               return decoreStatus(value)
        case "priority":
             return decorePriority(value)
             //   case "assignees":
      //        return <Profile imageSrc={value.assignees.profilePicture} styleProp={'h-8 w-8'}/>

        default:
          return <div className="font-roboto text-sm text-gray-500">{value}</div>;
      }
}