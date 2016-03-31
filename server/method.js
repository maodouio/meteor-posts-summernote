Meteor.methods({
  getPostInfo: function(postId){
    return Posts.findOne(postId);
  },
});
