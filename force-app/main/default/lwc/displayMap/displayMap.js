import { LightningElement,api,track,wire } from 'lwc';
import getAccountMapDetail from '@salesforce/apex/AccountDetail.getAccount'



export default class DisplayMap extends LightningElement {

@api recordId;
@track mapMarkers;

 dataflag=false;


@wire(getAccountMapDetail,{recordId:'$recordId' })
accountfromwireapex({error,data})
{
console.log("before if condition map");
if(data)
{

console.log('log me'+JSON.stringify(data));
//    this.account=data;
console.log(data.BillingCity);
console.log(data.BillingPostalCode);
this.dataflag=true;

this.mapMarkers=data;
/*
this.mapMarkers.location.City=data.BillingCity;
this.mapMarkers.location.State =data.BillingState;
this.mapMarkers.location.Country=data.BillingCountry;
this.mapMarkers.location.Street=data.BillingStreet;
this.mapMarkers.location.PostalCode=data.BillingPostalCode;
*/

}
else
{
    console.log('log error '+JSON.stringify(error))

}
}

}