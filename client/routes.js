// ***************************************************************
// ROUTES (Posts)
// ***************************************************************

Router.map(function() {

  // DOCUMENTS INDEX
  // -------------------------------------------------------
  this.route('postsIndex', {
    template: 'postsIndex',
    path: '/posts',
    waitOn: function () {
      return Meteor.subscribe('posts');
    },
    data: {
      posts: function () {
        return Posts.find({}, {sort: {createdAt: -1}});
      }
    }
  });

  // DOCUMENT NEW
  // -------------------------------------------------------
  this.route('postNew', {
    template: 'postNew',
    path: '/posts/new'
  });

  // DOCUMENT SHOW
  // -------------------------------------------------------
  this.route('postShow', {
    template: 'postShow',
    path: '/posts/:_id',
    waitOn: function () {
      //return Meteor.subscribe('post', this.params._id);
      return Meteor.subscribe('postComposite', this.params._id);
    },
    data: function () {
      return {
        post: Posts.findOne(this.params._id),
        comments: function() {
          if (typeof Comment !== "undefined" && typeof Comment.collection !== "undefined") {
            return Comment.collection.find({}, {sort: {date: -1}});
          }
        },
        likes: function() {
          if (typeof Like !== "undefined" && typeof Like.collection !== "undefined") {
            return Like.collection.find();
          }
        },
      }
    }
  });

  // DOCUMENT EDIT
  // -------------------------------------------------------
  this.route('postEdit', {
    template: 'postEdit',
    path: '/posts/:_id/edit',
    waitOn: function () {
      return Meteor.subscribe('post', this.params._id);
    },
    data: function () {
      return Posts.findOne(this.params._id);
    }
  });

});
