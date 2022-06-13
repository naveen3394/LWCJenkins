/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 07-24-2021
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
**/
public with sharing class ProductService {
    @AuraEnabled(cacheable=true)
    public static List<PricebookEntry> getProducts(String searchKey) {
        string value='%Watches%';
        String query = 'Select PriceBook2.Name,Product2.DisplayUrl,Product2.ProductCode, Product2Id,Pricebook2Id, Product2.Product_Image__c ,Product2.Available_Quantity__c, Product2.Name, UnitPrice From PricebookEntry WHERE PriceBook2.Name LIKE :value ' ;
        system.debug('query---'+query);
        if ( searchKey != null && searchKey != '' ) {
        String key = '%' + searchKey + '%';
        query += ' AND Product2.Name LIKE :key';
        }
        return Database.query( query );
}
}