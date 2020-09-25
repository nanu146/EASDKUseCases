public with sharing class PersonaDashboardClass {
    
    @AuraEnabled
    public static User getUserDetails(){
        User u = [select id, Name, UserRoleId from User where id =: userInfo.getUserId()];
        return u; 
    }

    @AuraEnabled
    public static PersonaDashboardObject__c[] getPersonaDashboards(){
        User u = [select id, Name, UserRoleId from User where id =: userInfo.getUserId()];

        PersonaDashboardObject__c[] objs = [select DashboardId__c,UserId__c from PersonaDashboardObject__c where UserId__c =: u.UserRoleId];
        return objs;
    }




}
