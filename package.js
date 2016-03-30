Package.describe({
  name: 'maodouio:posts-summernote',
  version: '0.0.3',
  // Brief, one-line summary of the package.
  summary: 'Maodou.io posts package with summernote, A meteor package that provides posts pages at /posts',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/maodouio/meteor-posts-summernote',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  // version
  // api.versionsFrom('1.2.0.2');
  // package

  //Failed in here!  api.use('jquery@1.11.4', ["server", "client"]);
  //Failed in here!  api.use('tracker@1.0.9', ["server", "client"]);
  api.use('momentjs:moment@2.12.0', ["server", "client"]);
  api.use('natestrauser:font-awesome@4.5.0', ["server", "client"]);

  api.use('iron:router@1.0.12', ["server", "client"]);
  api.use('aldeed:autoform@5.1.2', ["server", "client"]);
  api.use('aldeed:collection2@2.3.3', ["server", "client"]);
  api.use('aldeed:simple-schema@1.3.2', ["server", "client"]);
  api.use('matb33:collection-hooks@0.8.0', ["server", "client"]);
  api.use('mpowaga:autoform-summernote@0.4.2', ['client']);
  api.use('twbs:bootstrap@3.3.4', ["server", "client"]);
  api.use('maodouio:meteor-image-upload@0.0.1', ["server", "client"]);
  api.use('reywood:publish-composite@1.4.2', "server");

  // mongo and template
  // https://zh.discovermeteor.com/chapters/creating-a-meteor-package/
  api.use(['minimongo@1.0.10', 'mongo-livedata@1.0.9', 'templating@1.1.4'], 'client');

  api.use('fourseven:scss@3.4.1',['client']);
  // file
  // ls -l | awk '{print "api.addFiles(\""$9"\", \"client\");"}'
  api.addFiles('posts.js');
  api.addFiles('client/routes.js', 'client');
  api.addFiles("client/posts/post_edit.html", "client");
  api.addFiles("client/posts/post_edit.js", "client");
  api.addFiles("client/posts/post_new.html", "client");
  api.addFiles("client/posts/post_new.js", "client");
  api.addFiles("client/posts/post_show.html", "client");
  api.addFiles("client/posts/post_show.js", "client");
  // api.addFiles("client/posts/posts.html", "client");
  api.addFiles("client/posts/posts_index.html", "client");
  api.addFiles("client/posts/posts_index.js", "client");

  api.addFiles('lib/collections.js', ['server', 'client']);
  api.addFiles('lib/helper.js', ['client']);

  api.addFiles("server/publications.js", "server");
  api.addFiles("server/config.js", "server");

  api.addFiles("lib/stylesheet/postList_Item.scss", "client");
  api.export('Posts');
});
