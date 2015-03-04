var BookStoreApp = new Marionette.Application();

var BookStoreController = Marionette.Controller.extend({
  displayBooks: function() {
    console.log('I will display books...');
  }
});

var BookStoreRouter = Marionette.AppRouter.extend({
  appRoutes: {
    '': 'displayBooks'
  }
});

BookStoreApp.addInitializer(function () {
  var controller = new BookStoreController();
  var router = new BookStoreRouter({controller: controller});
  console.log('Message from the addInitializer Method');
})

BookStoreApp.on('start', function () {
  if (Backbone.history) {
    Backbone.history.start();
  }
  console.log('Message from initialize:after method');
});

var BookModel = Backbone.Model.extend({
  defaults: {
    id: 0,
    name: ''
  }
});

var BookCollection = Backbone.Collection.extend({
  model: BookModel
});

var BookItemView = Marionette.ItemView.extend({
  template: '#books-template',
})

BookStoreApp.start();

$(function() {
  var booksCollection = new BookCollection([
    { id: 1, name: 'First' },
    { id: 2, name: 'Second' },
    { id: 3, name: 'Third' }
  ]);


  var vent = new Backbone.Wreqr.EventAggregator();
  vent.on("my_event", function(){
    console.log("im logging a message");
  });
  vent.trigger("my_event");


  var booksView = new BookItemView({ collection: booksCollection, el: '#application' })
  booksView.render();
})

