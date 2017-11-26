import React, { Component } from 'react';
import RemoveFromList from '../youthList/RemoveFromList';
import AddToList from '../youthList/AddToList';

import 'whatwg-fetch'


class RemoveOrAddToList extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      added : false
    };

    this.handleOnRemoveFromList = this.handleOnRemoveFromList.bind(this);
    this.handleAddToList = this.handleAddToList.bind(this);
  }

  handleOnRemoveFromList(index){
    this.props.item.list = null;
    this.setState({added: false})
  }
  handleAddToList(list){
    this.props.item.list = list;
    this.setState({added: true})
  }

  render(){
    return(
      <div>
        {this.state.added || this.props.item.list ? (
            <RemoveFromList index={this.props.index} item={this.props.item} onDelete={this.handleOnRemoveFromList}/>
          ) : (
            <AddToList onAdd={this.handleAddToList} list={this.props.item.positionId} player={this.props.item.id} positionName={this.props.item.position} />
          )
        }
      </div>
    )
  }
}

export default RemoveOrAddToList; // Don’t forget to use export default!
