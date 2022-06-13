public class LeadTriggerHelper {
    
    public static void createTimeLineOnOpportunityCreation(Map<Id, Lead> newLeadMap, Map<Id, TimeLine__c> timeLineMap, Map<Id, Lead> oldLeadMap){
        List<Timeline__c> timelist = new List<Timeline__c>();
        for(Lead tempLead: newLeadMap.values()){
            
            String newValue = tempLead.Status;
            String oldValue = trigger.isInsert ? null : oldLeadMap.get(tempLead.Id).Status;
            
            Timeline__c tempTimeLine = new Timeline__c();
            tempTimeLine.Lead__c = tempLead.Id;
            tempTimeLine.Changed_By__c = Userinfo.getUserId();
            tempTimeLine.Changed_Date__c = tempLead.LastModifiedDate;
            tempTimeLine.New_Value__c = newValue;
            tempTimeLine.Parent_Type__c = 'Lead';
            tempTimeLine.Old_Value__c = oldValue;
            tempTimeLine.Last_Modified_Date__c = trigger.isInsert ? System.now() : timeLineMap.get(tempLead.Id).Changed_Date__c;
            
            timelist.add(tempTimeLine);
        }
        if(timelist.size() > 0){
            insert timelist;
        }
    }
    
    public static void manageTimeline(Map<Id, Lead> newLeadMap, Map<Id, Lead> oldLeadMap){
        List<Timeline__c> timelist = new List<Timeline__c>();
        List<Opportunity> insertOpportunityList = new List<Opportunity>();
        Map<Id, Lead> updateLeadMap = new Map<Id, Lead>();
        Boolean isStageUpdate = false;
        Set<Id> stageUpdateIds = new Set<Id>(); 
        
        if(trigger.isInsert){
            createTimeLineOnOpportunityCreation(newLeadMap, null, null);
            return;
        } else {
            for(Lead tempLead : newLeadMap.values()){
                if (trigger.isUpdate && tempLead.Status != oldLeadMap.get(tempLead.Id).Status){
                    updateLeadMap.put(tempLead.Id, tempLead);
                    stageUpdateIds.add(tempLead.Id);       
                }
            }
        }
        Map<Id, Timeline__c>  timeLineMap = new Map<Id, Timeline__c>();
        
        for(Timeline__c temp : [SELECT Id, Changed_Date__c, Lead__c FROM Timeline__c Where Lead__c IN :stageUpdateIds order by createdDate desc]){
            if(!timeLineMap.containsKey(temp.Lead__c)){
                timeLineMap.put(temp.Lead__c, temp);
            }
        }
        if(updateLeadMap.size() > 0){
             createTimeLineOnOpportunityCreation(updateLeadMap, timeLineMap, oldLeadMap);  
        }
    }
}