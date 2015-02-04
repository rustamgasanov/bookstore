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

var HelperView = Backbone.Marionette.ItemView.extend({
  template: '#sample-template2',
    events: {
      'click #myButton4': 'changeColor',
      'click #myButton5': 'logSomething'
    },

    logSomething: function (){
      console.log('something');
    },

    changeColor: function (){
      var hue = 'rgb(' + (Math.floor(Math.random() * 256)) +
                   ',' + (Math.floor(Math.random() * 256)) +
                   ',' + (Math.floor(Math.random() * 256)) + ')';
      this.$('#dummy').css('color', hue);
    }
});

var SampleView = Backbone.Marionette.ItemView.extend({
    template : '#sample-template',

    initialize: function() {
      this.container = new Backbone.ChildViewContainer();
    },

    events: {
      'click #myButton': 'addView',
      'click #myButton2': 'callChangeColorinViews',
      'click #myButton3': 'countViews' 
    },

    addView: function() {
      var helperView = new HelperView();
      helperView.render();
      this.$el.append(helperView.el);
      this.container.add(helperView);
    },

    callChangeColorinViews: function() {
      this.container.each(function(view){
          view.changeColor();
      });
    },

    countViews: function() {
      this.$('#existentViews').text('currently we have ' + ' ' +
        this.container.length + ' ' + ' views in the container.');
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
  var sampleView = new SampleView({el: '#container'});
  sampleView.render();
})

