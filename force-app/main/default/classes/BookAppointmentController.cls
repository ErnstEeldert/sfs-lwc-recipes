public with sharing class BookAppointmentController {

    @AuraEnabled(cacheable=true)
    public static List<ServiceAppointment> getServiceAppointmentsForWorkOrder(Id workOrderId) {
        return [
                SELECT
                    Id,
                    AppointmentNumber,
                    ArrivalWindowStartTime,
                    ArrivalWindowEndTime,
                    EarliestStartTime,
                    DueDate,
                    Status,
                    StatusCategory
                FROM ServiceAppointment
                WHERE ParentRecordId = :workOrderId
        ];
    }

    @AuraEnabled(cacheable=false)
    public static List<TimeSlot> getAvailableSlots(String tz, Id serviceAppointmentId) {
        final Boolean EXACT_APPOINTMENT = true;
        final TimeZone TIME_ZONE = TimeZone.getTimeZone(tz);
        
        final Id OPERATING_HOURS_ID = [ SELECT Id FROM OperatingHours ORDER BY Name LIMIT 1 ].Id;
        final Id SCHEDULING_POLICY_ID = [ SELECT Id FROM FSL__Scheduling_Policy__c ORDER BY NAME LIMIT 1 ].Id;
        
        List<TimeSlot> timeSlots = new List<TimeSlot>();
        try {
            List<FSL.AppointmentBookingSlot> slots = new List<FSL.AppointmentBookingSlot>();
            slots = FSL.AppointmentBookingService.getSlots(
                serviceAppointmentId,
                SCHEDULING_POLICY_ID,
                OPERATING_HOURS_ID,
                TIME_ZONE,
                EXACT_APPOINTMENT
            );
            for(FSL.AppointmentBookingSlot slot : slots) {
                timeSlots.add(new TimeSlot(slot.interval.start, slot.interval.finish, slot.grade));
            }
        } catch (Exception e) {
            System.debug('EXCEPTION: ' + e.getMessage());
        }
        // add a few dummy slots for now
        timeSlots.add(new TimeSlot(System.now()+1.02,System.now()+1.04, (Math.random() * 100).round()));
        timeSlots.add(new TimeSlot(System.now()+3.02,System.now()+3.04, (Math.random() * 100).intValue()));
        timeSlots.add(new TimeSlot(System.now()+3.04,System.now()+3.06, (Math.random() * 100).intValue()));
        timeSlots.add(new TimeSlot(System.now()+2,System.now()+2, (Math.random() * 100).intValue()));
        timeSlots.sort();
        return timeSlots;
    }

}
