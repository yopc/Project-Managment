import React, { createContext, useReducer } from 'react'

function toggleReducer(state , action){
    if(action.type === 'toggle'){
       return { toggle:!state.toggle}
    }

}
export const ToggleContext = createContext();
const Context = ({children}) => {
  const [state , dispatch] =  useReducer(toggleReducer , {toggle:true})

  function toggler(){
   dispatch({type:'toggle'})
  }
  
  return (
   <ToggleContext.Provider value={{...state , toggler}}>
      {children}
   </ToggleContext.Provider>
  )
}

export default Context