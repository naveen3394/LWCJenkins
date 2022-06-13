@isTest
public class CaseTriggerTest {
    @testSetup
    public static void testSetupMethod(){
        Account testAccount = TestUtility.createCustomerAccount('TestAccount');
        TestUtility.createCase(testAccount.Id); 
    }
    
    @isTest
    public static void testforLeadInsert(){
        Case testCase = [SELECT Id FROM Case LIMIT 1];
        List<Timeline__c> timeLineList = [SELECT Id FROM Timeline__c WHERE Case__c = :testCase.Id];
        System.assertEquals(1, timeLineList.size(), 'Timeline Exists');
    }    
    
    @isTest
    public static void testforLeadUpdate(){
        Case testCase = [SELECT Id FROM Case LIMIT 1];
        testCase.Status = 'Working';
        update testCase;
        
        List<Timeline__c> timeLineList = [SELECT Id FROM Timeline__c WHERE Case__c = :testCase.Id];
        System.assertEquals(2, timeLineList.size(), 'Timeline Exists');
    }
}