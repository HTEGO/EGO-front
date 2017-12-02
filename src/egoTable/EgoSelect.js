import React, { Component } from 'react';

class EgoSelect extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: this.props.value
    }
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(e){
    this.setState({value: e.target.value})
    this.props.onChangeEgoSelect(e);
  }
  render(){
    return (
      <div className="form-group col-auto">
        <label className="mr-sm-{this.props.cols}" htmlFor="position">{this.props.label}</label>&nbsp;
        <select className="custom-select mb-{this.props.cols} mr-sm-{this.props.cols} mb-sm-0" id={this.props.name} name={this.props.name}
         value={this.state.value} onChange={this.handleOnChange}>
          {this.props.options.map((option,index) =>
            <option key={option.id} value={option.id}>{option.name}</option>
          )}
        </select>
      </div>

    )
  }
}

export default EgoSelect; // Don’t forget to use export default!
