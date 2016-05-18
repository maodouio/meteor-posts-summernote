Template.postShow.rendered = function() {
  // Counter++ everytime page rendered.
  console.log(this.data);
  Posts.update(this.data.post._id, {$inc: {pageviewCounter: 1}});
};

Template.postShow.helpers({
  photo: function() {
    return Session.get("logoImage");
  },
  hasLiked: function () {
    console.log(this);
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
  likesCountIsZero: function () {
    var count = Like.collection.find({linkedObjectId: this._id}).count();
    return count == 0? true: false;
  },
});

Template.userPostCommentCard.helpers({
  momentFormNow: function(date) {
    moment.lang('zh-cn');
    return moment(date).fromNow();
  }
});

Template.postShow.events ({

  // 取消点赞
  "click .dislove": function(event, template){
    console.log('disliked');

    var a = Like.collection.findOne({linkedObjectId: this._id,userId: Meteor.userId()});
    Like.collection.remove({_id:a._id});
  },
  // 点赞
  'click .love': function(e) {
    console.log('liked');

    if (Meteor.user()) {
      //this.like();
      console.log(this);
      Like.collection.insert({linkedObjectId: this._id, userId: Meteor.userId(), date: new Date()});
    } else {
      console.log("router go userLogin");
      window.location.href = "/userLogin?logintype=/posts/" + this._id + "#like3";
    }
  },
    //写留言
    'click #comment-icon': function(){
      if (Meteor.user()) {
        var userId = Meteor.userId();
      	Modal.show("commentModal",this);
        console.log(userId);
        } else {
          if (confirm("请您登录后再提交评论!")) {
            var post = Posts.findOne();
            window.location.href = "/userLogin?logintype=/posts/" + this.post._id + "/comment";
            console.log("跳转成功!");
        }
      }
    }
});


Template.postShow.onRendered(function() {
	var share_config = {
       "share": {
          "imgUrl": this.data.post.image,
          "desc" : this.data.post.description,
          "title" : this.data.post.title,
          "link": window.location.href,
          "success":function(){
            //分享成功后的回调函数
          },
          'cancel': function () {
            // 用户取消分享后执行的回调函数
          }
      }
  };

  var url = "";
  var current = Iron.Location.get();

  if (current.host === "") {
    // route 过来的地址，微信只能获取到 /activities 截止，后面的取不到了
    url = window.location.origin + "/posts/";
  } else {
    // 刷新页面或者新建文章后跳转的页面，微信获取的是完整地址
    url = window.location.href;
  }

  // 根据不同情况传递不同的地址获取 signature
  Meteor.call("signature", url, function(error, result) {
    // console.log(result.signature);
    // Meteor.call("printLog", result.signature);

    wx.config({
      debug: false,
      appId: result.appId,
      timestamp: result.timestamp,
      nonceStr: result.nonceStr,
      signature: result.signature,
      jsApiList: [
        'checkJsApi',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'hideMenuItems',
        'chooseImage',
        'uploadImage',
				'scanQRCode',
      ]
    });

    wx.ready(function () {
      wx.onMenuShareAppMessage(share_config.share);
      wx.onMenuShareTimeline(share_config.share);
      wx.onMenuShareQQ(share_config.share);
    });

    wx.error(function(res){
      Meteor.call("printLog", "wx.error :", res.errMsg);
    });
  });
});

Template.commentModal.events({
  "click #comment-btn": function(event, template){
    event.preventDefault();
    if (Meteor.user()) {
      // console.log("activity :", activity);
      console.log("------------------");
      console.log(this);
      var comment_input = $('#userCmnt').val();
      Comment.collection.insert({
        linkedObjectId: this._id,
        body: comment_input
      })
      // Router.go("/posts/"+this._id);
      Modal.hide();
      } else {
        if (confirm("请您登录后再提交评论!")) {
          var post = Posts.findOne();
          window.location.href = "/userLogin?logintype=/posts/" + this._id;
          console.log("跳转成功!");
      }
    }
  },
})
