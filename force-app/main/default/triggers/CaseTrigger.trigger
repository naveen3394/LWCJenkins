trigger CaseTrigger on Case (after insert, after update) {
    if(Trigger.IsAfter){
        if(Trigger.IsInsert){
            CaseTriggerHandler.AfterInsert(Trigger.NewMap);            
        } if(Trigger.IsUpdate){
            CaseTriggerHandler.AfterUpdate(Trigger.NewMap, Trigger.OldMap);            
        }     
    }
}