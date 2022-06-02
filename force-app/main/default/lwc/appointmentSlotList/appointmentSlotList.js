import { LightningElement, api } from 'lwc';
import getAvailableSlots from '@salesforce/apex/BookAppointmentController.getAvailableSlots';

const TIME_ZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;

export default class AppointmentSlotList extends LightningElement {

    @api serviceAppointmentId;
    appointmentSlots;

    // TODO: provide reasonable fallback value
    get tz() {
        return TIME_ZONE ? TIME_ZONE : 'Unable to determine timezone!';
    }

    invokeGetAvailableSlots() {
        getAvailableSlots({'tz': this.tz, 'serviceAppointmentId': this.serviceAppointmentId }).then(data => {
            // create map to hold slots by date
            const prop = 'startDate';
            const map = new Map(Array.from(data, obj => [obj[prop], []]));
            // populate map with slots
            data.forEach(obj => map.get(obj[prop]).push(obj));
            this.appointmentSlots = Array.from(map, ([startDate, slots]) => ({ value: startDate, slots }));
            console.log('appointmentSlots');
            console.log(JSON.stringify(this.appointmentSlots));
        })
        .catch(error => {
            console.error('got error');
            console.error(error);
            this.appointmentSlots = JSON.parse('[{"value":"2022-06-01","slots":[{"finish":"2022-06-01T15:43:12.684Z","grade":37,"start":"2022-06-01T15:14:24.684Z","startDate":"2022-06-01","uuid":"78d815ace95f0ab1326f2853eda2071c"}]},{"value":"2022-06-02","slots":[{"finish":"2022-06-02T14:45:36.686Z","grade":61,"start":"2022-06-02T14:45:36.686Z","startDate":"2022-06-02","uuid":"cef8c49eb8e765cd26fef0a1fdd00b78"}]},{"value":"2022-06-03","slots":[{"finish":"2022-06-03T15:43:12.685Z","grade":36,"start":"2022-06-03T15:14:24.685Z","startDate":"2022-06-03","uuid":"bfd4e8200e29f8ababef9521dc2b4333"},{"finish":"2022-06-03T16:12:00.685Z","grade":80,"start":"2022-06-03T15:43:12.685Z","startDate":"2022-06-03","uuid":"deb965ad1b0eb10fc1725917e5453f53"}]},{"value":"2022-06-06","slots":[{"finish":"2022-06-06T09:00:00.000Z","grade":"72.7272727272727272727272727272727","start":"2022-06-06T09:00:00.000Z","startDate":"2022-06-06","uuid":"d8216d59079658e7341255b83933a4d9"}]}]');
            this.error = null;
        })
    }

    connectedCallback() {
        this.invokeGetAvailableSlots();
    }

}