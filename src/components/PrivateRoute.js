import React from 'react'
import { Navigate, Route, Router, Routes } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'



function PrivateRoute({ component: Component, ...rest}) {
    const { currentUser } = useAuth();
  return (
    
    
        <Route>
          {/* {...rest}
          render = {
              props => {
                  return 
currentUser ? <Component {...props} /> : <Navigate to='./login'></Navigate>
              }
          } */}

          
    </Route>
    

  )
}

export default PrivateRoute