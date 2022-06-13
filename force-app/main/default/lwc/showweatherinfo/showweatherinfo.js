import { LightningElement,api,track,wire } from 'lwc';
import getAccountMapDetail from '@salesforce/apex/AccountDetail.getAccount'
import weatherdata from '@salesforce/apex/WeatherControlller.performCallout'

export default class Showweatherinfo extends LightningElement {
    @api recordId;
    @api cityName='';
    @track weatherdata;
    @track account;
     dataflag=false;
    @wire(getAccountMapDetail,{recordId:'$recordId' })
    accountfromwireapex({error,data})
    {
    console.log("before if condition map");
    if(data)
    {
    console.log('log me'+JSON.stringify(data));
    this.account=data;
    }
}
@wire(weatherdata,{cityName:'Pune'})
accountfromwireapex({error,data})
{
if(data)
{
console.log('log me'+JSON.stringify(data));
this.weatherdata=data;
}
}

}