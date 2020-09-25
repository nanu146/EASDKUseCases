({
  getPersonaDashboardDetails: function (component) {
    var getPersonaDashboards = component.get("c.getPersonaDashboards");
    var self = this;
    getPersonaDashboards.setCallback(this, function (response) {
      var status = response.getState();
      if (status === "SUCCESS") {
        console.log(response.getReturnValue());
        self.getEADashboards(component, response.getReturnValue());
      }
    });

    $A.enqueueAction(getPersonaDashboards);
  },
  getEADashboards: function (component, profileDashboards) {
    var context = {apiVersion: "49"};
    var methodName = "listDashboards";
    var methodParameters = {};
    var self = this;
    var sdk = component.find("sdk");

    sdk.invokeMethod(
      context,
      methodName,
      methodParameters,
      $A.getCallback(function (err, data) {
        if (err !== null) {
          //DO THIS IF THE METHOD FAILS
          console.error("SDK error", err);
        } else {
            var options = self.datasetToOption(data.dashboards, profileDashboards)
            // set options to combobax
            component.set("v.options",options)
            // set first option dashboard as default
            component.set("v.dashboardId",(options && options.length > 0) ? options[0].value: null)
        }
      })
    );
  },
  datasetToOption: function(dashboards, profileDashboards){
    var options = []

    profileDashboards.forEach(function(d){
        dashboards.forEach(function(c){
            if(c.id == d.DashboardId__c){
                options.push({"value": c.id, "label": c.label})
            }
        })
    })
    return options;
  }
});
