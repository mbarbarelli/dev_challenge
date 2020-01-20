public with sharing class EncounterController {
    @AuraEnabled(Cacheable=true)
    public static List<Encounter__c> getAllEncounters(Id HealthCareMemberId){
        return [select Id, Account_Number__c, Admission_Date__c, Account_Balance__c, Patient_Type__c from Encounter__c where Id = :HealthCareMemberId];
    }
}