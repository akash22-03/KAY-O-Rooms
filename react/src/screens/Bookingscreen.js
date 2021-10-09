import React, { useState, useEffect } from 'react'
import axios from "axios"
import Loader from "../components/Loader"
import Error from '../components/Error';
import moment from 'moment'
import StripeCheckout from "react-stripe-checkout"
import Swal from 'sweetalert2'
import AOS from 'aos'
import 'aos/dist/aos.css';
AOS.init({
  duration: 1000
});

function Bookingscreen({ match }) {
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  const [room, setroom] = useState();

  const roomid = match.params.roomid
  const fromdate = moment(match.params.fromdate, 'DD-MM-YYYY')
  const todate = moment(match.params.todate, 'DD-MM-YYYY')

  const totaldays = moment.duration(todate.diff(fromdate)).asDays() + 1
  const [totalamount, settotalamount] = useState()

  useEffect(async () => {
    if (!localStorage.getItem('currentUser')) {
      window.location.reload = '/login'
    }
    try {
      setloading(true);
      const data = (await axios.post("/api/rooms/getroombyid", { roomid: match.params.roomid })).data;
      console.log(data)
      settotalamount(data.rentperday * totaldays)
      setroom(data);
      setloading(false);
    }
    catch (error) {
      seterror(true);
      setloading(false);
    }
  }, [])


  async function onToken(token) {
    console.log(token)
    const bookingDetails = {
      room,
      userid: JSON.parse(localStorage.getItem('currentUser'))._id,
      fromdate,
      todate,
      totalamount,
      totaldays,
      token
    }
    try {
      setloading(true)
      const result = await axios.post('/api/bookings/bookroom', bookingDetails)
      setloading(false)
      Swal.fire('Congratulations', 'Your Room Booked Successfully', 'success').then(result => {
        window.location.href = '/bookings'
      })
    } catch (error) {
      setloading(false)
      Swal.fire('Sorry', 'Something went wrong', 'error')
    }
  }

  return (
    <div className='m-5' data-aos='zoom-in'>
      {loading ? (<h1><Loader /></h1>) : room ? (<div>
        <div className="row justify-content-center mt-5 bs">
          <div className="col-md-6">
            <h1>{room.name}</h1>
            <img src={room.imageurls[0]} className='bigimg' />
          </div>
          <div className="col-md-6">
            <div style={{ textAlign: 'right' }}>
              <h1>Booking Details</h1>
              <hr />
              <b>
                <p>Name : {JSON.parse(localStorage.getItem('currentUser')).name}</p>
                <p>From Date : {match.params.fromdate}</p>
                <p>To Date : {match.params.todate}</p>
                <p>Max Count : {room.maxcount}</p>
              </b>
            </div>
            <div style={{ textAlign: 'right' }}>
              <b>
                <h1>Amount</h1>
                <hr />
                <p>Total days : {totaldays}</p>
                <p>Rent per day : {room.rentperday}</p>
                <p>Total Amount : {totalamount}</p>
              </b>
            </div>
            <div style={{ float: 'right' }}>

              <StripeCheckout
                amount={totalamount * 100}
                token={onToken}
                currency='INR'
                stripeKey="pk_test_51JiO8XSCu2WS2E60RSRqTz2FPWsT4UEWGyw1tYe9xFmL8ha37mSdpqTALDTzCx71NAoPgdaWzojTk2q7QYmkebTN00IHhaKv8R"
              ><button className="btn btn-primary">Pay Now</button>
              </StripeCheckout>
            </div>
          </div>
        </div>

      </div>) : (<h1><Error /></h1>)}
    </div>
  )
}

export default Bookingscreen
