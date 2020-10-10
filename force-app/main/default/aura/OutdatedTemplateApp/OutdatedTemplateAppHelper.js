({
  getAppsInstalledFromTemplate: function (folderList) {
    var folders = [];

    console.log("Get only the list of apps installed from a template");

    folderList.forEach(function (d) {
      // eslint-disable-next-line no-prototype-builtins
      if (d.hasOwnProperty("templateVersion") && !!d.templateVersion) {
        d.versionCompare = parseFloat(d.templateVersion);
        folders.push(d);
      }
    });
    console.log("list of apps installed from templates:", folders);

    return folders;
  },
  listFolders: function (component) {
    var sdk = component.find("sdk");
    var context = { apiVersion: "49" };
    var methodName = "listFolders";
    var methodParameters = {};
    var self = this;

    console.log("getting list of all apps");

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
          console.log("list of folders: ", data.folders);
          var folders = self.getAppsInstalledFromTemplate(data.folders);

          self.listTemplates(component, folders);
        }
      })
    );
  },
  listTemplates: function (component, folders) {
    var sdk = component.find("sdk");
    var context = { apiVersion: "49" };
    var methodName = "listTemplates";
    var methodParameters = {};

    var self = this;

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
          console.log("list of templates:", data.templates);
          var templates = data.templates;
          var outdated = [];

          folders.forEach(function (d) {
            var template = self.findTemplateForId(
              templates,
              d.templateSourceId
            );

            if (
              parseFloat(template.releaseInfo.templateVersion) >
              d.versionCompare
            ) {
              d.updateTemplateVersion = template.releaseInfo.templateVersion;
              d.templateLabel = template.label;
              outdated.push(d);
            }
          });
          console.log("list of outdated", outdated);
          component.set("v.cards", outdated);
        }
      })
    );
  },
  findTemplateForId: function (templatesList, templateId) {
    for (var i = 0; i < templatesList.length; i++) {
      if (templatesList[i].id === templateId) {
        return templatesList[i];
      }
    }

    return null;
  }
});
