var BookStoreApp = new Marionette.Application();

BookStoreApp.addRegions({
  mainRegion: '#application'
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

var HelperView = Backbone.Marionette.ItemView.extend({
  template: '#sample-template-2',

  ui: {
    dummy: '#dummy'
  },

  events: {
    'click #my-button-4': 'changeColor',
    'click #my-button-5': 'logSomething'
  },

  logSomething: function (){
    console.log('something');
  },

  changeColor: function (){
    var hue = 'rgb(' + (Math.floor(Math.random() * 256)) +
                 ',' + (Math.floor(Math.random() * 256)) +
                 ',' + (Math.floor(Math.random() * 256)) + ')';
    this.ui.dummy.css('color', hue);
  }
});

var SampleView = Backbone.Marionette.ItemView.extend({
    template: '#sample-template-1',

    initialize: function() {
      this.container = new Backbone.ChildViewContainer();
    },

    events: {
      'click #my-button-1': 'addView',
      'click #my-button-2': 'callChangeColorinViews',
      'click #my-button-3': 'countViews' 
    },

    addView: function() {
      var helperView = new HelperView();
      helperView.render();
      this.$el.append(helperView.el);
      // this.container.add(helperView);
    },

    callChangeColorinViews: function() {
      this.container.each(function(view){
          view.changeColor();
      });
    },

    countViews: function() {
      this.$('#existing-views').text('currently we have ' +
        this.container.length + ' views in the container.');
    }
});

BookStoreApp.start();

$(function() {
  var sampleView = new SampleView({el: '#container'});
  sampleView.render();
})

