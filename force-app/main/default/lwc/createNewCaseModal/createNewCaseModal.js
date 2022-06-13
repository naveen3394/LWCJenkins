import { LightningElement,api } from 'lwc';
import CASE_OBJECT from '@salesforce/schema/Case';
import STATUS_FIELD from '@salesforce/schema/Case.Status';
//import ACCOUNT_CASE from '@salesforce/schema/Case.Account';
import CASE_ORIGIN from '@salesforce/schema/Case.Origin';


export default class CreateNewCaseModal extends LightningElement {
@api recordId
    caseObject = CASE_OBJECT;
    myFields = [STATUS_FIELD,CASE_ORIGIN];

    handleCaseCreated(){
        // Run code when account is created.
        console.log('now call the Apex method')
        console.log(this.recordId);
        console.log(this.myFields);
        
    }
}