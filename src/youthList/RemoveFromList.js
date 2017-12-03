import React, { Component } from 'react';
import {EndPoints} from '../endPoints/EndPoints';
import 'whatwg-fetch'

class onRemove extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false
    }
    this.handleonRemove = this.handleonRemove.bind(this);
  }

  handleonRemove(e){
    e.preventDefault();

    const url = new URL(EndPoints.URL.youthRemoveFromList);
    const list = this.props.list ? this.props.list : this.props.item.list;
    url.searchParams.append("list",list);
    url.searchParams.append("player",this.props.item.id);

    const that = this;
    fetch(url)
    .then(response => {
      if(response.status === 200){
        this.props.onDelete({
          index: this.props.index,
          id: this.props.item.id
        });
      } else {
        this.setState({error: true});
      }

    }).then(json => {

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
            <div onClick={this.handleonRemove}>{this.props.children}</div>
          )
        }
      </div>
    )
  }
}

export default onRemove; // Don’t forget to use export default!
