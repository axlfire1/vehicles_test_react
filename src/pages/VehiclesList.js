import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

class VehiclesList extends React.Component {

    state = {
      vehicles: []
    }

  componentDidMount() {
    axios.get(`http://localhost:3000/v1/vehicles`)
      .then(res => {
        const vehicles = res.data;
        this.setState({ vehicles });
      })
  }

  filter_vehicles() {
    var input = document.getElementsByName("input").value;
    console.log("EL content is" + input);
  }

  render() {
    return (
      <div>
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
                  <input type="text" name="input"></input>
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