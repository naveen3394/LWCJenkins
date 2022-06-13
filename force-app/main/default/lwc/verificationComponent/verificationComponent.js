//import { getRecord } from 'lightning/uiRecordApi';
import { LightningElement, wire ,api,track} from 'lwc';
import getAccountVerificationDetail from '@salesforce/apex/AccountDetail.getAccountVerificationDetail'
import { NavigationMixin } from 'lightning/navigation';

const FIELDS = [
'Account.Name',
'Account.AccountNumber',
'Account.SLASerialNumber__c'
];
export default class VerificationComponent extends NavigationMixin(LightningElement){
@api recordId;
@track account;
showme=false;
@api accName='';
@api accNumber='';
@api accountSLANumber='';

accName1(event){
this.accName=event.target.value;
console.log(this.accName);
}
accNumber1(event)
{
this.accNumber=event.target.value;
console.log(this.accNumber);

}
accountSLANumber1(event){
this.accountSLANumber= event.target.value;
console.log(this.accountSLANumber);

}

handleSearch() {
    console.log('inside method');
    this.showme=true;
    console.log(this.accountSLANumber);
    console.log(this.accNumber);
    console.log(this.accName);
    
    
    getAccountVerificationDetail({ recordId:'$recordId',accName: this.accName,accNumber:this.accNumber, accountSLANumber: this.accountSLANumber })
        .then((result) => {
            console.log('result'+result);
            this.account = result;
            this.error = undefined;
        })
        .catch((error) => {
            console.log('error'+error);
            this.error = error;
            this.account = undefined;
        });
}
/*
@wire(getAccountVerificationDetail,{recordId:'$recordId',accName:'$accName',accNumber:'$accNumber',accountSLAnumber:'$accountSLAnumber' })
accountfromwireapex({error,data})
{
if(data)
{
this.showme=true;
this.account=data;
console.log('log me'+JSON.stringify(data))
}

}
*/

handleClick()
{
    console.log('inside handle click');
    console.log('this.account.Id'+this.account.Id);
    
    this[NavigationMixin.Navigate]({
        type: 'standard__recordPage',
        attributes: {
            recordId: this.account.Id,
            objectApiName: 'Account',
            actionName: 'view'
        }
    });

   
}
}