Template.postNew.rendered = function() {
  $('.note-editable').css("min-height", "200px");
};

Template.postNew.helpers({
});

Template.postNew.events ({
});

AutoForm.hooks({
  'postForm': {
    before: {
      insert: function(doc) {
        doc.createdAt = new Date();
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
