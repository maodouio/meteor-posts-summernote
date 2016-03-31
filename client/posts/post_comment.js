
AutoForm.hooks({
  'postCommentForm': {
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
      var post = Posts.findOne();
      //window.location.href = "/posts/"+post._id;
      Router.go("/posts/"+post._id);
    },
    onError: function(operation, error, template) {
      console.log("operation :", operation);
      console.log("error :", error);
      console.log("template :", template);
      console.log('您已评论失败了');
    }
  }
});