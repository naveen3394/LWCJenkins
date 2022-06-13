/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 06-10-2022
 * @last modified by  : navin.patil@rupeek.com
 * Modifications Log 
 * Ver   Date         Author                               Modification
 * 1.0   03-26-2021   ChangeMeIn@UserSettingsUnder.SFDoc   Initial Version  
**/
public with sharing class AccountDetail {
    public AccountDetail() {

    }
    @AuraEnabled(cacheable=true)
    public static Account getAccountDetail(String recordId)
    {
        return [Select Name,Website,Phone,Type from Account where Id= : recordId];
    }
    //test
    @AuraEnabled(cacheable=true)
    public static List<Location> getAccount(String recordId) {
        List< Account> accs =  [Select Id, Name,Type, Industry, BillingAddress,BillingStreet,
                                BillingCity, BillingCountry, BillingPostalCode,
                                BillingState,Phone from Account where Id = :recordId] ;
        
        List<Location> loc = new List<Location>();
        for(Account acc :accs){
            System.debug(acc);
            GeoLocation geoInfo = new GeoLocation();
            geoInfo.Street = acc.BillingStreet;
            geoInfo.PostalCode = acc.BillingPostalCode;
            geoInfo.City = acc.BillingCity;
            geoInfo.State = acc.BillingState;
            geoInfo.Country = acc.BillingCountry;
            Location locDetail = new Location();
            locDetail.icon = 'action:map'; 
            locDetail.title = acc.Name;
            locDetail.description = acc.Name;
            locDetail.location = geoInfo;
            
            loc.add(locDetail);
        }
        System.debug(loc);
        return loc ;
    }
    public class Location{
        @AuraEnabled 
        public String icon{get;set;} 
        @AuraEnabled 
        public String title{get;set;} 
        @AuraEnabled
        public String description{get;set;} 
        @AuraEnabled 
        public GeoLocation location{get;set;} 
    }
    public class GeoLocation{
        @AuraEnabled 
        public String Street{get;set;}
        @AuraEnabled 
        public String PostalCode{get;set;}
        @AuraEnabled 
        public String City{get;set;}
        @AuraEnabled 
        public String State{get;set;}
        @AuraEnabled 
        public String Country{get;set;}
    }
    @AuraEnabled(cacheable=true)
    public static Account getAccountVerificationDetail(String recordId,String accName,String accNumber,String accountSLANumber )
    {
        system.debug('param details');
        system.debug(accName + ' '+ accNumber+' '+accountSLAnumber);
        return [Select Id,AccountNumber,Name,SLASerialNumber__c from Account where  Name=: accName AND AccountNumber=: accNumber AND
        SLASerialNumber__c=:accountSLANumber ];
    }

   
}