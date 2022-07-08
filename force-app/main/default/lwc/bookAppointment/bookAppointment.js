import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

const TEST_SA = '08pB0000000P9VxIAK';

const STEP_SERVICE_APPOINTMENT_SELECTOR = 's1';
const STEP_APPOINTMENT_SLOT_SELECTOR = 's2';
const STEP_APPOINTMENT_BOOKED = 's3';

export default class BookAppointment extends NavigationMixin(LightningElement) {

    @api recordId = '0WOB0000000NRaKOAW';

    slots;
    error;

    currentStep = STEP_SERVICE_APPOINTMENT_SELECTOR;
    selectedSlot;
    selectedServiceAppointment = TEST_SA;
    showConfetti = false;

    get serviceAppointmentSelectorPage() {
        return this.currentStep === STEP_SERVICE_APPOINTMENT_SELECTOR;
    }

    get appointmentSlotSelectorPage() {
        return this.currentStep === STEP_APPOINTMENT_SLOT_SELECTOR;
    }

    get appointmentBookedPage() {
        return this.currentStep === STEP_APPOINTMENT_BOOKED;
    }

    handleAppointmentSelected(event) {
        console.log('appointment selected: ' + event.detail);
        this.selectedServiceAppointment = event.detail;
        this.currentStep = STEP_APPOINTMENT_SLOT_SELECTOR;
    }

    handleSlotSelected(event) {
        console.log('slot selected parent: ' + event.detail);
        this.selectedSlot = event.detail;
        this.currentStep = STEP_APPOINTMENT_BOOKED;
        this.showConfetti = true;
    }

    stopConfetti(event) {
        this.showConfetti = false;
    }

    openServiceAppointment(event) {
        this[NavigationMixin.Navigate]({
            "type": "standard__webPage",
            "attributes": {
                "url": `com.salesforce.fieldservice://v1/sObject/${this.selectedServiceAppointment}/details`
            }
        });
    }

    dismiss(event) {
        this[NavigationMixin.Navigate]({
            "type": "standard__webPage",
            "attributes": {
                "url": `com.salesforce.fieldservice://v1/sObject/${this.recordId}`
            }
        });
    }

}