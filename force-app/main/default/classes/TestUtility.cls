/**
* @description       : 
* @author            : RISHAB GOYAL
* @group             : 
* @last modified on  : 02-02-2021
* @last modified by  : RISHAB GOYAL
* Modifications Log 
* Ver   Date         Author         Modification
* 1.0   02-02-2021   RISHAB GOYAL   Initial Version
**/
public class TestUtility {
    
    public static ContentDocumentLink createContentVersion(String title, Id LinkedEntityId){
        
        ContentVersion cv = new ContentVersion();
        cv.title = title;      
        cv.PathOnClient = 'TestDocument.pdf';
        cv.VersionData = Blob.valueOf('Test Content');
        cv.IsMajorVersion = true;         
        insert cv;         
        
        ContentVersion testContent = [SELECT id, ContentDocumentId FROM ContentVersion where Id = :cv.Id];
        
        ContentDocumentLink contentlink=new ContentDocumentLink();
        contentlink.LinkedEntityId=LinkedEntityId;
        contentlink.ShareType= 'I';
        contentlink.ContentDocumentId=testcontent.ContentDocumentId;
        contentlink.Visibility = 'AllUsers'; 
        insert contentlink;
        return contentlink;
    }    
    
    public static Document__c createDocument(Id opportunityId, String fileType){
        Document__c testDoc = new Document__c(Opportunity__c= opportunityId, Link_File__c = fileType);
        insert testDoc;
        return testDoc;
    }
    
    public static Account createCustomerAccount(string accountName){
        Account acc =  new Account(name = accountName);
        acc.BillingCountry = 'India';
        acc.Website = 'https://www.test.com';
        insert acc;
        return acc;
    }
    
    public static List<Opportunity> createOpportunity(Id accountId, string Name, Integer noOfOpportunities){
        List<Opportunity> oppoList = new List<Opportunity>();
        
        for(Integer i=0; i < noOfOpportunities; i++ )
        {
            Opportunity oppo = new Opportunity();
            oppo.AccountId = accountId;
            oppo.Name = Name + i;
            oppo.StageName = 'Qualification';
            oppo.CloseDate = System.today().addMonths(2);
            oppo.Pricebook2Id = Test.getStandardPricebookId();
            oppoList.add(oppo);
        }
        
        insert oppoList;
        return oppoList;
    }
    public static void createCase(Id AccountId){
        Case testCase  = new Case(AccountId=AccountId );
        insert testCase;
    }
}