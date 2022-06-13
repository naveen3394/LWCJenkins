import { LightningElement, wire } from 'lwc';
import { getListUi } from 'lightning/uiListApi';

import BUILDING_OBJECT from '@salesforce/schema/Building__c';
import NAME_FIELD from '@salesforce/schema/Building__c.Name';

export default class CustomContactListView extends LightningElement {
    pageToken = null;
    nextPageToken = null;
    previousPageToken = null;
    records;
    error;

    @wire(getListUi, {
        objectApiName: BUILDING_OBJECT,
        listViewApiName: 'All',
        sortBy: NAME_FIELD,
        pageSize: 10,
        pageToken: '$pageToken'
    })listView({ error, data }) {
        if (data) {
            this.records = data.records.records;
            this.error = undefined;
            this.nextPageToken = data.records.nextPageToken;
            this.previousPageToken = data.records.previousPageToken;
        } else if (error) {
            this.error = error;
            this.records = undefined;
        }
    }

    handleNextPage(e) {
        this.pageToken = this.nextPageToken;
    }

    handlePreviousPage(e) {
        this.pageToken = this.previousPageToken;
    }
}