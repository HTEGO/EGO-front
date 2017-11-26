import React, { Component } from 'react';

class EgoTable extends Component {

  render(){
    const Action = this.props.action;
    return(
      <div>
        { this.props.tbody.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                {this.props.thead.map(th =>
                  <td key={th.title}>
                    {th.title}
                  </td>
                )}
                <td>
                  Acción
                </td>
              </tr>
            </thead>
            <tbody>
              {this.props.tbody.map( (tr,index) =>
                <tr key={tr.id}>
                 {this.props.thead.map(head =>
                   <td key={head.name}>
                    {tr[head.name]}
                  </td>
                 )}
                 <td>
                  <Action index={index} item={tr} onDelete={this.props.onDeleteItem} />
                 </td>
                </tr>
              )}
            </tbody>
          </table>
        ) : (
          <div className="alert alert-warning" role="alert">
            <span className="oi oi-warning"></span> No hay jugadores en esta lista
          </div>
        )}
      </div>
    )
  }
}

export default EgoTable; // Don’t forget to use export default!
