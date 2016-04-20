Template.postNew.rendered = function() {
  $('.note-editable').css("min-height", "200px");
};

Template.postNew.onRendered(function(){
  console.log('logoImage: ' + Session.get('logoImage'));
  Session.setDefault("imageFileName","未选择文件");
  Session.setDefault("logoImage", "");
});

Template.postNew.helpers({
  logoImageUrl: function() {
    return Session.get("logoImage");
},
});

// Template.postNew.events ({
//   'click #select_logo_btn': () => {
//       $('#myFileInput').trigger("click");
//     },
// });

AutoForm.hooks({
  'postForm': {
    before: {
      insert: function(doc) {
        doc.createdAt = new Date();
        var photo = Session.get("logoImage");
        doc.image = photo;
        console.log(photo);
        // console.log(doc);
        return doc;
      }
    },
    onSuccess: function (operation, result, template) {
      console.log(operation + ' successfully!');

      var sendPostNotificationToAll = function(error, post) {
        var title       = post.title;
        var pic         = post.image;
            pic         += "?imageView2/2/w/640";
            console.log(pic);
        var time        = post.createdAt;
        var authorName  = post.authorName;
        var desc        = post.description;
        var url         = "http://" + Meteor.settings.public.subdomainName + ".maodou.io/posts/" + post._id;

        var content = {
          title         : title,
          pic           : pic,
          time          : moment(time).format('YYYY-MM-DD hh:mm'),
          authorName    : authorName,
          desc          : desc,
          url           : url
        };

        var appId = Meteor.settings.public.AppId;
        var appSecret = Meteor.settings.public.AppSecret;

        Meteor.call("sendFormattedMessageToAll", appId, appSecret, content);
      }

      Meteor.call("getPostInfo", result, sendPostNotificationToAll);

      // Router.go('postShow', {_id: this.docId});
      window.location.href = "/posts/"+this.docId;
    },
    onError: function(operation, error, template) {
      console.log(error);
    }
  }
});
