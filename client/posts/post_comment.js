Template.postComment.events ({
  "click #js_cmt_submit": function(event, template){
    if (Meteor.user()) {
      // console.log("activity :", activity);
      var comment_input = $('#js_cmt_input').val();
      Comment.collection.insert({
        linkedObjectId: this.post._id,
        userId: Meteor.userId(),
        body: comment_input
      })
      Router.go("/posts/"+this.post._id);
      } else {
        if (confirm("请您登录后再提交评论!")) {
          var post = Posts.findOne();
          window.location.href = "/userLogin?logintype=/posts/" + this.post._id;
          console.log("跳转成功!");
      }
    }
  },
})
