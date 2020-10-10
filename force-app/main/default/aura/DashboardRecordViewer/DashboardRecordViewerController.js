({
  handleSelectionChanged: function (component, event, helper) {
    console.log("selection changed in the dashboard");
    var params = event.getParams();
    var payload = params.payload;
    if (payload) {
      var step = payload.step;
      var data = payload.data;
      if(payload.data[0].hasOwnProperty("Id") || payload.data[0].hasOwnProperty("AccountId")){
        var id =  payload.data[0].hasOwnProperty("Id") ? payload.data[0]["Id"] : payload.data[0]["AccountId"];
        component.set("v.recordId",id);
      }
    }
  }
});
