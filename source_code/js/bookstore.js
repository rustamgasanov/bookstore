var BookStoreApp = new Marionette.Application();

var BookStoreController = Marionette.Controller.extend({
  displayBooks: function() {
    console.log('I will display books...');
  }
});

var BookModel = Backbone.Model.extend({
  defaults: {
    id: '1',
    name: 'First'
  }
});

var BookCollection = Backbone.Collection.extend({
  model: BookModel
});

var BookListView = Marionette.ItemView.extend({
  template: '#books-template',

  templateHelpers: {
    funcForView: function() {
      return "Random helper function value: " + Math.random();
    }
  }
})

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

BookStoreApp.start();

$(function() {
  var bookModel = new BookModel();
  var bookModel2 = new BookModel({ id: '2', name: 'Second' });
  var bookModel3 = new BookModel({ id: '3', name: 'Third' });
  var booksCollection = new BookCollection();
  booksCollection.add(bookModel);
  booksCollection.add(bookModel2);
  booksCollection.add(bookModel3);

  var view = new BookListView({ collection: booksCollection, el: '#application' })
  view.render();
})

