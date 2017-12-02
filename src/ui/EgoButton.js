import React, { Component } from 'react';

class EgoButton extends Component {

  render(){
    const buttonClass = "btn "+this.props.theme+" btn-"+this.props.size;
    return(
      <button type="botton" className={buttonClass}>

        <span className="oi oi-plus"></span> {this.props.children}
      </button>
    )
  }
}

export default EgoButton; // Don’t forget to use export default!
