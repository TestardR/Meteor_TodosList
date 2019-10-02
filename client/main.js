import "./main.html";
import { Meteor } from "meteor/meteor";

Todos = new Mongo.Collection("todos");

Meteor.subscribe("todos");

Session.set("sortOrder", 1);

Template.todosList.helpers({
  todos: function() {
    return Todos.find({}, { sort: { createdAt: Session.get("sortOrder") } });
  }
});

Template.todosList.events({
  "click #reverse-sort": function() {
    Session.set("sortOrder", Session.get("sortOrder") * -1);
  },

  "submit #todo-form": function(event) {
    event.preventDefault();

    const todo = {
      label: $(event.target)
        .find("[name=label]")
        .val(),
      createdAt: new Date()
    };

    $(event.target)[0].reset();

    Todos.insert(todo);
  }
});

Template.todo.events({
  "click input": function() {
    const isDone = Todos.findOne({ _id: this._id }).done;
    Todos.update({ _id: this._id }, { $set: { done: !isDone } });
  },
  "click .delete": function() {
    Todos.remove({ _id: this._id });
  }
});

Template.todo.helpers({
  done: function() {
    return Todos.findOne({ _id: this._id }).done;
  }
});
