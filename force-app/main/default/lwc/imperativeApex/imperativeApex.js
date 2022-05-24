import { LightningElement, track } from 'lwc';
import getRecentWorkOrders from '@salesforce/apex/ImperativeApexController.getRecentWorkOrders';

export default class ImperativeApex extends LightningElement {

    @track workOrders;
    @track error;

    connectedCallback() {
        this.doLoad();
    }

    doLoad() {
        this.workOrders = [];
        this.error = null;
        console.log('loading data through imperative APEX');
        getRecentWorkOrders()
        .then(result => {
            this.workOrders = result;
        })
        .catch(error => {
            this.error = JSON.stringify(error);
        });
    }

}