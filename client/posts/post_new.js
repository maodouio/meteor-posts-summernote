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
        var time        = post.createdAt;
        var authorName  = post.authorName;
        var desc        = post.description;
        var url         = "http://" + Meteor.settings.public.subdomainName + ".maodou.io/posts/" + post._id;

        var content = {
          "touser": "temp",
          "msgtype": "news",
          "news": {
            "articles": [
              {
                "title": title,
                "description": desc,
                "url": url,
                "picurl": pic
              },
              {
                "title":"时间：" + content.time + "\n地点：" + content.where + "\n",
                "description": "",
                "url": content.url,
                "picurl": ""
              }
            ]
          }
        };

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
