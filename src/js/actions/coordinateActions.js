import axios from "axios";

/*export function fetchCoord() {
  return {
    type: "FETCH_COORD_FULFILLED",
    payload: {
      coordinate1: 4,
      coordinate2: 45
    }
  }
}*/

/*export function setCoord(coordinate1, coordinate2) {
  return {
    type: 'SET_COORDS',
    payload: coordinate1, coordinate2

  }
}*/
export function setCoord(c1, c2) {
  return function (dispatch) {
    return axios({
      url: 'http://localhost:3500/api/coordinates',
      method: 'post',
      headers: { },
      data: {
        coordinate1: c1,
        coordinate2: c2
      },
    })
      /*axios.post("http://localhost:3500/api/coordinates", {
        headers:{
          'coordinate1': c1,
          'coordinate2': c2
        },
        data:{
          'coordinate1': c1,
          'coordinate2': c2
        }
        
      })*/
      .then(function (response) {
        console.log("Responsé"+response);
        dispatch({type: "SET_COORDS", c1, c2})
      })
      .catch(function (error) {
        console.log(error);
      });
    //type: 'SET_COORDS',
    //payload: coordinate1, coordinate2

  }
}

export function fetchCoordsFromDB() {
  return function (dispatch) {

    axios.get("http://localhost:3500/api/coordinates")
      .then((response) => {
        dispatch({ type: "FETCH_COORDS_FULFILLED", payload: response.data })
      })
      .catch((err) => {
        dispatch({ type: "FETCH_COORDS_REJECTED", payload: err })
      })
  }
}

