Template.postsIndex.rendered = function() {
};

Template.postsIndex.helpers({
});

Template.postsIndex.events ({
  'click .delete-post': function(e) {
    e.preventDefault();
    e.stopPropagation();
    var item = this;

    if (confirm("您确定？")) {
      Posts.remove(item._id);
      console.log("已删除")
    }
  },

  'click .edit-post': function(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("/posts/"+this._id + "/edit/");
    window.location.href = "/posts/"+this._id + "/edit/";
  },

  "click .postItem": function(event, template){
    event.preventDefault();
    console.log(this);
    window.location.href = "/posts/"+this._id;
  },
});

// Outputs e.g. 2 hours ago
// UI.registerHelper('showTimeAgo', function(date) {
//   return !date ? "" : moment(date).fromNow();
// });

// Outputs August 30th 2014, 5:33:46 pm
// UI.registerHelper('showPrettyTimestamp', function(date) {
//   return !date ? "" : moment(date).format("MMMM Do YYYY, h:mm:ss a")
// });

UI.registerHelper('showPostTimestamp', function(date) {
  return !date ? "" : moment(date).format("YYYY-MM-DD");
});
