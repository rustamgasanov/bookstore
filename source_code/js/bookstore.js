var BookStoreApp = new Marionette.Application();

var BookStoreController = Marionette.Controller.extend({
  displayBooks: function() { }
});

var BookStoreRouter = Marionette.AppRouter.extend({
  appRoutes: { '': 'displayBooks' }
});

BookStoreApp.addInitializer(function () {
  var controller = new BookStoreController();
  var router = new BookStoreRouter({controller: controller});
})

BookStoreApp.on('start', function () {
  if (Backbone.history) {
    Backbone.history.start();
  }
});

var BookModel = Backbone.Model.extend({
  defaults: {
    id: 0,
    name: ''
  }
});

var BookItemView = Marionette.ItemView.extend({
  el: '#application',
  // template: '#books-template'
  template : Handlebars.compile($('#books-template').html())
})

BookStoreApp.start();

$(function() {
  var book = new BookModel({ id: 1, name: 'First Book' });
  var booksView = new BookItemView({ model: book })
  booksView.render();
})

