public class LeadTriggerHandler {
    public static void afterInsert(Map<Id,Lead> leadMap ){
        LeadTriggerHelper.manageTimeline(leadMap, null);
    }
    
    public static void afterUpdate(Map<Id,Lead> leadMap, Map<Id,Lead> oldLeadMap){
        LeadTriggerHelper.manageTimeline(leadMap, oldLeadMap);
    }
}