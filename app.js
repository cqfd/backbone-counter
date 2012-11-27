$(function() {

  // Our model.
  var ClickCount = function() {
    var count = 0;
    this.increment = function() {
      count += 1;
      this.trigger('increment', count);
    }
  };
  // Mixin Backbone.Events
  _.extend(ClickCount.prototype, Backbone.Events);

  // Our view (aka controller), which governs the body DOM 
  // element (aka view)
  var ClickCountView = Backbone.View.extend({
    el: 'body',

    // An instance of the view gets a reference to an instance of
    // the model, and binds a callback to the model's 'increment'
    // event.
    initialize: function() {
      this.clickCounter = new ClickCount;
      this.clickCounter.on('increment', this.drawUpdatedCount, this);
    },

    // User interaction begins with clicks on the DOM, which flow
    // through this view (aka controller)
    events: {
      'click' : 'handleClick'
    },

    // When the user clicks on the body DOM element (aka view), the
    // view (aka controller) tells its model to increment. The view does
    // nothing to the DOM yet.
    handleClick: function() {
      this.clickCounter.increment();
    },

    // The view (aka controller) listens for 'increment' events from its
    // model. This is the only time when the view (aka controller) 
    // communicates with the DOM (aka the view).
    drawUpdatedCount: function(count) {
      $('#clickCount').html(count);
    }
  });

  clickCountView = new ClickCountView;
});
