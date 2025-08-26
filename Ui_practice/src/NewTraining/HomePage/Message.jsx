import React from 'react'
import { Authenticatioin } from '../Store/AuthenticateUser'
import { useEffect , useState} from 'react';
import Profile from '../../component/Profile.jsx'
import { ProjectCreator } from '../Store/ProjectCreator.jsx';
import { useActivityLog } from '../Store/useActivityLog.jsx';

const Message = () => {

  const {activities , getActivityForCurrentUser} =  useActivityLog();

  useEffect(() => {
    getActivityForCurrentUser();
  }, [])

 

  return (
    <div>

      {
        activities.map((a) => (
          <h1>{a.action}</h1>
        ))
      }
    </div>
  )
}

export default Message