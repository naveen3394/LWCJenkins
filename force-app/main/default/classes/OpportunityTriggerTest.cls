@isTest
public class OpportunityTriggerTest {
    
    @testSetup
    public static void testSetupMethod(){
        Account testAccount = TestUtility.createCustomerAccount('TestAccount');
        TestUtility.createOpportunity(testAccount.Id, 'Test Opportunity', 1); 
    }
    
    @isTest
    public static void testforLeadInsert(){
        Opportunity testOpportunity = [SELECT Id, Name FROM Opportunity LIMIT 1];
        List<Timeline__c> timeLineList = [SELECT Id FROM Timeline__c WHERE Opportunity__c = :testOpportunity.Id];
        System.assertEquals(1, timeLineList.size(), 'TimeLine exists');
    }    
    
    @isTest
    public static void testforLeadUpdate(){
        Opportunity testOpportunity = [SELECT Id, Name FROM Opportunity LIMIT 1];
        testOpportunity.StageName = 'Need Analysis';
        update testOpportunity;
        
        List<Timeline__c> timeLineList = [SELECT Id FROM Timeline__c WHERE Opportunity__c = :testOpportunity.Id];
        System.assertEquals(2, timeLineList.size(), 'TimeLine exists');
    }
}