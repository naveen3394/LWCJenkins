trigger OpportunityTrigger on Opportunity (after insert, after update) {
    if(Trigger.IsAfter){
        if(Trigger.IsInsert){
            OpportunityTriggerHandler.AfterInsert(Trigger.NewMap);            
        } if(Trigger.IsUpdate){
            OpportunityTriggerHandler.AfterUpdate(Trigger.NewMap, Trigger.OldMap);            
        }     
    }
}