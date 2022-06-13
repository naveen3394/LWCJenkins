import { LightningElement ,api} from 'lwc';

export default class ChildForEvent extends LightningElement {

    @api inputvalue123;
    handleChange(event) {
 this.inputvalue123=event.target.value;
 //CustomEvent("eventName",{(parameters JSON to pass));
 console.log('inputvalue123'+inputvalue123);
 const customevent1 =new CustomEvent("handleinputchange",{
      detail : this.inputvalue123
    //numbervalue1: "4"
    });

   this.dispatchEvent(customevent1);

    }
}