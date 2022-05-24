public with sharing class ImperativeApexController {

    @AuraEnabled(cacheable=true)
    public static List<WorkOrder> getRecentWorkOrders() {
        return [
            SELECT
                Id,
                WorkOrderNumber,
                Status,
                Subject
            FROM
                WorkOrder
            WITH SECURITY_ENFORCED
            ORDER BY CreatedDate DESC
            LIMIT 10
        ];
    }

}
