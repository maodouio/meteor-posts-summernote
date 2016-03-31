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

  // DOCUMENT SHOW COMMENT
  // -------------------------------------------------------
  this.route('postComment', {
    template: 'postComment',
    path: '/posts/:_id/comment',
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

  this.route('userPosts', {
    template: 'userPosts',
    path: '/user/:_id/posts/',
    waitOn: function () {
      //
      Meteor.subscribe('user', this.params._id);
      return Meteor.subscribe('userPostsComposite', this.params._id);
    },
    data: function() {
      console.log("posts: Posts.find()", Posts.find().fetch());
      return {
        //comments: Comment.collection.find(),
        posts: Posts.find({}, {sort: {createdAt: -1}}),
        user: Meteor.users.findOne({_id: this.params._id}),
      };
    },
  });

  this.route('userPostsLikes', {
    template: 'userPostsLikes',
    path: '/user/:_id/postslikes/',
    waitOn: function () {
      // 只能在这里订阅，组合订阅中如果没有找到用户的评论，那么则不会发用这个用户的信息
      Meteor.subscribe('user', this.params._id);
      return Meteor.subscribe('userPostsLikesComposite', this.params._id);
    },
    data: function() {
      console.log("posts: Posts.find()", Posts.find().fetch());
      return {

        posts: Posts.find({}, {sort: {createdAt: -1}}),
        user: Meteor.users.findOne({_id: this.params._id}),
      };
    },
  });

  this.route('userPostsComments', {
    template: 'userPostsComments',
    path: '/user/:_id/postscomments/',
    waitOn: function () {
      // 只能在这里订阅，组合订阅中如果没有找到用户的评论，那么则不会发用这个用户的信息
      Meteor.subscribe('user', this.params._id);
      return Meteor.subscribe('userPostsCommentsComposite', this.params._id);
    },
    data: function() {
      console.log("posts: Posts.find()", Posts.find().fetch());
      return {

        posts: Posts.find({}, {sort: {createdAt: -1}}),
        user: Meteor.users.findOne({_id: this.params._id}),
      };
    },
  });

  this.route('userPostsFavorites', {
    template: 'userPostsFavorites',
    path: '/user/:_id/postsfavorites/',
    waitOn: function () {
      // 只能在这里订阅，组合订阅中如果没有找到用户的评论，那么则不会发用这个用户的信息
      Meteor.subscribe('user', this.params._id);
      return Meteor.subscribe('userPostsFavoritesComposite', this.params._id);
    },
    data: function() {
      console.log("posts: Posts.find()", Posts.find().fetch());
      return {

        posts: Posts.find({}, {sort: {createdAt: -1}}),
        user: Meteor.users.findOne({_id: this.params._id}),
      };
    },
  });

});
