({
  doInit: function (component, event, helper) {
    var sdk = component.find("sdk");
    var context = { apiVersion: "49" };
    var methodName = "listFolders";
    var methodParameters = {};

    sdk.invokeMethod(
      context,
      methodName,
      methodParameters,
      $A.getCallback(function (err, data) {
        if (err !== null) {
          // DO THIS IF THE METHOD FAILS
          console.error("SDK error", err);
        } else {
          // DO THIS IF THE METHOD SUCCEEDS
          console.log(data.folders);
        }
      })
    );
  }
});
