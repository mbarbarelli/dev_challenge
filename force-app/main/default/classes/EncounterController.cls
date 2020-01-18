public with sharing class EncounterController {
    @AuraEnabled(Cacheable=true)
    public static Encounter__c[] getAllEncounters(){
        return [select Id, HealthSystemMember__c, Account_Number__c, Admission_Date__c, Account_Balance__c, Patient_Type__c from Encounter__c];
    }

    @AuraEnabled(Cacheable=true)
    public static Encounter__c[] searchEncounters(String searchTerm){       
        if(searchTerm == ''){
            return getAllEncounters();
        }        
        Id HealthSystemMemberId = Id.valueOf(searchTerm);
        return [select Id, HealthSystemMember__c, Account_Number__c, Admission_Date__c, Account_Balance__c, 
                Patient_Type__c from Encounter__c where HealthSystemMember__c = :HealthSystemMemberId];
    }
}
