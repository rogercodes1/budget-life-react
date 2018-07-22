import React,{Component} from "react";
import Bills from "./Bills.js";
import Events from "./Events.js";
import adapter from "../adapter.js";
let url = "http://localhost:3001/api/v1/"
//import BillContainer from "../Bill/BillContainer.js";
//import EventContainer from "./EventContainer.js";
// let myChart = new Chart(10);

class HomeContainer extends Component {
  constructor() {
    super();

    this.state = {
      bills: [],
      categories: [],
      events: []
    };
  }

  componentDidMount() {
    this.fetchBills();
  }

  fetchBills = () => {
    Promise.all([
      adapter.get(url + "bills"),
      adapter.get(url + "event_plannings"),
      adapter.get(url + "categories")
    ])
    .then(([res1, res2, res3]) => Promise.all([res1.json(), res2.json(), res3.json()]))
    .then(([bills, events, categories]) => {
      console.log("data", bills,events,"categories", categories);
      const latestBills = (bills.status==="unauthorized") ? []: bills.sort((billObj1, billObj2) => {
        return new Date(billObj1.due_date) - new Date(billObj2.due_date);
      }).slice(0, 3);

      const latestEvents = (events.status==="unauthorized") ? [] : events.sort((eventObj1, eventObj2) => {
        return new Date(eventObj1.date) - new Date(eventObj2.date);
      }).slice(0, 3);

      this.setState({
        events: latestEvents,
        bills: latestBills,
        categories: categories
      });
  });
  }

  render() {
    return (
      <div>
         <div id="homeCont">
             <h1>Dashboard</h1>
              <h1>Will Show graphs of goals and savings</h1>
              <Bills bills={this.state.bills} categories={this.state.categories}/>
              <Events events={this.state.events}/>
          </div>
      </div>
    );
  }
}

export default HomeContainer;
