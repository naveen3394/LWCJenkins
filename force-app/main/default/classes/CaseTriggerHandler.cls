public class CaseTriggerHandler {
    public static void afterInsert(Map<Id,Case> caseMap ){
        CaseTriggerHelper.manageTimeline(caseMap, null);
    }
    
    public static void afterUpdate(Map<Id,Case> caseMap, Map<Id,Case> oldCaseMap){
        CaseTriggerHelper.manageTimeline(caseMap, oldCaseMap);
    }
    
}