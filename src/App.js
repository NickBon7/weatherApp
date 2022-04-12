import axios from "axios";
import { useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const [photo, setPhoto] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=31d13bd6bb69b27eefe106cc897803aa`;
  const urlPlaces = `https://api.unsplash.com/search/photos?query=${location}&client_id=dQ6Qm1WCXKsV12Hfz034F2es5-Jo3ffAHHzYdrWi7zA`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        //console.log(response.data);
      });
      setLocation("");
    }
  };

  const searchImage = (event) => {
    if (event.key === "Enter") {
      axios.get(urlPlaces).then((response) => {
        const url = response.data.results[0].urls.regular;
        setPhoto(url);
      });
    }
  };

  return (
    <div className="main">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={(event) => {
            searchLocation(event);
            searchImage(event);
          }}
          placeholder="Enter Location"
        />
      </div>

      {photo && (
        <article
          style={{
            maxWidth: "500px",
            width: "100%",
            borderRadius: "5px",
            background: "rgba(0, 0, 0, 0.4)",
            margin: "0 auto",
          }}
        >
          <aside>
            <figure className="articleFigure">
              <img alt="unsplash pic" className="articleImg" src={photo} />
            </figure>
          </aside>
          <div>
            <div className="top">
              <div className="location">
                <p>{data.name}</p>
              </div>
              <div className="temp">
                {data.main ? <h1>{data.main.temp.toFixed(1)} ℃</h1> : null}
              </div>
              <div className="desc">
                {data.weather ? (
                  <p>{data.weather[0].description.toUpperCase(1)}</p>
                ) : null}
              </div>
            </div>
          </div>
        </article>
      )}

      <div className="container">
        <div className="bottom">
          <div className="metric">
            <p>Feels Like</p>
            {data.main ? (
              <span> {data.main.feels_like.toFixed(1)} ℃</span>
            ) : null}
          </div>
          <div className="metric">
            <p>Humidity</p>
            {data.main ? <span> {data.main.humidity}% </span> : null}
          </div>
          <div className="metric">
            <p>Speed</p>
            {data.main ? <span> {data.wind.speed} mph</span> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
