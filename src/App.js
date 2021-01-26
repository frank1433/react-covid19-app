import React, { Component } from "react";

import { Cards, Chart, CountryPicker } from "./components";
import stlyes from "./App.module.css";
import { fetchData } from "./api";
import coronaImage from "./images/covid-image.png";
export default class App extends Component {
  state = {
    data: {},
    country: "",
  };
  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });
  }
  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    this.setState({ data: fetchedData, country: country });
  };
  render() {
    const { data, country } = this.state;
    // console.log(data);
    return (
      <div className={stlyes.container}>
        <img className={stlyes.img} src={coronaImage} alt="covid-19" />
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} />
      </div>
    );
  }
}
