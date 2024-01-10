import React, { useEffect, useState } from "react";
// import useAuth from "../Hooks/auth/useAuth";
import useLogout from "../Hooks/useLogout";
import axios from "axios";
import { Link } from "react-router-dom";

const NESTBOT_URL = "https://fje34rdpdc.ap-southeast-1.awsapprunner.com"
//const NESTBOT_URL = "https://nestbotserver.onrender.com"
// const NESTBOT_URL = "http://localhost:8081"

export default function Dashboard() {
  // const { auth } = useAuth()
  const Logout = useLogout()
  const [botToken, setBotToken] = useState('')
  const [botMessage, setBotMessage] = useState('')
  const [allUsers, setAllUsers] = useState();
  const [del, setDel] = useState(false)
  const [isFetching, setIsFetching] = useState(false);
  const [lat, setLat] = useState("28.6519")
  const [lng, setLng] = useState("77.2187")
  const [location, setLocation] = useState("Delhi, India")
  const [wdata, setWdata] = useState()
  const [cerr, setCerr] = useState()

  useEffect(() => {
    const getUsers = async () => {
      setIsFetching(true)

      await axios.get(`${NESTBOT_URL}/api/user/getAllUsers`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })

        .then((response) => {
           console.log(response)
          setAllUsers(response.data.users);
          setIsFetching(false)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    getUsers();
  }, [del])

  useEffect(() => {
    const getCoordinates = async () => {
      // const query = `${city}, ${state}, ${country}`;
      const query = location;
      const geoURL = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`;

      try {
        const response = await fetch(geoURL);
        const geoData = await response.json();

        if (geoData.length > 0) {
          const { lat, lon } = geoData[0];
          setLat(lat);
          setLng(lon);
          // console.log({ latitude: lat, longitude: lon });
          setCerr()
        } else {
          setCerr('Enter correct city or state or country name separated by a comma')
          throw new Error('Coordinates not found for the given location');
        }
      } catch (error) {
        console.error('Error fetching coordinates:', error);
        throw error;
      }
    }
    getCoordinates();
  }, [location])

  useEffect(() => {
    const getWeatherData = async () => {
      const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=temperature_2m,relative_humidity_2m,precipitation&timezone=auto&forecast_days=1`;

      try {
        const response = await fetch(weatherURL);
        const weatherData = await response.json();
        setWdata(weatherData);
        // console.log(weatherData);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
      }
    }

    getWeatherData()
  }, [lat, lng])

  const AddToken = async () => {
    const data = {
      token: botToken
    }
    // console.log(data)
    await axios.post(`${NESTBOT_URL}/api/bot/token`, JSON.stringify(data),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((response) => {
        alert("Successfully added bot token")
        // console.log(response)
      })
      .catch((err) => {
        console.log(err)
      })
  };

  const SendMsg = async () => {
    const data = {
      msg: botMessage
    }
    // console.log(data)
    await axios.post(`${NESTBOT_URL}/api/bot/message`, JSON.stringify(data),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((response) => {
        alert('Message Sent Successfully')
        // console.log(response)
      })
      .catch((err) => {
        console.log(err)
      })
  };

  const deleteUser = async (userid) => {
    const data = {
      id: userid
    }
    // console.log(data)
    await axios.post(`${NESTBOT_URL}/api/user/deleteUser`, JSON.stringify(data),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((response) => {
        alert("Successfully Deleted user from database")
        setDel(!del)
        // console.log(response)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const blockuser = async (userid, blocked) => {
    const data = {
      id: userid,
      blocked: blocked
    }
    // console.log(data)
    await axios.post(`${NESTBOT_URL}/api/user/blockUser`, JSON.stringify(data),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((response) => {
        setDel(!del)
        // console.log(response)
      })
      .catch((err) => {
        console.log(err)
      })
  }


  // const fetchData = async () => {
  //   try {
  //     const data = await getWeatherData('Mumbai');
  //     console.log(data); // Display the weather data for Mumbai
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const messageTemplate =
    `
   Today's Weather Update :

   Location : ${location}

   Hourly Temperature : ${wdata?.hourly?.temperature_2m}°C

   Relative humidity : ${wdata?.hourly?.relative_humidity_2m}

   Precipitation : ${wdata?.hourly?.precipitation

    }
   `
  // console.log(messageTemplate)

  const SendWdata = async () => {
    const data = {
      msg: messageTemplate
    }
    // console.log(data)
    await axios.post(`${NESTBOT_URL}/api/bot/message`, JSON.stringify(data),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((response) => {
        alert('Message Sent Successfully')
        // console.log(response)
      })
      .catch((err) => {
        console.log(err)
      })
  };

  return (
    <div className="row" style={{ height: "100vh" }}>

      <div className="d-none d-sm-block col-2" style={{ backgroundColor: "blueviolet" }}>
        <div className="row justify-content-center align-items-center ml-1" style={{ color: 'white'}}>
          <h3 className="py-5">Daily <br/>Weather Updates</h3>
        </div>
        <hr/>

      </div>

      <div className="col-9">
        <div className="container">
          <div className="row justify-content-between align-items-center my-3" >

            <div className="col-5" >
              <h3><Link to='/dashboard' style={{ textDecoration: 'none',  color: "black" }}>Telegram Bot Admin Panel</Link></h3>
            </div>
            <div className="col-2">
              <button className="btn btn-success btn-sm">
                <span
                  type="button"
                  onClick={Logout}
                  style={{ textDecoration: 'none' }}
                >
                  Sign Out
                </span>
              </button>
            </div>
          </div>
          <hr/>          
          {isFetching ? "Wait.. , Fetching server data " : (<div className="row justify-content-between" style={{ paddingLeft: "10px" }}>
            <div className="col-10">
              <br />
              
              <div className="form-group d-flex" style={{ marginLeft: '30px' }}>
                <span> 1) - Update existing Bot Token</span>
              </div>
              <br/>
              <div className="form-group d-flex" style={{ marginLeft: '30px' }}>
                <div>
                  <input
                    type="text"
                    style={{ border: '1px solid black', width: '300px' }}
                    className="form-control"
                    value={botToken}
                    onChange={(e) => setBotToken(e.target.value)}
                    id="bot-token"
                  />
                </div>
                <div>
                  <button className="btn btn-primary" style={{ marginLeft: "30px" }} onClick={AddToken}>Update Token</button>
                </div>
              </div>

              <br />
              
              <div className="form-group d-flex" style={{ marginLeft: '30px' }}>
                <span> 2) - Send Custom messsages to Telegram Bot subscribers</span>
              </div>
              <br/>
              <div className="form-group" style={{ marginLeft: '30px' }}>
                <div className=" d-flex">
<div>
                  <textarea

                    rows={3}
                    style={{ border: '1px solid black', width: '300px' }}
                    className="form-control"
                    value={botMessage}
                    onChange={(e) => setBotMessage(e.target.value)}
                    id="message"
                  />
</div>
                  <div className="d-flex align-items-center">
                    <button className="btn btn-success" style={{ marginLeft: "30px" }} onClick={SendMsg}>Send Message</button>
                  </div>
                </div>
              </div>
              <div className="form-group mt-3" style={{ marginLeft: '30px' }}>
                <div className="d-flex">
                  <div >
                    <span style={{ marginBottom: "20px" }}> 3) - Send Daily Weather Updates to subscribers by entering city, state or country</span>

                    <div className="d-flex">
                      <input
                        type="text"
                        style={{ border: '1px solid black',fontSize:'14px', width: '300px' }}
                        className="form-control mt-3"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Noida, India "
                        id="loc"
                      />
                      <div>
                        <button className="btn btn-primary mt-3" style={{ marginLeft: "30px" }} onClick={SendWdata}>Send Update</button>
                      </div>
                    </div>
                    <span style={{ fontSize: "13px", color: "red" }}>{(cerr !== undefined && cerr !== null) && cerr} </span>
                    <br />
                  </div>

                </div>

              </div>


              <br />
            </div>
            <hr/>
            <div className="d-flex justify-content-between">
              <div>
            <h4 style={{float:"left"}}>User Accounts Manager</h4><br />
            <p style={{float:"left",fontSize:"14px"}} className="mb-3 mt-1"
            >(Delete users from Database OR Block users from getting updates)</p><br />
            </div>
             </div>
            <div className="card">

              <div className="card-body d-flex" >
                <h5 style={{ marginRight: "20px",
                //textDecoration:"underline" 
                }}>S.no</h5>
                <h5 style={{
                  //textDecoration:"underline"
              }}>User ID</h5>
              </div>
              <div  style={{ overflow: 'scroll', height: "300px" }}>
              {
                allUsers?.map((user, idx) => {
                  return (
                    <div className="card-body d-flex mb-1 pt-4 mx-2" key={idx} style={{border:"1px solid grey",borderRadius:"5px"}}>
                      <h6 style={{ marginRight: "20px" }}>{idx + 1} ) - </h6>
                      <h6 style={{ marginRight: "30px"}}>
                        {/* <span className="py-3 px-2" style={{border:"1px solid black",borderRadius:'10px' }}> */}
                          {user?.chatId}
                          {/* </span> */}
                          </h6>
                      <div>
                        <button className="btn btn-sm btn-danger" style={{ marginRight: "30px" }} onClick={() => { deleteUser(user?.chatId) }}>
                          Delete User
                        </button>
                      </div>
                      <div>
                        <button className="btn btn-sm btn-success" style={{ marginRight: "30px" }} onClick={() => { blockuser(user?.chatId, user?.blocked) }}>
                          {user?.blocked ? `Unblock User` : `Block User`}
                        </button>
                      </div>
                      <div>
                        <span>{user?.blocked && `Blocked from receiving updates`}</span>
                      </div>
                    </div>
                  )
                })
              }
              </div>
            </div>

          </div>)}
        </div>
      </div>

    </div>
  )
}
