import { LightningElement,wire,track,api } from 'lwc';
import getCartItems from '@salesforce/apex/OrderDataService.getCartItems';
import { refreshApex } from '@salesforce/apex';

export default class ShowOrderCart extends LightningElement {

@track testdata;
@track orderItemList;
@api openorderid;

showcartdata=false;

//@track data=[];
result;
@wire(getCartItems, { orderId: '$openorderid' })
wiredCartData({ error, data }) {
  if (data) {
    console.log('Data from db', data);
    this.orderItemList= data;

    this.testdata=JSON.stringify(data);
this.showcartdata=true;

    console.log('orderitemLIst'+this.orderItemList);
   // return refreshApex(this.result);

  } else if (error) {
     console.error('Error:', error);
  }
}
}