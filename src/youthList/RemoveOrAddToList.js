import React, { Component } from 'react';
import RemoveFromList from './RemoveFromList';
import AddToList from './AddToList';
import EgoButton from '../ui/EgoButton';

class RemoveOrAddToList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      added : props.item.list
    };

    this.handleOnRemoveFromList = this.handleOnRemoveFromList.bind(this);
    this.handleAddToList = this.handleAddToList.bind(this);
  }

  handleOnRemoveFromList(){
    this.setState({added: false})
    this.props.onRemoveFromList();
  }
  handleAddToList(list){
    this.setState({added: true})
    this.props.onAddToList();
  }

  render(){
    const theme = {};
    if(this.props.type === "blacklist") {
      theme.add = {
        theme: "btn-dark",
        icon: "",
        text: "Lista negra"
      }
      theme.remove = {
        theme: "btn-info",
        icon: '',
        text: 'Eliminar lista negra'
      }
    } else {
      theme.add = {
        theme: "btn-success",
        icon: "plus",
        text: "Lista"
      }
      theme.remove = {
        theme: "btn-danger",
        icon: 'trash',
        text: 'Eliminar'
      }
    }
    return(
      <div>
        {this.state.added ? (
            <RemoveFromList onDelete={this.handleOnRemoveFromList} item={this.props.item} list={this.props.list} type={this.props.list}>
              <EgoButton size="sm" theme={theme.remove.theme} icon={theme.remove.icon}> {theme.remove.text} {this.props.item.position}</EgoButton>
            </RemoveFromList>
          ) : (
            <AddToList onAdd={this.handleAddToList} list={this.props.list} player={this.props.item.id}    positionName={this.props.item.position}  type={this.props.list}>
              <EgoButton size="sm" theme={theme.add.theme} icon={theme.add.icon}> {theme.add.text} {this.props.item.position}</EgoButton>
            </AddToList>
          )
        }
      </div>
    )
  }
}

export default RemoveOrAddToList; // Don’t forget to use export default!
