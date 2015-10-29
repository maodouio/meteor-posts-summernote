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
      console.log('New Post inserted successfully!');
      Router.go('postShow', {_id: result});
    },

    onError: function(operation, error, template) {
      console.log(error);
    }
  }
});
