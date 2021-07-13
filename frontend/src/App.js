import { useState, useEffect } from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import RoomIcon from '@material-ui/icons/Room';
import StarIcon from '@material-ui/icons/Star';
import "./app.css"
import axios from "axios";

function App() {
  const currentUser = "Saad";
  const [pins, setPins] = useState([]);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [rating, setRating] = useState(0);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 4,
  });

  useEffect(()=>{
    const getPins = async ()=> {
      try{
        const res = await axios.get("/pins");
        setPins(res.data);
      } catch(err){
        console.log(err);
      }
    }
    getPins();
  },[])

  const handleMarkerClick = (id, lat, long)=>{
    setCurrentPlaceId(id);
    setViewport({...viewport, latitude:lat, longitude:long});
  }

  const handleAddClick = (e)=>{
    const [long, lat] = e.lngLat;
    setNewPlace({
      lat,
      long,
    })
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const newPin = {
      username:currentUser,
      title,
      desc,
      rating,
      lat:newPlace.lat,
      long:newPlace.long,
    }

    try{
      const res = await axios.post("/pins", newPin)
      setPins([...pins, res.data]);
      setNewPlace(null);
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className="App">
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      mapStyle="mapbox://styles/saadtajwar/ckr04nc2i1bk818pjzngwjqpw"
      onDblClick= {handleAddClick}
    >
      {pins.map(p=>(
        
      <>
      <Marker latitude={p.lat} longitude={p.long} offsetLeft={-20} offsetTop={-10}>
        <RoomIcon style={{fontSize:viewport.zoom * 7, color:"slateblue", cursor:"pointer"}}
        onClick={()=>handleMarkerClick(p._id,p.lat,p.long)}
        />
      </Marker>
      {p._id === currentPlaceId &&
      <Popup
          latitude={35.78}
          longitude={-80.79}
          closeButton={true}
          closeOnClick={false}
          onClose={() => setCurrentPlaceId(null)}
          anchor="left" >
          <div className="card">
            <label>Place</label>
            <h4 className="place">{p.title}</h4>
            <label>Review</label>
            <p className="desc">{p.desc}</p>
            <label>Rating</label>
            <div className="stars">
            <StarIcon className="star"/>
            <StarIcon className="star"/>
            <StarIcon className="star"/>
            <StarIcon className="star"/>
            <StarIcon className="star"/>
            </div>
            <label>Info</label>
            <span className="username">Created by <b>{p.user}</b></span>
            <span className="date">1 hour ago</span>
            </div>
        </Popup>
}
        </>
      ))}
      {newPlace && 
      <Popup
          latitude={newPlace.lat}
          longitude={newPlace.long}
          closeButton={true}
          closeOnClick={false}
          onClose={() => setNewPlace(null)}
          anchor="left" >
            <div>
              <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input placeholder="enter a title" onChange={(e)=>setTitle(e.target.value)}/> 
                <label>Review</label>
                <textarea placeholder="Enter a review" onChange={(e)=>setDesc(e.target.value)}/>
                <label>Rating</label>
                <select onChange={(e)=>setRating(e.target.value)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button className="submitButton" type="submit">Add Pin</button>
              </form>
            </div>
          </Popup>
      }
      <button className="button logout">Log Out</button>
      <div>
      <button className="button login">Log In</button>
      <button className="button register">Register</button>
      </div>
      <Register />
    </ReactMapGL>
    </div>
  );
}

export default App;
