import { NavigationMixin } from 'lightning/navigation';
import { LightningElement, wire, track } from 'lwc';

/** EncounterController.searchEncounters() Apex method */
import searchEncounters from '@salesforce/apex/EncounterController.searchEncounters';
export default class accountList extends NavigationMixin(LightningElement) {
    
    @track searchTerm = '';
    @track invalidSearchTerm = ''; 
    validIdLength = 18;
    @wire(searchEncounters, { searchTerm: '$searchTerm' })
    encounters;    
    
    handleSearchTermChange(event) {
        // Validating searchTerm length and debounce
        const searchTerm = event.target.value; 
        if(searchTerm.length === this.validIdLength || searchTerm.length === 0){
            this.invalidSearchTerm = '';
            window.clearTimeout(this.delayTimeout);          
            this.delayTimeout = setTimeout(() => {
                this.searchTerm = searchTerm;
            }, 300);
        } else {
            this.invalidSearchTerm = searchTerm;
        }
    }

    get invalidSearchTermEntered() {
        return (this.invalidSearchTerm.length > 0);
    }

	handleEncounterView(event) {
		// Get bear record id from bearview event
		const encounterId = event.detail;
		// Navigate to bear record page
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


