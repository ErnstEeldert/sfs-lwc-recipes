import { LightningElement } from 'lwc';
import getRecentWorkOrders from '@salesforce/apex/ImperativeApexController.getRecentWorkOrders';

export default class ImperativeApex extends LightningElement {

    workOrders;
    error;

    connectedCallback() {
        this.doLoad();
    }

    doLoad() {
        console.log('loading data through imperative APEX');
        getRecentWorkOrders()
        .then(result => {
            this.workOrders = result;
            this.error = undefined;
        })
        .catch(error => {
            this.workOrders = undefined;
            this.error = JSON.stringify(error);
        });
    }

}