import { LightningElement, api, track, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import ORDER_OBJECT from '@salesforce/schema/Order';
import AccountId_FIELD from '@salesforce/schema/Order.AccountId';
import STATUS_FIELD from '@salesforce/schema/Order.Status';
import EffectiveDate_FIELD from '@salesforce/schema/Order.EffectiveDate';
import BillingStreet_FIELD from '@salesforce/schema/Order.BillingStreet';
import BillingCity_FIELD from '@salesforce/schema/Order.BillingCity';
import BillingState_FIELD from '@salesforce/schema/Order.BillingState';
import BillingCountry_FIELD from '@salesforce/schema/Order.BillingCountry';
import BillingPostalCode_FIELD from '@salesforce/schema/Order.BillingPostalCode';

import ShippingStreet_FIELD from '@salesforce/schema/Order.ShippingStreet';
import ShippingCity_FIELD from '@salesforce/schema/Order.ShippingCity';
import ShippingState_FIELD from '@salesforce/schema/Order.ShippingState';
import ShippingCountry_FIELD from '@salesforce/schema/Order.ShippingCountry';
import ShippingPostalCode_FIELD from '@salesforce/schema/Order.ShippingPostalCode';

import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import createOrder from '@salesforce/apex/OrderDataService.createNewOrder';
export default class CreateNewOrderLWC extends LightningElement {
   //selectedAccountId;
   // @track contactId;  
    value = '';

    BillingAdd;
    @track AccountId = AccountId_FIELD;
    @track selectedRecordId;
    @track Status = STATUS_FIELD;
    @track EffectiveDate = EffectiveDate_FIELD;
    @track BillingStreet = BillingStreet_FIELD;
    @track BillingCity=BillingCity_FIELD;
    @track BillingState=BillingState_FIELD;
    @track BillingCountry=BillingCountry_FIELD;
    @track BillingPostalCode=BillingPostalCode_FIELD;
    @track ShippingStreet = ShippingStreet_FIELD;
    @track ShippingCity=ShippingCity_FIELD;
    @track ShippingState=ShippingState_FIELD;
    @track ShippingCountry=ShippingCountry_FIELD;
    @track ShippingPostalCode=ShippingPostalCode_FIELD;
 
    @wire(getObjectInfo, { objectApiName: ORDER_OBJECT })

    orderMetadata;
    @wire(getPicklistValues,
        { recordTypeId: '$orderMetadata.data.defaultRecordTypeId',fieldApiName: STATUS_FIELD})
    statusPicklist;
    rec = {
        AccountId: this.AccountId,
        
        Status: this.Status,
        EffectiveDate: this.EffectiveDate,
    BillingStreet : this.BillingStreet,
        BillingCity: this.BillingCity,
        BillingState: this.BillingState,
      BillingCountry: this.BillingCountry,
        BillingPostalCode: this.BillingPostalCode,
        ShippingStreet : this.ShippingStreet,
        ShippingCity: this.ShippingCity,
        ShippingState: this.ShippingState,
        ShippingCountry: this.ShippingCountry,
        ShippingPostalCode: this.ShippingPostalCode
     
        //ShippingAddress: this.ShippingAddress
    }

    // handleNameChange(event) {
    //   this.rec.AccountId = event.target.value;
    //  console.log("name1", this.rec.AccountId);
    //   }

    handleStatusChange(event) {
        this.value = event.detail.value;
        this.rec.Status = this.value;
        console.log('name2'+this.rec.Status);
    }

    handleDateChange(event) {
        this.rec.EffectiveDate = event.target.value;
        console.log('name3'+this.rec.EffectiveDate);
    }
    handleBillingAddressChange(event) {
        this.rec.BillingStreet=event.target.street;
       this.rec.BillingCity=event.target.city;
       this.rec.BillingState=event.target.province;
        this.rec.BillingCountry=event.target.country;
        this.rec.BillingPostalCode=event.target.postalCode;
        console.log('Street => '+this.rec.BillingStreet);
    console.log('City => '+this.rec.BillingCity);
    console.log('Province => '+this.rec.BillingState);
    console.log('Country => '+this.rec.BillingCountry);
    console.log('postal Code => '+this.rec.BillingPostalCode);
        //console.log("name4"+this.rec.BillingAddress);
    }
    handleShippingAddressChange(event) {
        this.rec.ShippingStreet=event.target.street;
        this.rec.ShippingCity=event.target.city;
        this.rec.ShippingState=event.target.province;
         this.rec.ShippingCountry=event.target.country;
         this.rec.ShippingPostalCode=event.target.postalCode;

        
        console.log('name5'+this.rec.ShippingStreet);
    }
    onAccountSelection(event) {
        this.selectedRecordId = event.detail.selectedRecordId;
       //let accid=this.selectedRecordId;
      
      // this.rec.AccountId = this.selectedRecordId( 1, this.selectedRecordId.length() - 1 );
      // this.rec.AccountId =  StringUtils.removeStart(StringUtils.removeEnd(accid, "]"), "[");
     this.rec.AccountId = this.selectedRecordId;
      
      
     // this.rec.AccountId ='0015g000006Z69VAAS'; 
        console.log('name1'+this.rec.AccountId);

    }

    handleSave() {
        console.log('Inside Save 82');
        console.log('this.rec' +JSON.stringify(this.rec));
        createOrder({ ord: this.rec })
            .then(result => {
                console.log('Inside Save 86');
                this.message = result;
                this.error = undefined;
                if (this.message !== undefined) {
                    this.rec.AccountId = '';
                    this.rec.Status = '';
                    this.rec.EffectiveDate = '';
                    this.rec.BillingCity='';
                    this.rec.BillingCountry='';
                 this.rec.BillingPostalCode='';
                 this.rec.BillingStreet='';
                    this.rec.BillingState='';
                    this.rec.ShippingCity='';
                    this.rec.ShippingCountry='';
                 this.rec.ShippingPostalCode='';
                 this.rec.ShippingStreet='';
                    this.rec.ShippinggState='';
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Success',
                            message: 'Order created',
                            variant: 'success',
                        }),
                    );
                }

                console.log(JSON.stringify(result));
                console.log('result'+this.message);
            })
            .catch(error => {
                console.log('Inside Save 108');
                this.message = undefined;
                this.error = error;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
                console.log('error'+JSON.stringify(this.error));
            });
    }


















  //  @api objectApiName = 'Order';
    //fields = [AccountId_FIELD, STATUS_FIELD, EffectiveDate_FIELD, , ShippingAddress_FIELD];
 //   handleSuccess(event) {
      //  const evt = new ShowToastEvent({
         //   title: "Order created",
          //  message: "Record ID: " + event.detail.id,
           // variant: "success"
       // });
       // this.dispatchEvent(evt);
  //  }
}