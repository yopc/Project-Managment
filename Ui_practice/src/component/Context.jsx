import React, { createContext, useReducer } from 'react'

function toggleReducer(state , action){
    if(action.type === 'toggle'){
       return { toggle:!state.toggle}
    }

}
const initialToggle = typeof window !== 'undefined' ? window.innerWidth >= 768 : true;

export const ToggleContext = createContext();
const Context = ({children}) => {
  const [state , dispatch] =  useReducer(toggleReducer , {toggle: initialToggle})

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