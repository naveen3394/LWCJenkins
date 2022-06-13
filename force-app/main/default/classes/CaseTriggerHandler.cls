/**
 * @description       : 
 * @author            : navin.patil@rupeek.com
 * @group             : 
 * @last modified on  : 06-13-2022
 * @last modified by  : navin.patil@rupeek.com
**/
public class CaseTriggerHandler {
    //this is a test comment
    public static void afterInsert(Map<Id,Case> caseMap ){
        CaseTriggerHelper.manageTimeline(caseMap, null);
    }
    
    public static void afterUpdate(Map<Id,Case> caseMap, Map<Id,Case> oldCaseMap){
        CaseTriggerHelper.manageTimeline(caseMap, oldCaseMap);
    }
    
}