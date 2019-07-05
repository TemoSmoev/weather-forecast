const ApiKey = "524e9de6737ada2636ee3b738d34716f";

export default city => {
  return `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}&units=metric`;
};
