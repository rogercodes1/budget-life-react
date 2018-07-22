export function addEventAction(results) {
  return {
    type: "ADD_EVENT",
    payload: addEvent
  }
}
export function addBillAction(selectedBusiness) {
  return {
    type: "ADD_BILL",
    payload: addBill
  }
}
