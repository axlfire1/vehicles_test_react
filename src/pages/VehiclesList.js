import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

class VehiclesList extends React.Component {
    url = "";

    state = {
      vehicles: []
    }

  filter_vehicles() {
    var input = document.getElementById("input");
    var option = document.getElementById("options");

    switch (option.value) {
      case "brand_name":
        this.url = 'http://localhost:3000/v1/vehicles?brand_name=' + input.value
        break;
      case "model_name":
        this.url = 'http://localhost:3000/v1/vehicles?model_name=' + input.value
        break;
      case "mileage":
        this.url = 'http://localhost:3000/v1/vehicles?mileage[lt]=' + input.value
        break;
      case "price":
        this.url = 'http://localhost:3000/v1/vehicles?price[lt]=' + input.value
        console.log(this.url);
        break;
      case "year":
        this.url = 'http://localhost:3000/v1/vehicles?year[lt]=' + input.value
        console.log(this.url);
        break;
      default:
        this.url = 'http://localhost:3000/v1/vehicles'
        break;
    }

    axios.get(this.url).then(res => {
      const vehicles = res.data;
      this.setState({ vehicles });
    })

    document.getElementById("test_label").innerHTML = 'input value: ' + input.value;
    document.getElementById("test_label2").innerHTML = 'option value: ' + option.value;
    document.getElementById("test_label3").innerHTML = 'query uri: ' + this.url;
  }

  render() {
    return (
      <div>
        <div>
          <label id="test_label"></label>
          <br />
          <label id="test_label2"></label>
          <br />
          <label id="test_label3"></label>
        </div>
        <div class="row">
          <div class="col-md-6 offset-md-3">
          <h3>
            Filter vehicles:
          </h3>
          <table class="table table-striped">
            <tr>
              <td>
                <label>
                  Input:
                </label>
              </td>
              <td>
                <label>
                  <input type="text" id="input" name="input"></input>
                </label>
              </td>
            </tr>
            <tr>
              <td>
                <label>
                Option:
                </label>
              </td>
              <td>
                <label>
                <select id="options">
                  <option value="all">All</option>
                  <option value="brand_name">Brand</option>
                  <option value="model_name">Model</option>
                  <option value="mileage">Mileage</option>
                  <option value="price">Price</option>
                  <option value="year">Year</option>
                </select>
                </label>
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>
                <button 
                  type="submit"
                  class="btn btn-outline-primary" 
                  onClick={() => this.filter_vehicles() }
                >
                  Search
                </button>
              </td>
            </tr>
          </table>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 offset-md-3">
            <br /><br />
            <h3>Vehicles List</h3><br />
            <table class="table table-bordered">
              <tr>
                <th>No</th>
                <th>Id</th>
                <th>Brand</th>
                <th>Model</th>
                <th>Year</th>
                <th>Mileage</th>
                <th>Price</th>
              </tr>
              {
                this.state.vehicles ?

                  this.state.vehicles.map((vehicle, i) =>
                    <tr>
                      <td>{++i}</td>
                      <td>{vehicle.id}</td>
                      <td>{vehicle.brand_name}</td>
                      <td>{vehicle.model_name}</td>
                      <td>{vehicle.year}</td>
                      <td>{vehicle.mileage}</td>
                      <td>{vehicle.price}</td>
                    </tr>
                  )
                  :
                  null
              }
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default VehiclesList;