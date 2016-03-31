// ***************************************************************
// PUBLICATIONS (For Documents collection)
// ***************************************************************

// DOCUMENTS INDEX
// -------------------------------------------------------
Meteor.publish('posts', function() {
  return Posts.find({}, { fields: { title: 1, description: 1, image: 1 , createdAt: 1}});
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
      {
        find: function(post) {
          if (typeof Comment !== "undefined" && typeof Comment.collection !== "undefined") {
            return Comment.collection.find({linkedObjectId: post._id});
          }
        },
        children: [
          {
            find: function(comment) {
                // Find user that authored comment.
              return Meteor.users.find(
                  { _id: comment.userId },
                  { fields: { 'profile.headimgurl': 1, 'profile.nickname': 1 } });
            }
          }
        ]
      },
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


Meteor.publishComposite("userPostsComposite", function(userId) {
 return {
   find: function() {
     return Posts.find({userId: userId}, { fields: { title: 1, description: 1 ,image: 1} });
   },
  //  children: [
  //    {
  //      find: function() {
  //        return Meteor.users.find({_id: userId});
  //      }
  //    }
  //  ]
 }
});

Meteor.publishComposite("userPostsCommentsComposite", function(userId) {
  return {
    find: function() {
      return Comment.collection.find({userId: userId});
      // return Comment.collection.find({userId: userId}, { fields: { title: 1, description: 1} });
    },
    children: [
      {
        find: function(comment) {
          if (typeof Posts !== "undefined") {
            return Posts.find({_id: comment.linkedObjectId}, { fields: { title: 1, description: 1 ,image: 1} });
          }
        },
        children: [
          {
            find: function(post) {
              return Meteor.users.find({_id: post.userId});
            }
          }
        ]
      }
    ]
  }
});

Meteor.publishComposite("userPostsLikesComposite", function(userId) {
  return {
    find: function() {
      return Like.collection.find({userId: userId});
      //return Like.collection.find({userId: userId}, { fields: { title: 1, description: 1} });
    },
    children: [
      {
        find: function(like) {
          if (typeof Posts !== "undefined") {
            return Posts.find({_id: like.linkedObjectId}, { fields: { title: 1, description: 1 ,image: 1} });
          }
        },
        children: [
          {
            find: function(post) {
              return Meteor.users.find({_id: post.userId});
            }
          }
        ]
      }
    ]
  }
});

Meteor.publishComposite("userPostsFavoritesComposite", function(userId) {
 return {
   find: function() {
    //  return Posts.find({userId: userId}, { fields: { title: 1, description: 1 } });
   },
 }
});
