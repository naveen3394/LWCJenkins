import { getRecord } from 'lightning/uiRecordApi';

import { LightningElement, track,api, wire } from 'lwc';

export default class DisplayAccount extends LightningElement {
@track textUI='';

handleme(event)
{
    console.log(event.target.value);
    this.textUI=event.target.value;
}

handlelabel(event)
{
    console.log(event.target.value);
    this.textUI=event.target.value;
}



}