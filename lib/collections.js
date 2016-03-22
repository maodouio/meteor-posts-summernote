// ***************************************************************
// DOCUMENTS COLLECTION
// ***************************************************************

Posts = new Meteor.Collection('posts');

PostSchema = new SimpleSchema({
  title: {
    type: String,
    label: "标题",
    max: 120,
    optional: false
  },
  authorName: {
    type: String,
    label: "作者",
    max: 120,
    optional: false
  },
  description: {
    type: String,
    label: "搞要",
    max: 120,
    optional: false
  },
  content: {
    type: String,
    label: "正文",
    autoform: {
      height: 150,
      afFieldInput: {
        type: 'summernote', 
        class: 'editor', 
        settings: {}// summernote options goes here
      }
    }
  },
  pageviewCounter: {
    type: Number,
    min: 0,
    defaultValue: 0,
  },
  createdAt: {
    type: Date,
    optional: true,
    denyUpdate: true,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      }
    }
  },
  updatedAt: {
    type: Date,
    optional: true,
    denyInsert: true,
    autoValue: function() {
      if (this.isUpdate) {
        return new Date();
      }
    }
  }
});

// Must remember to attach the schema to the collection
Posts.attachSchema(PostSchema);

// Custom validation messages with SimpleSchema. Remove if not needed
Posts.simpleSchema().messages({
  required: "[label] is required",
  minString: "[label] must be at least [min] characters",
  maxString: "[label] cannot exceed [max] characters",
  minNumber: "[label] must be at least [min]",
  maxNumber: "[label] cannot exceed [max]",
  minDate: "[label] must be on or before [min]",
  maxDate: "[label] cannot be after [max]",
  minCount: "You must specify at least [minCount] values",
  maxCount: "You cannot specify more than [maxCount] values",
  noDecimal: "[label] must be an integer",
  notAllowed: "[value] is not an allowed value",
  expectedString: "[label] must be a string",
  expectedNumber: "[label] must be a number",
  expectedBoolean: "[label] must be a boolean",
  expectedArray: "[label] must be an array",
  expectedObject: "[label] must be an object",
  expectedConstructor: "[label] must be a [type]",
  regEx: [
  {msg: "[label] failed regular expression validation"},
  {exp: SimpleSchema.RegEx.Email, msg: "[label] must be a valid e-mail address"},
  {exp: SimpleSchema.RegEx.WeakEmail, msg: "[label] must be a valid e-mail address"},
  {exp: SimpleSchema.RegEx.Domain, msg: "[label] must be a valid domain"},
  {exp: SimpleSchema.RegEx.WeakDomain, msg: "[label] must be a valid domain"},
  {exp: SimpleSchema.RegEx.IP, msg: "[label] must be a valid IPv4 or IPv6 address"},
  {exp: SimpleSchema.RegEx.IPv4, msg: "[label] must be a valid IPv4 address"},
  {exp: SimpleSchema.RegEx.IPv6, msg: "[label] must be a valid IPv6 address"},
  {exp: SimpleSchema.RegEx.Url, msg: "[label] must be a valid URL"},
  {exp: SimpleSchema.RegEx.Id, msg: "[label] must be a valid alphanumeric ID"}
  ],
  keyNotInSchema: "[label] is not allowed by the schema"
});

// Allow and deny rules
Posts.allow({
  insert: function (userId, doc) {
    // Free-for-all!
    return true;
  },
  update: function (userId, doc, fields, modifier) {
    // Free-for-all!
    return true;
  },
  remove: function (userId, doc) {
    // Free-for-all!
    return true;
  }
});

// Meteor methods related to collection
Meteor.methods({
  // someMethod: function(arg1, arg2) {
  //   return "some return value";
  // },
});
