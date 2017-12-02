import React, { Component } from 'react';
import 'whatwg-fetch'

import {EndPoints} from './endPoints/EndPoints';
import TableExport from './TableExport';
import RemoveOrAddToBlackWhiteList from './youthList/RemoveOrAddToBlackWhiteList';
import YouthListParser from './utils/YouthListParser';

class SearchEgo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      youthPlayers: [],
      age: 15,
      minimumDays: 0,
      maximumDays: 111,
      stars: 4,
      position: "keeper",
      order: ""
    };

  //  this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeAge = this.handleChangeAge.bind(this);
    this.handleChangeMinimumDays = this.handleChangeMinimumDays.bind(this);
    this.handleChangeMaximumDays = this.handleChangeMaximumDays.bind(this);
    this.handleChangeStars = this.handleChangeStars.bind(this);
    this.handleChangePosition = this.handleChangePosition.bind(this);
    this.handleChangeOrder = this.handleChangeOrder.bind(this);
    this.handleChangeOrder = this.handleChangeOrder.bind(this);

    this.days = this.createDays();
    this.valueField = 'code';
    this.labelField = 'description'
    this.options = [
        {
            description: 'This is option A',
            code: 'a'
        },
        {
            description: 'This is option B',
            code: 'b'
        },
        {
            description: 'This is option C',
            code: 'c'
        },
        {
            description: 'This is option D',
            code: 'd'
        }
    ];
  }

  handleSubmit(event) {
    event.preventDefault();
    var params = {
      age: this.state.age,
      minimumDays: this.state.minimumDays,
      maximumDays: this.state.maximumDays,
      stars: this.state.stars,
      position: this.state.position,
      order: this.state.order
    }
    this.requestPlayerList(params);
  }

  handleChangeAge(e){
    this.setState({age: e.target.value})
  }

  handleChangeMinimumDays(e){
    this.setState({minimumDays: e.target.value})
  }

  handleChangeMaximumDays(e){
    this.setState({maximumDays: e.target.value})
  }

  handleChangeStars(e){
    this.setState({stars: e.target.value})
  }

  handleChangePosition(e){
    this.setState({position: e.target.value})
  }

  handleChangeOrder(e){
    this.setState({order: e.target.value})
  }

  createDays(){
    let options = [];
    for (let i = 0; i < 112; i++){
      options.push(i);
    }
    return options
  }

  requestPlayerList(params){
    var url = new URL(EndPoints.URL.bestYouthPlayer);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    var that = this;
    fetch(url)
    .then(function(response) {
      return response.json()
    }).then(function(json) {
      that.setState({"youthPlayers": []});
      const youthList = YouthListParser.parse(json);
      that.setState({"youthPlayers": youthList});
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })
  }

  render() {
    var self = this;
    var options = self.days.map(function(option) {
        return (
            <option key={option} value={option}>
                {option}
            </option>
        )
    });

    const order = (order) =>{
      return order === 'Normal' ? '' : order;
    }

    return(
      <div>
        <h1 className="display-5">Juveniles</h1>

        <p>Seguimiento de juveniles</p>
          <section>
            <p><br />Búsqueda de juveniles por estrellas</p>
            <div className="row">
              <form onSubmit={this.handleSubmit}
               className="form-inline col-md-10 form-inline  align-items-center">
                <div className="form-group col-auto">
                  <label className="mr-sm-2" htmlFor="age">Edad</label>
                  <select className="custom-select mb-2 mr-sm-2 mb-sm-0" id="age" name="age"
                  value={this.state.age} onChange={this.handleChangeAge}>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                  </select>
                </div>
                <div className="form-group col-auto">
                  <label className="mr-sm-2" htmlFor="minimumDays">Días mínimos</label>
                  <select className="custom-select mb-2 mr-sm-2 mb-sm-0" id="minimumDays" name="minimumDays"
                  value={this.state.minimumDays} onChange={this.handleChangeMinimumDays}>
                    {options}
                  </select>
                </div>
                <div className="form-group col-auto">
                  <label className="mr-sm-2" htmlFor="maximumDays">Días máximos</label>
                  <select className="custom-select mb-2 mr-sm-2 mb-sm-0" id="maximumDays" name="maximumDays"
                  value={this.state.maximumDays} onChange={this.handleChangeMaximumDays}>
                    {options}
                  </select>
                </div>
                <div className="form-group col-auto">
                  <label className="mr-sm-2" htmlFor="starts">Estrellas</label>
                  <select className="custom-select mb-2 mr-sm-2 mb-sm-0" id="starts" name="starts"
                   value={this.state.stars} onChange={this.handleChangeStars}>
                    <option value="4">4</option>
                    <option value="4.5">4.5</option>
                    <option value="5">5</option>
                    <option value="5.5">5.5</option>
                    <option value="6">6</option>
                    <option value="6.5">6.5</option>
                    <option value="7">7</option>
                    <option value="7.5">7.5</option>
                    <option value="8">8</option>
                    <option value="8.5">8.5</option>
                  </select>
                </div>
                <div className="form-group col-auto">
                  <label className="mr-sm-2" htmlFor="position">Posicion</label>
                  <select className="custom-select mb-2 mr-sm-2 mb-sm-0" id="position" name="position"
                   value={this.state.position} onChange={this.handleChangePosition}>
                    <option value="keeper">Portero</option>
                    <option value="defense">Defensa</option>
                    <option value="wingBack">Lateral</option>
                    <option value="inner">Mediocentro</option>
                    <option value="winger">Extremo</option>
                    <option value="forward">Delantero</option>
                  </select>
                </div>
                <div className="form-group col-auto">
                  <label className="mr-sm-2" htmlFor="order">Orden</label>
                  <select className="custom-select mb-2 mr-sm-2 mb-sm-0" id="order" name="order"
                   value={this.state.order} onChange={this.handleChangeOrder}>
                    <option value="">-</option>
                    <option value="offensive">Ofensivo</option>
                    <option value="defensive">Defensivo</option>
                    <option value="toWing">Hacia el lateral</option>
                    <option value="toMiddel">Hacía el medio</option>
                  </select>
                </div>
                <div className="form-group col-auto">
                  <button type="submit" className="btn btn-primary">Buscar</button>
                </div>
              </form>
              <div className="col-md-2 text-md-right">
                <TableExport></TableExport>
              </div>
            </div>
          </section>
          <section>
            <table id="table-results" className="table table-striped">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Jugador</th>
                  <th>Edad</th>
                  <th>Equipo senior</th>
                  <th>Posición</th>
                  <th>Especialidad</th>
                  <th>Estrellas</th>
                  <th>Favoritos</th>
                </tr>
              </thead>
              <tbody>
                {this.state.youthPlayers.map( (p, index) =>
                  <tr key={p.id}>
                    <td> {p.id} </td>
                    <td> {p.first_name} {p.last_name}</td>
                    <td> {p.age},{p.days}</td>
                    <td> {p.teamName} </td>
                    <td> {p.position} {order(p.order)}</td>
                    <td> {p.specialty}</td>
                    <td> {p.stars}</td>
                    <td>
                      <RemoveOrAddToBlackWhiteList item={p} list={p.positionId} blacklist={p.blacklistId} />
                    </td>
                  </tr>
                )}
              </tbody>
          </table>
        </section>
      </div>
    )
  }
}

export default SearchEgo; // Don’t forget to use export default!
