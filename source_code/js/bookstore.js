var BookStoreApp = new Backbone.Marionette.Application();

var BookStoreController = Backbone.Marionette.Controller.extend({
  displayBooks: function() {
    console.log("I will display books...");
  }
});

var BookStoreRouter = Backbone.Marionette.AppRouter.extend({
  controller: BookStoreController,
  appRoutes: {
    "": "displayBooks"
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

BookStoreApp.start();
