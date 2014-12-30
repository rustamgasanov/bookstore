var bookStoreApp = new Backbone.Marionette.Application();

var BookStoreRouter = Backbone.Marionette.AppRouter.extend({
  controller:BookStoreController,
    appRoutes:{
￼￼￼￼￼ "": "displayBooks"
    }
});

var BookStoreController = Backbone.Marionette.Controller.extend({
  displayBooks:function(){
    console.log("I will display books...");
  }
});

