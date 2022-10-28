import React from 'react'

const HomeContent = () => {
  return (
        <div>
            <h2>Home Content</h2>
            Hii {localStorage.getItem('PatientName')}.!<br />
            Here
            You can add and
            update patient details.
        </div>
  )
}

export default HomeContent
