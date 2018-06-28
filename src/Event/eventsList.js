import React from "react";
import Event from "./Event.js";
import {Card} from 'semantic-ui-react'

class EventsCollection extends React.Component {

  getCards = () => {
    return this.props.events.map((eventObj) => {
      return <Event key={eventObj.id} removeEvent={this.props.removeEvent} event={eventObj} editEvent={this.props.editEvent}/>
    });
  }

  render() {
    return (
      <div id="eventCollect">
      <h3>Events</h3>
        <Card.Group >
          {this.getCards()}
        </Card.Group>
      </div>
    );
  }
}
export default EventsCollection;
