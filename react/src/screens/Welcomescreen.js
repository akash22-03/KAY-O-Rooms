import React from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css';
AOS.init({
  duration: 2000
});
function Welcomescreen() {
  return (
    <div className='row landing'>
      <div className='col-md-12 text-center'>
        <h2 data-aos='zoom-in' style={{ fontSize: '130px' }}>KAY/O Rooms</h2>
        <Link to='/home'>
          <button className='btn btn-primary landingbtn'>Start Exploring</button>
        </Link>
      </div>
    </div>
  )
}

export default Welcomescreen