import React from 'react'
import { Button } from '@material-ui/core'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()
  const gohome = () => {
    navigate('/')
  }
  return (
        <div>
            <center>
                <h1>404 - Page Not Found!</h1>
                <Button onClick={gohome}> Goto Home</Button>
            </center></div>)
}

export default NotFound
