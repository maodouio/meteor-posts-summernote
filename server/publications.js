// ***************************************************************
// PUBLICATIONS (For Documents collection)
// ***************************************************************

// DOCUMENTS INDEX
// -------------------------------------------------------
Meteor.publish('posts', function() {
  return Posts.find();
});

// DOCUMENT SHOW
// -------------------------------------------------------
Meteor.publish('post', function(id) {
  return Posts.find(id);
});
