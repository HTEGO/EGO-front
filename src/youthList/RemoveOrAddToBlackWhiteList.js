import React, { Component } from 'react';
import RemoveOrAddToList from './RemoveOrAddToList';

class RemoveOrAddToBlackWhiteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addedToBlackList: false,
      addedToList: props.item.list ? true : false
    }
    this.handleOnAddToBlackList = this.handleOnAddToBlackList.bind(this);
    this.handleOnRemoveFromBlackList = this.handleOnRemoveFromBlackList.bind(this);
    this.handleOnAddToList = this.handleOnAddToList.bind(this);
    this.handleOnRemoveFromList = this.handleOnRemoveFromList.bind(this);
  }

  handleOnAddToBlackList(list){
    this.setState({addedToBlackList: true});
  }

  handleOnRemoveFromBlackList(){
    this.setState({addedToBlackList: false});
  }

  handleOnAddToList(){
    this.setState({addedToList: true});
  }

  handleOnRemoveFromList(){
    this.setState({addedToList: false});
  }

  render(){
    return(
      <div>
        { !this.state.addedToBlackList && (
          <RemoveOrAddToList item={this.props.item} list={this.props.list}
           onAddToList={this.handleOnAddToList} onRemoveFromList={this.handleOnRemoveFromList}
          />
        )}
        { !this.state.addedToList && (
          <RemoveOrAddToList item={this.props.item} list={this.props.blacklist}
            onAddToList={this.handleOnAddToBlackList} type="blacklist" onRemoveFromList={this.handleOnRemoveFromBlackList}
          />
        )}
      </div>
    )
  }
}

export default RemoveOrAddToBlackWhiteList; // Don’t forget to use export default!
