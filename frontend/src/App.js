import { useState } from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';
import RoomIcon from '@material-ui/icons/Room';

function App() {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 4,
  });

  return (
    <div className="App">
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      mapStyle="mapbox://styles/saadtajwar/ckr04nc2i1bk818pjzngwjqpw"
    >
      <Marker latitude={35.78} longitude={-80.79} offsetLeft={-20} offsetTop={-10}>
        <RoomIcon style={{fontSize:viewport.zoom * 7, color:"slateblue"}}/>
      </Marker>
    </ReactMapGL>
    </div>
  );
}

export default App;
