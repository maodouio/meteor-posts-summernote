Template.postsIndex.rendered = function() {
};

Template.postsIndex.helpers({
  sayHello: function () {
    return "Hallo!";
  }
});

Template.postsIndex.events ({
  'click .delete-post': function(e) {
    e.preventDefault();
    var item = this;

    if (confirm("Are you sure?")) {
      Posts.remove(item._id);
      console.log("Deleted!")
    }
  }
});
