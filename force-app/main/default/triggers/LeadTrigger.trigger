trigger LeadTrigger on Lead (after insert, after update) {
    if(Trigger.IsAfter){
        if(Trigger.IsInsert){
            LeadTriggerHandler.AfterInsert(Trigger.NewMap);            
        } if(Trigger.IsUpdate){
            LeadTriggerHandler.AfterUpdate(Trigger.NewMap, Trigger.OldMap);            
        }     
    }
}