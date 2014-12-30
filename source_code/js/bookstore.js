var BookStoreApp = new Backbone.Marionette.Application();

var BookStoreController = Backbone.Marionette.Controller.extend({
  displayBooks: function() {
    console.log("I will display books...");
  }
});

var BookStoreRouter = Backbone.Marionette.AppRouter.extend({
  controller: BookStoreController,
    appRoutes: {
￼￼￼￼￼ "": "displayBooks"
    }
});

BookStoreApp.addInitializer(function () {
  var bookStoreController = new BookStoreController({
    var bookStoreRouter = new BookStoreRouter({controller: controller});
    console.log('Message from the addInitializer Method');
  });
})

BookStoreApp.on('initialize:after', function () {
  if (Backbone.history) {
    Backbone.history.start();
  }
  console.log('Mesagge from initialize:after method');
});

BookStoreApp.start();
