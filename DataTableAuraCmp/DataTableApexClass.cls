public with sharing class DataTableApexClass {

    @AuraEnabled
    public static List<ImageResponse> getImageRecords() {
        try {
            HttpRequest httpRequest = new HttpRequest();
            httpRequest.setMethod('GET');
            httpRequest.setEndpoint('callout:ImagesEndpoint');
            Http http = new Http();
            HttpResponse httpResponse = http.send(httpRequest);
            return (List<ImageResponse>) JSON.deserialize(httpResponse.getBody(), List<ImageResponse>.class);
        } catch (Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
        
        
    }

 
    public class ImageResponse {
        @AuraEnabled
        public Integer Id{get;set;}
        @AuraEnabled        
        public String creditorName{get;set;}
        @AuraEnabled       
        public String firstName{get;set;}
        @AuraEnabled       
        public String lastName{get;set;}
        @AuraEnabled 
        public double minPaymentPercentage{get;set;}
        @AuraEnabled
        public String balance{get;set;}
        @AuraEnabled
        public String totalbalance{get;set;}


    }
}