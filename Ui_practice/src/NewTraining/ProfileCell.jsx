import React, { useEffect } from "react";
import Profile from "../component/Profile";
import { Authenticatioin } from "./Store/AuthenticateUser";

export default function ProfileCell({ employeeId }) {
  const { employees = {}, getEmployee } = Authenticatioin(); // default to empty object
  const employee = employees[employeeId]; // safe access now

  console.log("ProfileCell rendered with ID:", employeeId);
  getEmployee(employeeId);

  // useEffect(() => {
  //   if (employeeId && !employee) {
  //   }
  // }, [employeeId, employee, getEmployee]);

  if (!employee || !employee.profilePicture) {
    return <span>Loading...</span>;
  }

  const src = `data:${employee.profilePicture.contentType};base64,${employee.profilePicture.data}`;
  return <Profile styleProp="w-8 h-8" imageSrc={src} />;
}
