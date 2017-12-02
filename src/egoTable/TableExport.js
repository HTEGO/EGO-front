import React, { Component } from 'react';
import XLSX from 'xlsx';
import FileSaver from 'file-saver';

class TableExport extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }

    this.handleDownloadTable = this.handleDownloadTable.bind(this);
  }

  handleDownloadTable(event){
    event.preventDefault();

    this.exportFile();
  }

  /* see Browser download file example in docs */
  s2ab(s){ //}(s/*:string*/)/*:ArrayBuffer*/ {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i=0; i!== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
  }

  exportFile() {
    let type = "xlsx";
    var wb = XLSX.utils.table_to_book(document.getElementById("table-results"), {sheet:"Sheet JS"});
    var wbout = XLSX.write(wb, {bookType:type, bookSST:true, type: 'binary'});
    var fname =  'jugadores.' + type;
    // try {
    	FileSaver.saveAs(new Blob([this.s2ab(wbout)],{type:"application/octet-stream"}), fname);
    // } catch(e) {
       // if(typeof console !== 'undefined') {
       //   console.log(e, wbout);
       // }
     // }
    return wbout;
  }

  render(){
    return(
      <button type="botton" className="btn btn-success btn-sm" onClick={this.handleDownloadTable}><span className="oi oi-cloud-download"></span> Exportar</button>
    )
  }
}

export default TableExport; // Don’t forget to use export default!
