import { LightningElement, track , wire} from 'lwc';
import getAllData from '@salesforce/apex/sFtest.JsonFromURL';
const COLUMNS = [
    { label: 'id', fieldName: 'id'},
    { label: 'Creditor Name', fieldName: 'creditorName', type: 'text' },
    { label: 'First Name', fieldName: 'firstName', type: 'text' },
    { label: 'Last Name', fieldName: 'lastName', type: 'text' },
    { label: 'Payment Percentage', fieldName: 'minPaymentPercentage', type: 'decimal' },
    { label: 'Balance', fieldName: 'balance', type: 'decimal' }
];
export default class sFtest extends LightningElement {
    
    @track dataList;
    @track totalCount = 0;
    @track selectedCount = 0;
    @track amountSelected = 0;
    @wire(getAllData)
    wireddata(result){
        //if(result.data){
        this.dataList = result;//.data;
        if(result.data){
            //alert(result.data.length);
            this.totalCount = result.data.length;
        }
    }

    handleChange(event) {
        this.selectedCount = 0;
        this.amountSelected = 0;
        console.log(event.target.checked);
        console.log(event.target.value);
        let checkboxes = this.template.querySelectorAll('[data-id="checkbox"]')      
        for(var i=0; i<checkboxes.length; i++) {
            if(checkboxes[i].checked){
                this.selectedCount = this.selectedCount + 1;
                this.amountSelected = this.amountSelected + this.dataList.data[i].balance;
            }
        }
       // console.log(event.target.data-id);
    }
    handleChangeforAll(event){
        console.log(event.target.checked);
        let checkboxes = this.template.querySelectorAll('[data-id="checkbox"]')      
        for(var i=0; i<checkboxes.length; i++) {
            checkboxes[i].checked = event.target.checked;
        }
        //console.log('@@-->',);
        this.amountSelected = 0;
        if(event.target.checked){
            //alert(checkboxes.length);
            for(var i=0; i<this.dataList.data.length; i++) {
                this.amountSelected = this.amountSelected + this.dataList.data[i].balance;
            } 
            this.selectedCount = checkboxes.length;       
        }else{
            this.amountSelected = 0;
            this.selectedCount = 0;
        }
    }
    AddInRow(event){
        console.log(this.dataList.data);
        console.log(this.dataList.data[1]);
        var newRec = {'id':'1','creditorName':'New Bank'};
        /*newRec.id=12;
        newRec.creditorName = 'New creditor';
        newRec.firstName = 'New First Name';
        newRec.LastName = 'New Last Name';
        newRec.minPaymentPercentage = 5;
        newRec.balance = 50;
        console.log('new Rec--->', newRec);*/
        console.log('new Rec--->', newRec);
        this.dataList.data.push(newRec);
    }
}