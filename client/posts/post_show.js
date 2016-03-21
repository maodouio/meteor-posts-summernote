Template.postShow.rendered = function() {
  // Counter++ everytime page rendered.
  Posts.update(this.data._id, {$inc: {pageviewCounter: 1}});
};

Template.postShow.helpers({
});

Template.postShow.events ({
});
