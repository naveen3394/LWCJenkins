import { LightningElement,api,track ,wire} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import CASE_OBJECT from '@salesforce/schema/Case';
import STATUS_FIELD from '@salesforce/schema/Case.Status';
import CASE_ORIGIN from '@salesforce/schema/Case.Origin';
import { getOriginPicklistValues,getStatusPicklistValues , getObjectInfo } from 'lightning/uiObjectInfoApi';

export default class CreateCase extends  NavigationMixin(LightningElement) {
    @api recordId;
@track case;
@track originPickListvalues;
@track statusPickListvalues;
    @track openModal = false;
    showModal() {
        this.openModal = true;
    }    
    closeModal() {
        this.openModal = false;
    }

    @wire (getObjectInfo, {objectApiName: OpptyLiObject})
    objectInfo;

    @wire(getOriginPicklistValues, {
        recordTypeId : '$objectInfo.data.defaultRecordTypeId',
        fieldApiName : CASE_OBJECT
    })
        wiredOriginPickListValue({ data, error }){
            if(data){
                console.log(` Picklist values origin`, data.values);
                this.originPickListvalues = data.values;
                this.error = undefined;
            }
            if(error){
                console.log(` Error while fetching Picklist values  ${error}`);
                this.error = error;
                this.originPickListvalues = undefined;
            }
        }
    @wire(getStatusPicklistValues, {
        recordTypeId : '$objectInfo.data.defaultRecordTypeId',
        objectApiName : CASE_OBJECT
    })
    wiredStatusPickListValue({data, error}){
            if(data){
                console.log(' Picklist Values status ', data.values);
                this.statusPickListvalues = data.values;
            }
            if(error){
                console.log(error);
            }
        }
    @wire(getObjectInfo,{
        objectApiName : CASE_OBJECT
    })
        wiredObject({data, error}){
            if(data){
                console.log(' Object iformation ', data);
                console.table(data);
            }
            if(error){
                console.log(error);
            }
        }

        handleChange(){
            
        }









   /*
    handleNavigate() {
        console.log('inside navigate method');
        var compDefinition = {
            componentDef: "c:createNewCaseModal",
            attributes: {
                recordId: this.recordId
            }
        };
        // Base64 encode the compDefinition JS object
        var encodedCompDef = btoa(JSON.stringify(compDefinition));
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: '/one/one.app#' + encodedCompDef
            }
        });
        */
    
}