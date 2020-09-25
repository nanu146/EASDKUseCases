({
    getPersonaDashboardDetails : function(component){
        var getPersonaDashboards = component.get("c.getPersonaDashboards");
        getPersonaDashboards.setCallback(this,function(response){
            var status = response.getState();
            if(status === "SUCCESS"){
                console.log(response.getReturnValue());
            }

        });

        $A.enqueueAction(getPersonaDashboards);
    }
})
