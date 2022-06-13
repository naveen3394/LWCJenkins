public class OpportunityTriggerHelper {
    
    public static void createTimeLineOnOpportunityCreation(Map<Id, Opportunity> newOpportunityMap, Map<Id, TimeLine__c> timeLineMap, Map<Id, Opportunity> oldOpportunityMap){
        List<Timeline__c> timelist = new List<Timeline__c>();
        for(Opportunity tempOppo: newOpportunityMap.values()){
            
            String newValue = tempOppo.StageName;
            String oldValue = trigger.isInsert ? null : oldOpportunityMap.get(tempOppo.Id).StageName;
            
            Timeline__c tempTimeLine = new Timeline__c();
            tempTimeLine.Opportunity__c = tempOppo.Id;
            tempTimeLine.Changed_By__c = Userinfo.getUserId();
            tempTimeLine.Changed_Date__c = tempOppo.LastModifiedDate;
            tempTimeLine.New_Value__c = newValue;
            tempTimeLine.Parent_Type__c = 'Opportunity';
            tempTimeLine.Old_Value__c = oldValue;
            tempTimeLine.Last_Modified_Date__c = trigger.isInsert ? System.now() : timeLineMap.get(tempOppo.Id).Changed_Date__c;
            
            timelist.add(tempTimeLine);
        }
        if(timelist.size() > 0){
            insert timelist;
        }
    }
    
    public static void manageTimeline(Map<Id, Opportunity> newOpportunityMap, Map<Id, Opportunity> oldOpportunityMap){
        List<Timeline__c> timelist = new List<Timeline__c>();
        List<Opportunity> insertOpportunityList = new List<Opportunity>();
        Map<Id, Opportunity> updateOpportunityMap = new Map<Id, Opportunity>();
        Boolean isStageUpdate = false;
        Set<Id> stageUpdateIds = new Set<Id>(); 
        
        if(trigger.isInsert){
            createTimeLineOnOpportunityCreation(newOpportunityMap, null, null);
            return;
        } else {
            for(Opportunity tempOppo : newOpportunityMap.values()){
                if (trigger.isUpdate && tempOppo.StageName != oldOpportunityMap.get(tempOppo.Id).StageName){
                    updateOpportunityMap.put(tempOppo.Id, tempOppo);
                    stageUpdateIds.add(tempOppo.Id);       
                }
            }
        }
        Map<Id, Timeline__c>  timeLineMap = new Map<Id, Timeline__c>();
        
        for(Timeline__c temp : [SELECT Id, Changed_Date__c, Opportunity__c FROM Timeline__c Where Opportunity__c IN :stageUpdateIds order by createdDate desc]){
            if(!timeLineMap.containsKey(temp.Opportunity__c)){
                timeLineMap.put(temp.Opportunity__c, temp);
            }
        }
        createTimeLineOnOpportunityCreation(updateOpportunityMap, timeLineMap, oldOpportunityMap);  
    }
}