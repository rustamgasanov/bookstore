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

var CategoryModel = Backbone.Model.extend({
  defaults: {
    name: '',
    booksOnCategory: 0
  }
})

var CategoriesCollection = Backbone.Collection.extend({
  model: CategoryModel
})

var CategoryView = Marionette.ItemView.extend({
  tagName: 'li',
  template: '#category-template'
})

var CategoriesView = Marionette.CollectionView.extend({
  tagName: 'ul',
  className: 'unstyled',
  childView: CategoryView
})

BookStoreApp.start();

$(function() {
  var categoriesCollection = new CategoriesCollection([
    { name: 'Math', booksOnCategory: 3 },
    { name: 'Science', booksOnCategory: 4 },
    { name: 'History', booksOnCategory: 7 }
  ]);

  var categoriesView = new CategoriesView({ collection: categoriesCollection, el: '#application' })
  categoriesView.render();
})

