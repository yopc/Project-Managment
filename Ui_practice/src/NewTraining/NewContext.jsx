import React, { createContext, useReducer } from 'react'


function toggleReducer(state , action){
    if(action.type === 'toggle'){
        return {toggle:!state.toggle}
    }
}

export const MineContext = createContext();
const NewContext = ({children}) => {
const [state , dispatch] = useReducer(toggleReducer , {toggle:true})

function toggler(){
    dispatch({type:'toggle'})
}
  return (
    <MineContext.Provider value={{...state , toggler}}>
        {children}
    </MineContext.Provider>
  )
}

export default NewContext