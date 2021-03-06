import React from "react";
import adapter from "../adapter.js";
import EventForm from "./EventForm.js";
import EventsList from "./eventsList.js";
const url = "http://localhost:3001/api/v1/event_plannings"
class EventContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      events: []
    };
  }

  componentDidMount() { this.fetchEvents()}

fetchEvents = () => {
  adapter.get(url)
  .then(response => response.json())
  .then(data => {

    if (data.status==="unauthorized") {
      return []
    }
    else {
      const sortedData = data.sort((firstEvent, secEvent) => {
        return firstEvent.id - secEvent.id
      })
    this.setState({events: sortedData});
   }
   })
}

  addNewEvent = (eventObj) => {
    this.setState({
      events: [...this.state.events, eventObj]
    });
  }

  editEvent = (eventObj) => {
    this.fetchEvents();
  }

  removeEvent = (event) => {
    adapter.delete(`http://localhost:3001/api/v1/event_plannings/${event.id}`)
    .then(response => response.json())
    .then(() => {
      console.log("state", this.state)
      const events1 = this.state.events.filter((eventObj) => {
        return event.id !== eventObj.id
      });

      this.setState({
        events: events1
      });
    })
  }

  render() {
    return (
      <div id="eventCont">
        <h1>Events</h1>
        <EventForm addNewEvent={this.addNewEvent}/>
        <EventsList removeEvent={this.removeEvent} editEvent={this.editEvent} events={this.state.events}/>
      </div>
    );
  }
}

export default EventContainer;
