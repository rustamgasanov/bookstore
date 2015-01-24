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

var BookModel = Backbone.Model.extend({
  defaults: {
    id: 0,
    name: ''
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
  // var bookModel1 = new BookModel({ id: 1, name: 'First' });
  // var bookModel2 = new BookModel({ id: 2, name: 'Second' });
  // var bookModel3 = new BookModel({ id: 3, name: 'Third' });
  // var booksCollection = new BookCollection();
  // booksCollection.add(bookModel1);
  // booksCollection.add(bookModel2);
  // booksCollection.add(bookModel3);
  // OR JUST
  var booksCollection = new BookCollection([
    { id: 1, name: 'First' },
    { id: 2, name: 'Second' },
    { id: 3, name: 'Third' }
  ]);

  var booksView = new BookListView({ collection: booksCollection, el: '#application' })
  booksView.render();
})

