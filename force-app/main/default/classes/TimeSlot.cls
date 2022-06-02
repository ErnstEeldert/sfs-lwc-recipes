public class TimeSlot implements Comparable {
    public TimeSlot(Datetime start, Datetime finish, Decimal grade) {
        this.start = start;
        this.finish = finish;
        this.grade = grade;
        this.uuid = EncodingUtil.convertToHex(
            Crypto.generateDigest('MD5', Blob.valueOf(Crypto.getRandomLong().format()))
        );
        this.startDate = Date.newinstance(start.year(), start.month(), start.day());
    }

    @AuraEnabled public Datetime start {get;set;}
    @AuraEnabled public Datetime finish {get;set;}
    @AuraEnabled public Date startDate {get;set;}
    @AuraEnabled public Decimal grade {get;set;}
    @AuraEnabled public String uuid {get;set;}

    public Integer compareTo(Object compareTo) {
        TimeSlot compareToTimeSlot = (TimeSlot)compareTo;
        Integer returnValue = 0;
        if (start > compareToTimeSlot.start) {
            returnValue = 1;
        } else if (start < compareToTimeSlot.start) {
            returnValue = -1;
        }        
        return returnValue;       
    }
}
