import { LightningElement, wire } from 'lwc';
import getProducts from '@salesforce/apex/ProductService.getProducts'

export default class PractiseCart extends LightningElement {

@wire(getProducts)
wiredData({ error, data }) {
  if (data) {
    console.log('Data', data);
  } 
  else if (error) {
  
    console.error('Error:', error);
  }
}

}