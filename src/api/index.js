import axios from "axios";

const url = "https://covid19.mathdro.id/api";

export const fetchData = async (country) => {
  let changeableUrl = url;
  if (country) {
    changeableUrl = `${url}/countries/${country}`;
  }
  try {
    const { data } = await axios.get(changeableUrl);
    const modifiedData = {
      confirmed: data.confirmed,
      recovered: data.recovered,
      deaths: data.deaths,
      lastUpdate: data.lastUpdate,
    };
    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};
export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(
      "https://api.covidtracking.com/v1/us/daily.json"
    );
    const modifiedData = data.map(
      ({ positive, recovered, death, dateChecked: date }) => ({
        confirmed: positive,
        recovered,
        deaths: death,
        date,
      })
    );
    return modifiedData.reverse();
  } catch (error) {
    console.log(error);
  }
};
export const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`);
    return countries.map((country) => country.name);
  } catch (error) {}
};
