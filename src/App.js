import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import weatherApi from "./api/weatherApi";

const ApiKey = "524e9de6737ada2636ee3b738d34716f";
const API = "api.openweathermap.org/data/2.5/weather?q=London";

class App extends Component {
  
  state = {
    city: undefined,
    country: undefined,
    temp: undefined,
    icon: undefined,
    description: undefined,
    error: undefined
  };

  handleChange = e => {
    this.setState({ city: e.target.value });
  };
  handleSubmit = async e => {
    e.preventDefault();
    const city = this.state.city;
    if (city) {
      try {
        const apiCall = await fetch(weatherApi(city));
        const data = await apiCall.json();
        console.log(data);
        this.setState({
          city: data.name,
          country: data.sys.country,
          temp: data.main.temp,
          icon: data.weather[0].icon,
          description: data.weather[0].description,
          error: false
        });
      } catch (err) {
        console.log("something went wrong");
        console.log(err);
        this.setState({
          city: undefined,
          country: undefined,
          temp: undefined,
          icon: undefined,
          description: undefined,
          error: true
        });
      }
    }
  };

  render() {
    const weatherIcon = `http://openweathermap.org/img/wn/${this.state.icon}@2x.png`;
    const { error, icon, temp, description } = this.state;
    return (
      <div style={{ width: "300px", margin: "0 auto" }}>
        <form onSubmit={this.handleSubmit} className="align-middle">
          <div className="form-group">
            <label style={{ fontSize: "100px", fontWeight: "bold", margin: "0 auto", fontFamily: "Courier New" }} htmlFor="city">
              City
            </label>
            <input onChange={this.handleChange} type="text" className="form-control mt-2 mb-2" id="city" placeholder="enter city" />
            <input type="submit" className="btn btn-info" value="Get Weather" />
          </div>
        </form>

        {error && <p>Such City Or Country Not Found</p>}
        {icon && <img alt="icon" src={weatherIcon} />}
        {temp && <h1>{temp}°</h1>}
        {description && <p>{description}</p>}
      </div>
    );
  }
}

export default App;
