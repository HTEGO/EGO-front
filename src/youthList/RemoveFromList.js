import React, { Component } from 'react';
import {EndPoints} from '../endPoints/EndPoints';
import 'whatwg-fetch'

class RemoveFromList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false
    }
    this.handleRemoveFromList = this.handleRemoveFromList.bind(this);
  }

  handleRemoveFromList(e){
    e.preventDefault();

    const url = new URL(EndPoints.URL.youthRemoveFromList);
    url.searchParams.append("list",this.props.item.list);
    url.searchParams.append("player",this.props.item.id);
    fetch(url)
    .then(response => {
      if(response.status === 200){
        return response.json()
      } else {
        this.setState({error: true});
      }

    }).then(json => {
      if(json.result === 1){
      this.props.onDelete(this.props.index);
      } else {
        this.setState({error: true});
      }
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })
  }

  render(){
    return(
      <div>
        {this.state.error ? (
            <button type="botton" className="btn btn-warning btn-sm">
              <span className="oi oi-warning"></span> Error eliminando
            </button>
          ) : (
            <button type="botton" className="btn btn-danger btn-sm" onClick={this.handleRemoveFromList}>
              <span className="oi oi-trash"></span> Eliminar
            </button>
          )
        }
      </div>
    )
  }
}

export default RemoveFromList; // Don’t forget to use export default!
