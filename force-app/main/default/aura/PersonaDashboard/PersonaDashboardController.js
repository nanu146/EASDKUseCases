({
  doInit: function (component, event, helper) {
    helper.getPersonaDashboardDetails(component);
  },
  selectionChange: function (component, event, helper) {
    var selectedOptionValue = event.getParam("value");
    component.set("v.dashboardId", selectedOptionValue);
  }
});
