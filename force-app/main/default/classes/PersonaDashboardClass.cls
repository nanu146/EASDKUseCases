public with sharing class PersonaDashboardClass {
    
    @AuraEnabled
    public static User getUserDetails(){
        User u = [select id,Name from User where id =: userInfo.getUserId()];
        return u; 
    }

    @AuraEnabled
    public static PersonaDashboardObject__c[] getPersonaDashboards(){
        PersonaDashboardObject__c[] objs = [select DashboardId__c,UserId__c from PersonaDashboardObject__c where UserId__c =: userInfo.getUserId()];
        return objs;
    }




}
