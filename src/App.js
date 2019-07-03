import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { async } from "q";

const ApiKey = "524e9de6737ada2636ee3b738d34716f";
const API = "api.openweathermap.org/data/2.5/weather?q=London";

class App extends Component {
  // componentDidMount() {
  //   console.log("Component Did Mount");
  // }
  // componentWillMount() {
  //   console.log("Component Will Mount");
  // }
  // componentWillUpdate(nextProps, nextState) {
  //   console.log("Component Will Update", nextProps, nextState);
  // }
  // updateMount = () => {
  //   this.setState({ name: "temo" });
  // };
  // constructor() {
  //   super();
  //   console.log("Constructor");
  // }
  state = {
    city: undefined,
    country: undefined,
    temp: undefined,
    icon: undefined,
    description: undefined
  };

  handleChange = e => {
    this.setState({ city: e.target.value });
  };
  handleSubmit = async e => {
    e.preventDefault();
    const city = this.state.city;
    if (city) {
      const apiCall = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}&units=metric`);
      const data = await apiCall.json();

      console.log(data);
      this.setState({
        city: data.name,
        country: data.sys.country,
        temp: data.main.temp,
        icon: data.weather[0].icon,
        description: data.weather[0].description
      });
    }
  };

  render() {
    const icon = `http://openweathermap.org/img/wn/${this.state.icon}@2x.png`;

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
        {this.state.icon ? <img alt="icon" src={icon} /> : null}
        {this.state.temp ? <h1>{this.state.temp}°</h1> : null}
        {this.state.description ? <p>{this.state.description}</p> : null}
      </div>
    );
  }
}

export default App;
