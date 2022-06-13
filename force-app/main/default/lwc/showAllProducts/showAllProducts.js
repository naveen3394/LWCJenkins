import { LightningElement,wire,track,api } from 'lwc';
import getProducts from '@salesforce/apex/OrderDataService.getProducts'
import { refreshApex } from '@salesforce/apex';
import addItemsToCart from '@salesforce/apex/OrderDataService.addItemsToCart'
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class ShowAllProducts extends LightningElement {

    @track productList;
    @api searchKey = '';
	@api searchCode='';
    result;
	@track quantity;
	
@api openorderid;

    @wire(getProducts,{searchKey: '$searchKey',searchCode :'$searchCode'})
	 orderListFromWire({error,data}) 
	 {
		 this.plist=data;
		if (data) {
			console.log('log me ' + JSON.stringify(data))
			this.productList = data;
            //     PriceBook2.Name, Product2.Id,Product2.Product_Image__c ,Available_Quantity__c, Product2.Name, UnitPrice, Name From PricebookEntry WHERE PriceBook2.Name LIKE '%Gadgets%'];

			// let d = [];
			// data.forEach(element => {
			// 	let elt = {};
			// 	elt.image = element.Product2.Product_Image__c;
			// 	elt.name = element.PriceBook2.Name;//issue here
			// 	elt.unitPrice = element.UnitPrice;
			// 	elt.availableQty = element.Available_Quantity__c;
            //     elt.pricebookName=element.Name;
            //     elt.productId=element.Product2.Id;
			// 	d.push(elt); 
			// });


			// this.productList = d;  

			console.log('this.prodListData ' + JSON.stringify(this.productList));
		} else if(error){
			console.log('log error ' + JSON.stringify(error))
			}
	}

handleKeyChange( event ) {
        this.searchKey = event.target.value;
        return refreshApex(this.result);
    }
	handleProductCodeChange(event)
	{
this.searchCode=event.target.value;
return refreshApex(this.result);
	}

handleQuantityChange(event)
{
console.log('quantity value'+event.target.value);
const allValid = [...this.template.querySelectorAll('lightning-input')]
            .reduce((validSoFar, inputCmp) => {
                        inputCmp.reportValidity();
                        return validSoFar && inputCmp.checkValidity();
            }, true);
        if (allValid) {
            alert('All form entries look valid. Ready to submit!');
        this.quantity=event.target.value;

		}
this.quantity=event.target.value;
console.log('to be added to cart '+this.productList[event.target.name]);

console.log('index value'+event.target.name);

}
handleAddToCart(event)
{

console.log('to be added to cart '+this.productList[event.target.name].Product2.Available_Quantity__c);
console.log('to be added to cart1 '+JSON.stringify(this.productList[event.target.name]));
let arr=JSON.stringify(this.productList[event.target.name]);

console.log(this.productList[event.target.name].Product2.Available_Quantity__c-this.quantity);

const finalAvaiQty=this.productList[event.target.name].Product2.Available_Quantity__c-this.quantity;

console.log('finalAvaiQty'+finalAvaiQty);
console.log('openorderId'+this.openorderid);

console.log('open orderId'+this.openorderid);
 addItemsToCart({ priceEntry:arr, orderId:this.openorderid, finalqty:finalAvaiQty,itemQty:this.quantity})
        .then(result => {
            
            this.message = result;
            this.error = undefined;
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Record created',
                    variant: 'success',
                }),

            );
            //window.location.reload();
            return refreshApex(this.plist);
        })
       
        .catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error creating record',
                    message: error.body.message,
                    variant: 'error',
                }),
               
            );
            console.log('message'+error);
        });
    }


}