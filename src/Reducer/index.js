
const defaultState= {
  events:[],
  bills : [],
  transactions:[],
  yelpParams: {
    searchTerm: "bars",
    location: "10004",
    radius: 3000,
    limit: 20,
  },
  geolocation: [],
}

export default function reducer(state=defaultState,action) {

  switch(action.type)
    {
      case "ADD_EVENT":
        return {
          ...state, events: action.payload
          }
      case "ADD_BILL":
        return {
          ...state, bills: action.payload
          }
      case "ADD_TRANSACTION":
        return {
          ...state, transactions: action.payload
          }


      default:
        return state
  }
}
