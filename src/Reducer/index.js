
const defaultState= {
  events:[],
  bills : [],
  transactions:[],

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
