Template.registerHelper('hasPackage', function(packageName){
  console.log("hasPackage registerHelper :", packageName);
  console.log("Session get :", Session.get('hasPackage' + packageName));
  return Session.get('hasPackage' + packageName);
});