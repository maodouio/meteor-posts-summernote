Template.postComment.events ({
  "click #js_cmt_submit": function(event, template){
    var comment_input = $('#js_cmt_input').val();
    Comment.collection.insert({
      linkedObjectId: this.post._id,
      userId: Meteor.userId(),
      body: comment_input
    })
    Router.go("/posts/"+this.post._id);
  },
})
