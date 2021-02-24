public class sFtest{
    @AuraEnabled(cacheable=true)
    public static list<JsonClass> JsonFromURL(){
        HttpRequest req = new HttpRequest();
        string endPoint = 'https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json';
        req.setEndpoint(endPoint);
        req.setMethod('GET');
        Http http = new Http();
        HTTPResponse res = http.send(req);
        string response = res.getBody();
        list<JsonClass> jcList = (list<JsonClass>)JSON.deserialize(response, list<JsonClass>.class);
        system.debug(jcList);
        return jcList;
    }
    public class JsonClass{
        @AuraEnabled
        public string id;
        @AuraEnabled
        public string creditorName;
        @AuraEnabled
        public string firstName;
        @AuraEnabled
        public string lastName;
        @AuraEnabled
        public decimal minPaymentPercentage;
        @AuraEnabled
        public decimal balance;
    }
    
}