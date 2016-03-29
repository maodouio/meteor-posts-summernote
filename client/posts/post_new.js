Template.postNew.rendered = function() {
  $('.note-editable').css("min-height", "200px");
};

Template.postNew.onRendered(function(){
  console.log('logoImage: ' + Session.get('logoImage'));
  Session.setDefault("imageFileName","未选择文件");
  Session.setDefault("logoImage", "");
});

Template.postNew.helpers({
  logoImageUrl: function() {
    return Session.get("logoImage");
},
});

// Template.postNew.events ({
//   'click #select_logo_btn': () => {
//       $('#myFileInput').trigger("click");
//     },
// });

AutoForm.hooks({
  'postForm': {
    before: {
      insert: function(doc) {
        doc.createdAt = new Date();
        var photo = Session.get("logoImage");
        doc.image = photo;
        console.log(photo);
        // console.log(doc);
        return doc;
      }
    },
    onSuccess: function (operation, result, template) {
      console.log(operation + ' successfully!');
      Router.go('postShow', {_id: this.docId});
    },
    onError: function(operation, error, template) {
      console.log(error);
    }
  }
});
