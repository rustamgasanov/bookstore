var BookStoreApp = new Marionette.Application();
BookStoreApp.addRegions({
  mainRegion: "#application"
})

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

var CatalogLayoutView = Marionette.LayoutView.extend({
  template: '#catalog-layout',
  regions: {
    categories: '#categories',
    products: '#products',
    order: '#order',
    book: '#book'
  }
})

BookStoreApp.start();

$(function() {
  var catalogLayoutView = new CatalogLayoutView();
  BookStoreApp.mainRegion.show(catalogLayoutView);
  var categoriesCollection = new CategoriesCollection([
    { name: 'category1', booksOnCategory: 5 },
    { name: 'category2', booksOnCategory: 10 }
  ]);
  catalogLayoutView.categories.show(new CategoriesView(
      { collection: categoriesCollection }
    )
  );

  var regionManager = new Marionette.RegionManager();
  regionManager.addRegion('math', '#math');
  regionManager.get('math').show(new CategoriesView(
      { collection: categoriesCollection }
    )
  );
})

