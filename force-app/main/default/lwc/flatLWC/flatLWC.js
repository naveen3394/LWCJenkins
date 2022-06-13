import { LightningElement, track, wire } from 'lwc';
import STATUS_FIELD from '@salesforce/schema/Flat__c.Status__c';
import BHK_FIELD from '@salesforce/schema/Flat__c.BHK__c';
import buildingId from '@salesforce/schema/Flat__c.Building__c';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import createFlat from '@salesforce/apex/BuildingController.insertFlat';
import FLAT_OBJECT from '@salesforce/schema/Flat__c';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';



export default class FlatLWC extends LightningElement {

   @track error;

    @wire(getObjectInfo, { objectApiName: FLAT_OBJECT })
    flatMetadata;
    @track selectedRecordId;

    @track getFlatRecord = {
        Status__c: STATUS_FIELD,
        BHK__c: BHK_FIELD,
        Building__c: buildingId

    }


    @wire(getPicklistValues,
        { recordTypeId: '$flatMetadata.data.defaultRecordTypeId', fieldApiName: STATUS_FIELD })
    statusPicklist;
    @wire(getPicklistValues,
        { recordTypeId: '$flatMetadata.data.defaultRecordTypeId', fieldApiName: BHK_FIELD })
    bhkPicklist;


    onBuildingSelection(event) {
        console.log(event.detail);
        console.log(event.detail.selectedRecordId);
        this.selectedRecordId=event.detail.selectedRecordId;
        this.getFlatRecord.Building__c = this.selectedRecordId;
    }

    handleStatusChange(event) {
        console.log('status value is ' + event.detail.value);
        this.getFlatRecord.Status__c = event.detail.value;
    }

    handleBHKChange(event) {
        console.log('bhk value is ' + event.detail.value);
        this.getFlatRecord.BHK__c = event.detail.value;
    }

handleflatSave()
{
   createFlat({ flatObj: this.getFlatRecord })
            .then(result => {
                console.log('Inside Save 86');
                this.message = result;
                this.error = undefined;
                if (this.message !== undefined) {
               this.getFlatRecord.BHK__c='';
               this.getFlatRecord.Status__c='';
               this.getFlatRecord.Building__c='';
               
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Success',
                            message: 'flat created successfully',
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
}