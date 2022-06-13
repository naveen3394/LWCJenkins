import { getRecord } from 'lightning/uiRecordApi';
import { LightningElement, wire ,api,track} from 'lwc';
import getAccountDetail from '@salesforce/apex/AccountDetail.getAccountDetail'

const FIELDS = [
    'Account.Name',
    'Account.Website',
    'Account.Phone',
    'Account.Type',
];
export default class DisplayAcoountDetails extends LightningElement {
/*@api recordId;
@wire(getRecord,{recordId:'$recordId',fields:FIELDS })
account;
get name(){
    return this.account.data.fields.Name.value;
   }
*/
@api recordId;
@track account;

@wire(getAccountDetail,{recordId:'$recordId' })
accountfromwireapex({error,data})
{
    if(data)
{
    this.account=data;
    console.log('log me'+JSON.stringify(data))
}
}


}