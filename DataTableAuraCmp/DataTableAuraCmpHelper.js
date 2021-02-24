({
    setupDataTable: function (component) {
        component.set('v.columns', [
            {label: 'Id', fieldName: 'Id', type: 'Number'},                        
            {label: 'Creditor Name', fieldName: 'creditorName', type: 'text'},
            {label: 'First Name', fieldName: 'firstName',  type: 'text', wrapText: true},
            {label: 'Last Name', fieldName: 'lastName',  type: 'text'},
            {label: 'Min Pay %', fieldName: 'minPaymentPercentage',  type: 'double'},
            {label: 'Balance', fieldName: 'balance',  type: 'currency'}
        ]);
    },
 
    getData: function (component) {
        return this.callAction(component)
            .then(
                $A.getCallback(imageRecords => {
                    component.set('v.allData', imageRecords);
                    component.set('v.filteredData', imageRecords);
                    this.preparePagination(component, imageRecords);
                })
            )
    },
    callAction: function (component) {
        component.set("v.isLoading", true);
        return new Promise(
            $A.getCallback((resolve, reject) => {
                const action = component.get("c.getImageRecords");
                action.setCallback(this, response => {
                    component.set("v.isLoading", false);
                    const state = response.getState();
                    if (state === "SUCCESS") {
                        return resolve(response.getReturnValue());
                    } else if (state === "ERROR") {
                        return reject(response.getError());
                    }
                    return null;
                });
                $A.enqueueAction(action);
            })
        );
    },
 
    preparePagination: function (component, imagesRecords) {
        let countTotalPage = Math.ceil(imagesRecords.length/component.get("v.pageSize"));
        let totalPage = countTotalPage > 0 ? countTotalPage : 1;
        component.set("v.totalPages", totalPage);
        component.set("v.currentPageNumber", 1);
        this.setPageDataAsPerPagination(component);
    },
 
    setPageDataAsPerPagination: function(component) {
        let data = [];
        let pageNumber = component.get("v.currentPageNumber");
       let pageSize = component.get("v.pageSize");
        let filteredData = component.get('v.filteredData');
        let x = (pageNumber - 1) * pageSize;
        for (; x < (pageNumber) * pageSize; x++){
            if (filteredData[x]) {
                data.push(filteredData[x]);
            }
        }
        component.set("v.tableData", data);
    },
        


})