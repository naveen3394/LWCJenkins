public class CaseTriggerHelper {
    public static void createTimeLineOnOpportunityCreation(Map<Id, Case> newLeadMap, Map<Id, TimeLine__c> timeLineMap, Map<Id, Case> oldLeadMap){
        List<Timeline__c> timelist = new List<Timeline__c>();
        for(Case tempCase: newLeadMap.values()){
            
            String newValue = tempCase.Status;
            String oldValue = trigger.isInsert ? null : oldLeadMap.get(tempCase.Id).Status;
            
            Timeline__c tempTimeLine = new Timeline__c();
            tempTimeLine.Case__c = tempCase.Id;
            tempTimeLine.Changed_By__c = Userinfo.getUserId();
            tempTimeLine.Changed_Date__c = tempCase.LastModifiedDate;
            tempTimeLine.New_Value__c = newValue;
            tempTimeLine.Parent_Type__c = 'Case';
            tempTimeLine.Old_Value__c = oldValue;
            tempTimeLine.Last_Modified_Date__c = trigger.isInsert ? System.now() : timeLineMap.get(tempCase.Id).Changed_Date__c;
            
            timelist.add(tempTimeLine);
        }
        if(timelist.size() > 0){
            insert timelist;
        }
    }
    
    public static void manageTimeline(Map<Id, Case> newCaseMap, Map<Id, Case> oldCaseMap){
        List<Timeline__c> timelist = new List<Timeline__c>();
        List<Case> insertOpportunityList = new List<Case>();
        Map<Id, Case> updateCaseMap = new Map<Id, Case>();
        Boolean isStageUpdate = false;
        Set<Id> stageUpdateIds = new Set<Id>(); 
        
        if(trigger.isInsert){
            createTimeLineOnOpportunityCreation(newCaseMap, null, null);
            return;
        } else {
            for(Case tempCase : newCaseMap.values()){
                if (trigger.isUpdate && tempCase.Status != oldCaseMap.get(tempCase.Id).Status){
                    updateCaseMap.put(tempCase.Id, tempCase);
                    stageUpdateIds.add(tempCase.Id);       
                }
            }
        }
        Map<Id, Timeline__c>  timeLineMap = new Map<Id, Timeline__c>();
        
        for(Timeline__c temp : [SELECT Id, Changed_Date__c, Case__c FROM Timeline__c Where Case__c IN :stageUpdateIds order by createdDate desc]){
            if(!timeLineMap.containsKey(temp.Case__c)){
                timeLineMap.put(temp.Case__c, temp);
            }
        }
        if(updateCaseMap.size() > 0){
            createTimeLineOnOpportunityCreation(updateCaseMap, timeLineMap, oldCaseMap);  
        }
    }
}