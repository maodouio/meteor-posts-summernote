Template.postEdit.rendered = function() {
};

Template.postEdit.helpers({
});

Template.postEdit.events ({
});


AutoForm.hooks({
  'postForm': {
    before: {
      update: function(doc) {
        // console.log("AutoForm Hook update...");
        doc.updatedAt = new Date();
        console.log("doc------",doc);
        console.log("this.",this);
        console.log("this._id",this._id);

        // doc.$set.picture = Session.get('logoImage') || "";
        var photo = Session.get("logoImage");
        // doc.image = photo;
        Posts.update({_id: this.docId},{$set:{"image": photo}});
        console.log(photo);
        return doc;
      }
    },
    onSuccess: function (operation, result, template) {
      console.log(operation + ' successfully!');

      // var sendPostNotificationToAll = function(error, post) {
      //   var title       = post.title;
      //   var pic         = post.image;
      //       pic         += "?imageView2/2/w/640";
      //       console.log(pic);
      //   var time        = post.createdAt;
      //   var authorName  = post.authorName;
      //   var desc        = post.description;
      //   var url         = "http://" + Meteor.settings.public.subdomainName + ".maodou.io/posts/" + post._id;
      //
      //   var content = {
      //     title         : title,
      //     pic           : pic,
      //     time          : moment(time).format('YYYY-MM-DD hh:mm'),
      //     authorName    : authorName,
      //     desc          : desc,
      //     url           : url
      //   };
      //
      //   var appId = Meteor.settings.public.AppId;
      //   var appSecret = Meteor.settings.public.AppSecret;
      //
      //   Meteor.call("sendFormattedMessageToAll", appId, appSecret, content);
      // }

      // Meteor.call("getPostInfo", result, sendPostNotificationToAll);

      // Router.go('postShow', {_id: this.docId});
      window.location.href = "/posts/"+this.docId;
    },
    onError: function(operation, error, template) {
      console.log(error);
    }
  }
});
