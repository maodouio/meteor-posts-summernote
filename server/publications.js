// ***************************************************************
// PUBLICATIONS (For Documents collection)
// ***************************************************************

// DOCUMENTS INDEX
// -------------------------------------------------------
Meteor.publish('posts', function() {
  return Posts.find();
});

// DOCUMENT SHOW
// -------------------------------------------------------
Meteor.publish('post', function(id) {
  return Posts.find(id);
});

Meteor.publishComposite("postComposite", function(postId) {
  return {
    find: function() {
      return Posts.find({_id: postId});
    },
    children: [
      {
        find: function(post) {
            // Find user that authored comment.
          return Meteor.users.find(
              { _id: post.userId },
              { limit: 1, fields: { profile: 1, username: 1 } });
        }
      },
      // {
      //   find: function(post) {
      //     if (typeof Comment !== "undefined" && typeof Comment.collection !== "undefined") {
      //       return Comment.collection.find({linkedObjectId: post._id});
      //     }
      //   },
      //   children: [
      //     {
      //       find: function(comment) {
      //           // Find user that authored comment.
      //         return Meteor.users.find(
      //             { _id: comment.userId },
      //             { fields: { 'profile.headimgurl': 1, 'profile.nickname': 1 } });
      //       }
      //     }
      //   ]
      // },
      {
        find: function(post) {
          if (typeof Like !== "undefined" && typeof Like.collection !== "undefined") {
            return Like.collection.find({linkedObjectId: post._id});
          }
        }
      },
    ]
  }
});
