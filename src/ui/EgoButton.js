import React, { Component } from 'react';

class EgoButton extends Component {

  render(){
    const buttonClass = "btn "+this.props.theme+" btn-"+this.props.size;
    const iconClass = 'oi oi-'+this.props.icon;
    return(
      <button type="botton" className={buttonClass}>

        <span className={iconClass}></span> {this.props.children}
      </button>
    )
  }
}

export default EgoButton; // Don’t forget to use export default!
