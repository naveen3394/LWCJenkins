import { LightningElement, track } from 'lwc';
import insertBuilding from '@salesforce/apex/BuildingController.insertBuilding';
import buildingName from '@salesforce/schema/Building__c.Name';
import buildingAddress from '@salesforce/schema/Building__c.Building_Address__c';
import buildingCity from '@salesforce/schema/Building__c.City__c';
import buildingLandmark from '@salesforce/schema/Building__c.Landmark__c';
import buildingLift from '@salesforce/schema/Building__c.Lift__c';
import buildingfloors from '@salesforce/schema/Building__c.No_of_floors__c';
import buildingPincode from '@salesforce/schema/Building__c.Pincode__c';
import buildingState from '@salesforce/schema/Building__c.State__c';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class BuildingLWC extends LightningElement {
    //@track accountid;
    @track error;    
    @track getBuildingRecord={
        Name:buildingName,       
        Building_Address__c:buildingAddress,  
		City__c:buildingCity,
		Landmark__c:buildingLandmark,
		Lift__c:buildingLift,
		No_of_floors__c:buildingfloors,
		Pincode__c:buildingPincode,
	    State__c:buildingState
    };   
   
    buildingNameChange(event){
             console.log(event.target.value);

       this.getBuildingRecord.Name = event.target.value;
     }
    buildingAddressChange(event){
             console.log(event.target.value);

       this.getBuildingRecord.Building_Address__c = event.target.value;
     }
    buildingCityChange(event){
       console.log(event.target.value);

       this.getBuildingRecord.City__c = event.target.value;
     }
    buildingLandmarkChange(event){
       console.log(event.target.value);

       this.getBuildingRecord.Landmark__c = event.target.value;
     }
    buildingLiftChange(event){
       console.log(event.target.value);

       this.getBuildingRecord.Lift__c = event.target.value;
       //this.getBuildingRecord.Lift = event.target.checked;
        //checkboxValue = true;
     }
    buildingNooffloorsChange(event){
       console.log(event.target.value);

       this.getBuildingRecord.No_of_floors__c = event.target.value;
     }
    buildingPincodeChange(event){
       console.log(event.target.value);

       this.getBuildingRecord.Pincode__c = event.target.value;
     }
    buildingStateChange(event){
       console.log(event.target.value);

       this.getBuildingRecord.State__c = event.target.value;
     }

    
      saveBuildingAction(){
        window.console.log('before save' + this.getBuildingRecord);
        insertBuilding({buildingObj:this.getBuildingRecord})
        .then(result=>{
         console.log(this.getBuildingRecord);
            const toastEvent = new ShowToastEvent({
              title:'Success!',
              message:'Account created successfully',
              variant:'success'
            });
            this.dispatchEvent(toastEvent);
        })
        .catch(error=>{
           this.error=error.message;
           window.console.log(this.error);
        });
      }   
    
    }