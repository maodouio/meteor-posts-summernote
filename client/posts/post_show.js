Template.postShow.rendered = function() {
  // Counter++ everytime page rendered.
  Posts.update(this.data._id, {$inc: {pageviewCounter: 1}});
};

Template.postShow.helpers({
  photo: function() {
    return Session.get("logoImage");
  },
  hasLiked: function () {
    var up = !!Like.collection.findOne({linkedObjectId: this._id, userId: Meteor.userId()});
    if (up) {
      return true;
    } else {
      return false;
    }
  },
  likesCount: function () {
    return Like.collection.find({linkedObjectId: this._id}).count();
  },
});

Template.postShow.events ({
  // 取消点赞
  "click .dislike": function(event, template){
    console.log('disliked');

    var a = Like.collection.findOne({linkedObjectId: this._id,userId: Meteor.userId()});
    Like.collection.remove({_id:a._id});
  },
  // 点赞
  'click .like': function(e) {
    if (Meteor.user()) {
      //this.like();
      console.log('liked');
      Like.collection.insert({linkedObjectId: this._id, userId: Meteor.userId(), date: new Date()});
    } else {
      console.log("router go");
      window.location.href = "/userLogin?logintype=/activities/" + this._id;
    }
  }
});
