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

// Outputs e.g. 2 hours ago
// UI.registerHelper('showTimeAgo', function(date) {
//   return !date ? "" : moment(date).fromNow();
// });

// Outputs August 30th 2014, 5:33:46 pm
// UI.registerHelper('showPrettyTimestamp', function(date) {
//   return !date ? "" : moment(date).format("MMMM Do YYYY, h:mm:ss a")
// });

UI.registerHelper('showPrettyTimestamp', function(date) {
  return !date ? "" : moment(date).format("YYYY-MM-DD");
});



