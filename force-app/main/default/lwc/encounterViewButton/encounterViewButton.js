import { LightningElement, api} from 'lwc';

export default class EncounterViewButton extends LightningElement {
    @api encounter; 
    @api accountNumber;
    handleOpenRecordClick() {
        const selectEvent = new CustomEvent('encounterview', {
            detail: this.encounter.Id
        });
        this.dispatchEvent(selectEvent);
    }    
}