public with sharing class EncounterController {

    @AuraEnabled(Cacheable=true)
    public static Encounter__c[] getAllEncounters(){
        return [select Id, HealthSystemMember__r.Name, Account_Number__c, Admission_Date__c, Account_Balance__c, Patient_Type__c from Encounter__c];
    }

    @AuraEnabled(Cacheable=true)
    public static Encounter__c[] searchEncounters(String searchTerm){       
        searchTerm = searchTerm.trim();
        if(searchTerm == ''){
            return getAllEncounters();
        }        
        searchTerm = '%' + searchTerm + '%'; 
        return [select Id, HealthSystemMember__r.Name, Account_Number__c, Admission_Date__c, Account_Balance__c, 
                Patient_Type__c from Encounter__c where HealthSystemMember__r.Name  LIKE :searchTerm ORDER BY HealthSystemMember__r.Name ASC];
    }
}
