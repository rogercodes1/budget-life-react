
const defaultState= {
  results : [],

  nearbyEvents:[],
  yelpParams: {
    searchTerm: "bars",
    location: "10004",
    radius: 3000,
    limit: 20,
  },
  eventComments:[],
  geolocation: [],
}

export default function reducer(state=defaultState,action) {

  switch(action.type)
    {
      case "YELP_RESULTS":
        return {
          ...state, results: action.payload
          }
      case "SELECT_EVENT":
        return {
          ...state, selectEvent: action.payload
          }


      default:
        return state
  }
}
