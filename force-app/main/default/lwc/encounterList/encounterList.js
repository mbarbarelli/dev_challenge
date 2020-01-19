import { NavigationMixin } from 'lightning/navigation';
import { LightningElement, wire, track } from 'lwc';

/** EncounterController.searchEncounters() Apex method */
import searchEncounters from '@salesforce/apex/EncounterController.searchEncounters';
export default class accountList extends NavigationMixin(LightningElement) {

    @track searchTerm = '';
    @wire(searchEncounters, { searchTerm: '$searchTerm' })
    encounters;

    handleSearchTermChange(event) {
        //Debounce
        const searchTerm = event.target.value;
        window.clearTimeout(this.delayTimeout);
        this.delayTimeout = setTimeout(() => {
            this.searchTerm = searchTerm;
        }, 300);
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


