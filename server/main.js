import { Meteor } from "meteor/meteor";

Todos = new Mongo.Collection("todos");

Meteor.publish("todos", function() {
  return Todos.find({});
});
