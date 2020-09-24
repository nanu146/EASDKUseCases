({
    doInit : function(component, event, helper) {
        var getUserDetails = component.get("c.getUserDetails");

        getUserDetails.setCallback(this, function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                console.log(response.getReturnValue());
                helper.getDashboardDetails(component);
            }
        });

        $A.enqueueAction(getUserDetails);

    }

})
