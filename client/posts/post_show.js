Template.postShow.rendered = function() {
  // Counter++ everytime page rendered.
  Posts.update(this.data._id, {$inc: {pageviewCounter: 1}});
};

Template.postShow.helpers({
  photo: function() {
    return Session.get("logoImage");
  },
  hasLiked: function () {
    console.log(this);
    var up = !!Like.collection.findOne({linkedObjectId: this.post._id, userId: Meteor.userId()});
    if (up) {
      return true;
    } else {
      return false;
    }
  },
  likesCount: function () {
    return Like.collection.find({linkedObjectId: this.post._id}).count();
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
  "click .dislike": function(event, template){
    console.log('disliked');

    var a = Like.collection.findOne({linkedObjectId: this.post._id,userId: Meteor.userId()});
    Like.collection.remove({_id:a._id});
  },
  // 点赞
  'click .like': function(e) {
    if (Meteor.user()) {
      //this.like();
      console.log('liked');
      Like.collection.insert({linkedObjectId: this.post._id, userId: Meteor.userId(), date: new Date()});
    } else {
      console.log("router go");
      // window.location.href = "/userLogin?logintype=/activities/" + this._id;
    }
  }
});

AutoForm.hooks({
  'commentForm': {
    before: {
      insert: function(doc) {
        if (Meteor.user()) {
        var aid = Router.current().params._id;
        doc.linkedObjectId = aid;
        console.log("aid :", aid);
        console.log("this :", this);
        console.log("doc :", doc);
        console.log('id shibushi a ', doc.linkedObjectId);
        return doc;
        } else {
          if (confirm("请您登录后再提交评论!")) {
            var post = Posts.findOne();
            window.location.href = "/userLogin?logintype=/post/"+post._id;
            console.log("跳转成功!");
          }
        }
      }
    },
    onSuccess: function(operation, result,template) {
      console.log('您已评论成功了!');
    },
    onError: function(operation, error, template) {
      console.log("operation :", operation);
      console.log("error :", error);
      console.log("template :", template);
      console.log('您已评论失败了');
    }
  }
});

Template.postShow.onRendered(function() {
	var share_config = {
       "share": {
          "imgUrl": $(".postImg > img")[0].src,
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
    console.log(result.signature);
    Meteor.call("printLog", result.signature);

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
