import { LightningElement, track } from 'lwc';

export default class ParentForEvent extends LightningElement {
    @track textfromchild ;
    @track numberfromchild;
    handleinputfromchild(event){
        this.textfromchild=event.detail;
      //  this.numberfromchild=event.numbervalue1;

    }
}