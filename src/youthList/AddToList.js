import React, { Component } from 'react';
import {EndPoints} from '../endPoints/EndPoints';
import 'whatwg-fetch'


class AddToList extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.handleAddToList = this.handleAddToList.bind(this);
  }

  handleAddToList(event){
    event.preventDefault();

    const url = new URL(EndPoints.URL.youthAddToList);
    url.searchParams.append("list",this.props.list);
    url.searchParams.append("player",this.props.player);
    // Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    const that = this;
    fetch(url)
    .then(response => {
      if(response.status === 200){
        return true
      }
    }).then((result) => {
        that.props.onAdd(that.props.list);
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })
  }

  render(){
    return(
      <div onClick={this.handleAddToList}>{this.props.children}</div>
    )
  }
}

export default AddToList; // Don’t forget to use export default!
