$(function() {

  // Our model.
  var ClickCount = function() {
    var count = 0;
    this.increment = function() {
      count += 1;
      return count;
    }
  };

  // Our view (aka controller), which governs the body DOM 
  // element (aka view)
  var ClickCountView = Backbone.View.extend({
    el: 'body',

    // An instance of the view gets a reference to an instance of
    // the model, and binds a callback to the model's 'increment'
    // event.
    initialize: function() {
      this.clickCounter = new ClickCount;
    },

    // User interaction begins with clicks on the DOM, which flow
    // through this view (aka controller)
    events: {
      'click' : 'handleClick'
    },

    // When the user clicks on the body DOM element (aka view), the
    // view (aka controller) tells its model to increment. The model
    // returns an updated count, which the view (aka controller) uses
    // to update the DOM.
    handleClick: function() {
      var count = this.clickCounter.increment();
      $('#clickCount').html(count);
    },
  });

  clickCountView = new ClickCountView;
});
