export default function reducer(state = {
  coordinate: [],
  fetching: false,
  fetched: false,
  error: null,
}, action) {

  switch (action.type) {
    case "FETCH_COORD": {
      return { ...state, fetching: true }
    }
    case "FETCH_COORD_REJECTED": {
      return { ...state, fetching: false, error: action.payload }
    }
    case "FETCH_COORD_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        coordinate: action.payload,
      }
    }
    case "SET_COORDS": {
      return {
        ...state,
        coordinate: {
          coordinate1: action.c1,
          coordinate2: action.c2
        },
      }
    }
  }

  return state
}
