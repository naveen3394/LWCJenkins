@isTest
public class LeadTriggerTest {
    
    @testSetup
    public static void testSetupMethod(){
        Lead objLead = new Lead( FirstName = 'Test', LastName = 'Sample', Company = 'Testing Sample Co' );  
        insert objLead; 
    }
    
    @isTest
    public static void testforLeadInsert(){
        lead testlead = [SELECT Id, Name FROM Lead LIMIT 1];
        List<Timeline__c> timeLineList = [SELECT Id FROM Timeline__c WHERE lead__c = :testlead.Id];
        System.assertEquals(1, timeLineList.size(), 'Timeline Exists');
    }    
    
    @isTest
    public static void testforLeadUpdate(){
        lead testlead = [SELECT Id, Name FROM Lead LIMIT 1];
       	testlead.Status = 'Working - Contacted';
        update testlead;
        
        List<Timeline__c> timeLineList = [SELECT Id FROM Timeline__c WHERE lead__c = :testlead.Id];
        System.assertEquals(2, timeLineList.size(), 'Timeline Exists');
    }
}