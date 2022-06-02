import { LightningElement, api, track, wire } from 'lwc';
import getServiceAppointmentsForWorkOrder from '@salesforce/apex/BookAppointmentController.getServiceAppointmentsForWorkOrder';

export default class ServiceAppointmentSelectorPage extends LightningElement {

    @api workOrderId = '0WOB0000000NRaKOAW';
    serviceAppointments = [];
    error;

    @track
    isLoading = true;

    @wire(getServiceAppointmentsForWorkOrder, { workOrderId: '$workOrderId' })
    callback({ error, data }) {
        this.isLoading = false;
        console.log(JSON.stringify(data));
        if (data) {
            this.serviceAppointments = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.serviceAppointments = [{"Status":"Dispatched","Id":"08pB0000000V30HIAS","StatusCategory":"Dispatched","DueDate":"2021-07-31T10:00:00.000Z","AppointmentNumber":"SA-0002","EarliestStartTime":"2020-08-01T10:00:00.000Z"},{"Status":"Dispatched","Id":"08pB0000000cr7NIAQ","StatusCategory":"Dispatched","DueDate":"2020-06-30T10:00:00.000Z","AppointmentNumber":"SA-0001","EarliestStartTime":"2020-06-01T10:00:00.000Z"},{"Status":"None","Id":"08pB0000000P9VxIAK","StatusCategory":"None","DueDate":"2022-07-31T10:00:00.000Z","AppointmentNumber":"SA-0018","EarliestStartTime":"2022-05-01T10:00:00.000Z"}];
        }
    }

    connectedCallback() {
        console.log(`work order: ${this.workOrderId}`);
    }

    handleSelect(event) {
        const selectedEvent = new CustomEvent("appointmentselected", {
            detail: event.target.dataset.id
        });
        this.dispatchEvent(selectedEvent);
    }

}