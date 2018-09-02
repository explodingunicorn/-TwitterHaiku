import axios from "axios";

const haikus = {
  get: (extension, id) => {
    let route = "/haikus/";
    if (extension) {
      route += extension + "/" + id;
    }
    console.log(route);
    return axios
      .get(route)
      .then(res => {
        return res.data;
      })
      .catch(err => {
        console.log("There was an error retrieving the data");
      });
  }
};

export default haikus;
