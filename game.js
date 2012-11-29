$(function() {

  Game = function(cards) {
    this.cards = cards;
    this.q = [];
    this.flip = function(i) {
      var card = this.cards[i];
      if (this.q.length == 0) {
        this.q.push(i);
        return i;
      }
      else {
        var j = this.q.pop();
        if (card == this.cards[j]) {
          return [i, j];
        }
        else {
          return i;
        }
      }
    };
  };

  GameView = Backbone.View.extend({
    el: 'body',
    initialize: function(game) {
      this.game = game;
      this.cardViews = _.map(this.game.cards, function(card, idx) {
        return new CardView(card, idx);
      });
      _.each(this.cardViews, function(cardView) {
        cardView.hide();
        cardView.on('clicked', this.handleCardClicked, this);
      }, this);
    },
    render: function() {
      this.$el.empty();
      _.each(this.cardViews, function(cardView) {
        this.$el.append(cardView.render().el);
      }, this);
      return this;
    },
    handleCardClicked: function(card, idx) {
      var result = this.game.flip(idx);
      if (_.isArray(result)) {
        var i = result[0];
        var j = result[1];
        this.cardViews[i].show();
        this.cardViews[j].show();
      }
      else {
        console.log("result", result);
        this.cardViews[result].show(1);
      }
    }
  });

  CardView = Backbone.View.extend({
    events: {
      'click': 'handleClick'
    },
    initialize: function(card, idx) {
      this.card = card;
      this.idx = idx;
      this.isAlreadyVisible = true;
    },
    render: function() {
      this.$el.html(this.card);
      return this;
    },
    handleClick: function() {
      if (!this.isAlreadyVisible) {
        this.trigger('clicked', this.card, this.idx);
      }
    },
    show: function(seconds) {
      this.isAlreadyVisible = true;
      this.$el.css({opacity: 1});
      // Race condition!
      if (!_.isUndefined(seconds)) {
        var self = this;
        _.delay(function() {
          self.hide();
        }, seconds * 1000);
      }
    },
    hide: function() {
      this.isAlreadyVisible = false;
      this.$el.css({opacity: 0.1});
    }
  });

  
  var cards = _.shuffle(["foo", "bar", "baz", "foo", "bar", "baz"]);
  var game = new Game(cards);
  gameView = new GameView(game);
  gameView.render();
});
