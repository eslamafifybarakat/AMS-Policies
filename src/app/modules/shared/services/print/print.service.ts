import { Injectable } from '@angular/core';
import * as printJS from 'print-js';

@Injectable({
  providedIn: 'root'
})
export class PrintService {

  printJsConfig: any = {};

  constructor() { }

  printPdf(printable?: any, header?: any, showModal?: boolean, modalMessage?: any): void {
    this.printJsConfig.type = 'pdf',
      printable ? this.printJsConfig.printable = printable : '',
      header ? this.printJsConfig.header = header : '',
      showModal ? this.printJsConfig.showModal = showModal : false,
      modalMessage ? this.printJsConfig.modalMessage = modalMessage : '',
      console.log(this.printJsConfig);
    printJS(this.printJsConfig)
  }

  printJson(printable?: any, properties?: any, header?: any, style?: any, gridHeaderStyle?: any): void {
    this.printJsConfig.type = 'json',
      printable ? this.printJsConfig.printable = printable : '',
      header ? this.printJsConfig.header = header : '',
      properties ? this.printJsConfig.properties = properties : '',
      style ? this.printJsConfig.style = style : '',
      gridHeaderStyle ? this.printJsConfig.gridHeaderStyle : 'color: red;  border: 2px solid #3971A5;',
      console.log(this.printJsConfig);
    printJS(this.printJsConfig)

    console.log(this.printJsConfig);

  }

}
