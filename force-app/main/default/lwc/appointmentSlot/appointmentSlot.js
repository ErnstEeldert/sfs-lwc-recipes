import { LightningElement, api } from 'lwc';

export default class AppointmentSlot extends LightningElement {

    @api appointmentSlot;

    get isIdealGrade() {
        return this.appointmentSlot && this.appointmentSlot.grade && this.appointmentSlot.grade > 80;
    }

    get isRecommendedGrade() {
        return this.appointmentSlot && this.appointmentSlot.grade && this.appointmentSlot.grade < 80 && this.appointmentSlot.grade > 50;
    }

    onSlotSelected(event) {
        console.log(`slot selected: ${this.appointmentSlot.uuid}`);
        const selectedEvent = new CustomEvent("slotselected", {
            detail: {
                start: this.appointmentSlot.start,
                finish: this.appointmentSlot.finish
            },
            bubbles: true,
            composed: true
          });
          console.log(selectedEvent);
          // Dispatches the event.
          this.dispatchEvent(selectedEvent);
    }

}