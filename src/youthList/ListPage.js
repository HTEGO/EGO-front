import React, { Component } from 'react';
import 'whatwg-fetch'

import EgoTable from '../egoTable/EgoTable';
import RemoveFromList from '../youthList/RemoveFromList';

import {EndPoints} from '../endPoints/EndPoints';
import {HtPositions} from '../htCodes/HtPositions';

import YouthListParser from '../utils/YouthListParser';


class ListPage extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      youthPlayers: [],
      requested: false
    }

    this.handleChangePosition = this.handleChangePosition.bind(this);
    this._handleDelete = this._handleDelete.bind(this);

    this.thead = [
      {title: 'Jugador', name: 'name', show: true},
      {title: 'Edad', name: 'age', show: true},
      {title: 'Especialidad', name: 'speciality', show: true},
      {title: 'Estrellas', name: 'stars', show: true},
    ]
  }

  _handleDelete(index) {
    const youthPlayers = [ ...this.state.youthPlayers];
    youthPlayers.splice(index,1);
    this.setState({youthPlayers})
  }

  handleChangePosition(position){
    const list = HtPositions.positions.indexOf(position);
    const url = new URL(EndPoints.URL.youthList);
    url.searchParams.append("list",list);
    // Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    let that = this;
    fetch(url)
    .then(response => {
      if(response.status === 200){
        that.setState({"added":true});
        return response.json()
      }
    }).then((json) => {
        const youthList = YouthListParser.parseYouthList(list,json);
        this.setState({"youthPlayers": youthList});
        this.setState({requested: true})
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })
  }


  render(){
    return(
      <div>
        <h1 className="display-5">Lista de juveniles</h1>

        <div className="row">
          <div className="col-md-3">
            <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
              <a href="#keeper" onClick={this.handleChangePosition.bind(this,'keeper')} className="nav-link" id="v-pills-keepers-tab" data-toggle="pill" role="tab" aria-controls="list-table" aria-selected="true">Porteros</a>
                <a href="#wingback" onClick={this.handleChangePosition.bind(this,'wingback')} className="nav-link" id="v-pills-wingback-tab" data-toggle="pill" role="tab" aria-selected="false">Lateral</a>
              <a href="#defender" onClick={this.handleChangePosition.bind(this,'defender')} className="nav-link" id="v-pills-defender-tab" data-toggle="pill" role="tab" aria-controls="list-table" aria-selected="false">Defensa</a>
              <a href="#winger" onClick={this.handleChangePosition.bind(this,'winger')} className="nav-link" id="v-pills-winger-tab" data-toggle="pill" role="tab" aria-controls="list-table" aria-selected="false">Extremo</a>
              <a href="#inner" onClick={this.handleChangePosition.bind(this,'inner')} className="nav-link" id="v-pills-inner-tab" data-toggle="pill" role="tab" aria-controls="list-table" aria-selected="false">Mediocentro</a>
              <a href="#forward" onClick={this.handleChangePosition.bind(this,'forward')} className="nav-link" id="v-pills-forward-tab" data-toggle="pill" role="tab" aria-controls="list-table" aria-selected="false">Delantero</a>
            </div>
          </div>
          <div className="col-md-9">
            <div className="tab-content" id="v-pills-tabContent">
              <div className="tab-pane fade show active" id="v-pills-keeper" role="tabpanel" aria-labelledby="v-pills-home-tab">
                {this.state.requested ? (
                  <EgoTable
                    thead={this.thead}
                    tbody={this.state.youthPlayers}
                    action={RemoveFromList}
                    onDeleteItem={this._handleDelete}>
                  </EgoTable>
                ) : (
                  <div className="alert alert-secondary" role="alert">
                    <span className="oi oi-info"></span> Pulsa sobre una lista para empezar
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ListPage; // Don’t forget to use export default!
