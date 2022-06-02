@isTest
private class BookAppointmentControllerTest {
    @isTest static void testGetServiceAppointmentsForWorkOrder() {
        WorkOrder wo = createWorkOrder();
        ServiceAppointment sa = createServiceAppointment(wo.Id);
        List<ServiceAppointment> result = BookAppointmentController.getServiceAppointmentsForWorkOrder(wo.Id);
        System.assertEquals(1, result.size(), 'Yikes!');
    }

    @isTest(SeeAllData=true) static void testGetAvailableSlots() {
        WorkOrder wo = createWorkOrder();
        ServiceAppointment sa = createServiceAppointment(wo.Id);
         List<TimeSlot> result = BookAppointmentController.getAvailableSlots(UserInfo.getTimeZone().toString(), sa.Id);
        System.assert(result.size() > 0, 'Slots expected, none found!');
    }

    static private WorkOrder createWorkOrder() {
        WorkOrder wo = new WorkOrder();
        insert wo;
        return wo;
    }

    static private ServiceAppointment createServiceAppointment(Id workOrderId) {
        ServiceAppointment sa = new ServiceAppointment();
        sa.ParentRecordId = workOrderId;
        insert sa;
        return sa;
    }
}