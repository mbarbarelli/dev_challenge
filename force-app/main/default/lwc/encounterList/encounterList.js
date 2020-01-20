import { NavigationMixin } from 'lightning/navigation';
import { LightningElement, api, wire, track } from 'lwc';
import getAllEncounters from '@salesforce/apex/EncounterController.getAllEncounters';

export default class encounterList extends NavigationMixin(LightningElement) {
    @track columns = [{
        label: 'Account Number',
        fieldName: 'Account_Number__c',
        type: 'text',
        sortable: false
    },
    {
        label: 'Admission Date',
        fieldName: 'Admission_Date__c',
        type: 'date',
        sortable: true
    },    
    {
        label: 'Account Balance',
        fieldName: 'Account_Balance__c',
        type: 'currency',
        sortable: true
    },
    {
        label: 'Patient Type',
        fieldName: 'Patient_Type__c',
        type: 'text',
        sortable: true
    }];    
    @api recordId;
    @track data;
    @track error;    
    @wire(getAllEncounters, { HealthCareMemberId: '$recordId' })
    encounters({ error, data }) {
        if (data) {
            window.console.log(this.recordId);
            window.console.log(data.data);
            this.data = data;
        } else if (error) {
            window.console.log(error);
            window.console.log(this.recordId);
            this.error = error;
        }
    }

    handleEncounterView(event) {
        const encounterId = event.detail;
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: encounterId,
                objectApiName: 'Encounter__c',
                actionName: 'view',
            },
        });
    }    
}


