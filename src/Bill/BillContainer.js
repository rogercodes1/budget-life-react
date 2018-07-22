import React, {Component} from 'react';
import adapter from "../adapter.js";
import BillForm from "./BillForm.js";
import BillsCollection from "./BillsCollection.js";
let url = "http://localhost:3001/api/v1/"

class BillContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      bills: []
    };
  }

  componentDidMount() {
    Promise.all([
      fetch(url + "categories"),
      fetch(url + "bills")
    ])
    .then(([catResponse, billsResponse]) => Promise.all([catResponse.json(), billsResponse.json()]))
    .then(([categories, bills]) => this.setState({
      categories: categories,
      bills: bills
    }));
  }

  addNewBill = (newBill) => {
    this.setState({
      bills: [...this.state.bills, newBill]
    });
  }

  removeBill = (bill) => {
    adapter.delete(url + `bills/${bill.id}`)
    .then(response => response.json())
    .then(() => {
      debugger;
      const bills1 = this.state.bills.filter((billObj) => {
        return billObj.id !== bill.id
      });

      this.setState({
        bills: bills1
      });
    })
  }

  render() {
    return (
      <div id="billCont">
        <BillForm user_id={this.props.user_id} addNewBill={this.addNewBill} categories={this.state.categories}/>
        <BillsCollection removeBill={this.removeBill} categories={this.state.categories} bills={this.state.bills}/>
      </div>
    );
  }
}

export default BillContainer;
