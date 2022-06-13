/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 04-14-2021
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
 * Modifications Log 
 * Ver   Date         Author                               Modification
 * 1.0   04-11-2021   ChangeMeIn@UserSettingsUnder.SFDoc   Initial Version
 **/
 import {LightningElement,track,wire,api} from 'lwc';
import getOrderList from '@salesforce/apex/OrderDataService.getOrderList'
import {
	ShowToastEvent
} from 'lightning/platformShowToastEvent';
import {
	NavigationMixin
} from 'lightning/navigation';


const columns = [{
		label: 'Order No.',
		fieldName: 'OrderNumber'
	},
	{
		label: 'Account Name',
		fieldName: 'AccountName'
	},
	{
		label: 'Order Start Date',
		fieldName: 'EffectiveDate',
		type: 'Date'
	},
	{
		label: 'Items In Cart',
		fieldName: 'Items_In_Cart__c',
		type: 'Double'
	},
	{
		label: 'Order Amount',
		fieldName: 'TotalAmount',
		type: 'Currency'
	},
];

export default class ShowAllOrders extends NavigationMixin(LightningElement) {
	@track data = [];
	columns = columns;
	@track isModalOpen = false;
	@track orderListData;
	@track errorMsg;
    @api openorderid;
    @api prodorderId;


	showOptionsHomePage=true;
//	openOrderId;
	controlButton = true;
	showExistingOrders = false;
    showDetailorder=false;
    showCreateNewOrder=false;


	@wire(getOrderList) orderListFromWire({
		error,
		data
	}) {
		if (data) {
			console.log('log me ' + JSON.stringify(data))
			//this.orderListData = data;
			let d = [];
			data.forEach(element => {
				let elt = {};
				elt.AccountName = element.Account.Name;
				elt.OrderNumber = element.OrderNumber;
				elt.EffectiveDate = element.EffectiveDate;
				elt.Items_In_Cart__c = element.Items_In_Cart__c;
				elt.TotalAmount = element.TotalAmount;
				elt.orderId = element.Id;

				d.push(elt);
			});


			this.orderListData = d;

			console.log('this.orderListData ' + JSON.stringify(this.orderListData));
		} else {
			console.log('log error ' + JSON.stringify(error))
			this.errorMsg = 'No Draft Orders Found';
		}
	}

	createNewOrder() {
        this.showCreateNewOrder=true;
this.showExistingOrders=false;
	}

	openOrderList() {
		this.showExistingOrders = true;
        this.showCreateNewOrder=false;
	}
	handleRowSelection(event) {
		var selectedRows = event.detail.selectedRows;
		console.log('before if' + selectedRows.length);

		if (selectedRows.length == 0) {
			this.controlButton = true;
            return;
		} else if (selectedRows.length > 0 && selectedRows.length < 2) {

			this.controlButton = false;

			for (var i = 0; i < selectedRows.length; i++) {
				console.log(" in if You selected: " + selectedRows[i].orderId);
				this.openorderid = selectedRows[i].orderId;
				this.prodorderId=selectedRows[i].orderId;
			//	this.orderId=selectedRows[i].OrderNumber;
			}
            return;
		} else if (selectedRows.length > 1) {
			this.controlButton = false;

			var regex = /\d+/g;

			var el = this.template.querySelector('lightning-datatable');
			selectedRows = el.selectedRows = el.selectedRows.slice(1);
			var rowno = JSON.stringify(selectedRows).match(regex);
			var selectedRows2 = event.detail.selectedRows;

			console.log(selectedRows2[rowno].orderId);
			this.openorderid = selectedRows2[rowno].orderId;
			this.prodorderId=selectedRows2[rowno].orderId;
			//this.showNotification();
			//this.orderno=selectedRows2[rowno].OrderNumber;

			event.preventDefault();

			return;
		}
        else
        {
            console.log('some error occured');
            return;
        }
	}
	// showNotification() {
	//     const event = new ShowToastEvent({
	//         title: 'Error',
	//         message: 'Only one row can be selected',
	//         variant: 'warning',
	//         mode: 'pester'
	//     });
	//     this.dispatchEvent(event);
	// }

	openSelectedOrder() {
        this.showOptionsHomePage=false;
        this.showCreateNewOrder=false;
        this.showDetailorder=true;
		this.showExistingOrders=false;
		console.log('inside open order');

		// this[NavigationMixin.Navigate]({
		// 	type: 'standard__recordPage',
		// 	attributes: {
		// 		recordId: this.openOrderId,
		// 		objectApiName: 'Order',
		// 		actionName: 'view'
		// 	}
		// });


	}


   

}
/* 

*/