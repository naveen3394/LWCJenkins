/**
* @description       : 
* @author            : ChangeMeIn@UserSettingsUnder.SFDoc
* @group             : 
* @last modified on  : 04-14-2021
* @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
* Modifications Log 
* Ver   Date         Author                               Modification
* 1.0   04-06-2021   ChangeMeIn@UserSettingsUnder.SFDoc   Initial Version
**/
public with sharing class OrderDataService {

@AuraEnabled(cacheable=true)
public static List<Order> getOrderList() {

return [SELECT id,OrderNumber, Account.Name,AccountID, EffectiveDate, Items_In_Cart__c,TotalAmount FROM Order ];
}

@AuraEnabled(cacheable=true)
public static List<OrderItem> getCartItems(String orderId) {

return [SELECT id,Product2.Name, UnitPrice,Quantity,TotalPrice FROM OrderItem Where OrderId=: orderId ];
}
@AuraEnabled
public static Product2 addItemsToCart(PricebookEntry priceEntry,String orderId,Integer finalqty,Integer itemQty)
{
System.debug('priceEntry'+priceEntry);
System.debug('orderid'+orderId);
System.debug('finalQty'+finalqty);

Product2 prod=new Product2(id=priceEntry.Product2Id);
prod.Available_Quantity__c=(Integer)finalqty;
update prod;

Map<Id,OrderItem> mapIdOrderItem=new Map<Id,OrderItem> ([SELECT Id ,Product2Id,Quantity from OrderItem where OrderId=:orderId]);
List<OrderItem> odUpdateList=new List<OrderItem>();

for(OrderItem od : mapIdOrderItem.values())
{
if(od.product2Id==priceEntry.Product2Id)
{
od.quantity=od.quantity+(Integer)itemQty;
odUpdateList.add(od);
break;
}

}

if(!odUpdateList.isEmpty())
{
update odUpdateList;
}
else{
orderItem oditem=new orderItem();
oditem.OrderId=orderId;
oditem.PricebookEntryId=priceEntry.id;
oditem.quantity=(Integer)itemQty;
oditem.unitPrice=priceEntry.UnitPrice;

List<OrderItem> odList=new List<OrderItem>();
odlist.add(oditem);
insert odlist; 
}

return prod;

}




@AuraEnabled(cacheable=true)
public static List<PricebookEntry> getProducts(String searchKey,String searchCode) {
string value='%Gadgets%';
String query = 'Select PriceBook2.Name,Product2.DisplayUrl,Product2.ProductCode, Product2Id,Pricebook2Id, Product2.Product_Image__c ,Product2.Available_Quantity__c, Product2.Name, UnitPrice From PricebookEntry WHERE PriceBook2.Name LIKE :value ' ;
system.debug('query---'+query);
if ( searchKey != null && searchKey != '' ) {
String key = '%' + searchKey + '%';
query += ' AND Product2.Name LIKE :key';
}
if ( searchCode != null && searchCode != '' ) {
String code = '%' + searchCode + '%';
query += ' AND Product2.ProductCode LIKE :code';
}
// if ( sortBy != null && sortDirection != null ) {
// query += ' ORDER BY ' + sortBy + ' ' + sortDirection;
// }
return Database.query( query );
//   return [Select PriceBook2.Name,Product2.DisplayUrl, Product2Id,Pricebook2Id, Product2.Product_Image__c ,Product2.Available_Quantity__c, Product2.Name, UnitPrice From PricebookEntry WHERE PriceBook2.Name LIKE '%Gadgets%'];
}

@AuraEnabled
public static Order createNewOrder(Order ord) {
System.debug(ord);
try{
if(ord!=null)
{
    Id pricebookId=[SELECT id,name  from pricebook2 where Name Like '%Gadgets%'].Id;
System.debug('pricebookId'+pricebookId);
ord.pricebook2Id=pricebookId;
insert ord;

return ord;
}
}
catch(Exception ex) {
system.debug(ex.getMessage());
throw new AuraHandledException(ex.getMessage());
}

return null;

}


}

// 1. change checkbox to radiobutton in showorders LWC
// 2. add flexipage on no orderitems ShowOrderCart
// 3. add products in seperate LWC product tile
// 4. order summary LWC 
// 5. Address confirmation LWC