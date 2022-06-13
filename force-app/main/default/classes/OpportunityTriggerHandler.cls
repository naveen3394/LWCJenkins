public class OpportunityTriggerHandler {
    public static void afterInsert(Map<Id,Opportunity> opportunitiesMap ){
        OpportunityTriggerHelper.manageTimeline(OpportunitiesMap, null);
    }
    
    public static void afterUpdate(Map<Id,Opportunity> opportunitiesMap, Map<Id,Opportunity> opportunitiesOldMap){
        OpportunityTriggerHelper.manageTimeline(opportunitiesMap, opportunitiesOldMap);
    }
}