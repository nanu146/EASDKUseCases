({
    getPersonaDashboardDetails : function(component){
        var getDashboards = component.get("c.getPersonaDashboards");
        getDashboards.setCallback(this,function(response){
            var status = response.getState();
            if(status === "SUCCESS"){
                console.log(response.getReturnValue());
            }

        });

        $A.enqueueAction(getDashboards);
    }
})
