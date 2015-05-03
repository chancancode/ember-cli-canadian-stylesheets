import Ember from 'ember';
import { module, test } from 'qunit';
import '../helpers/assert-style';
import startApp from 'dummy/tests/helpers/start-app';

var application;

module('Canadian Stylesheets acceptance tests', {
  beforeEach() {
    application = startApp();
  },

  afterEach() {
    Ember.run(application, 'destroy');
  }
});

test('check that the default rules are applied correctly', function(assert) {
  visit('/');

  andThen(function() {
    let $el = Ember.$('#acceptance-test');

    assert.backgroundColourEqual($el[0], 'blue');
    assert.colourEqual($el[0], 'white');

    let $godfrey = $el.find('#godfrey');

    assert.backgroundColourEqual($godfrey[0], 'yellow');
    assert.colourEqual($godfrey[0], 'white');

    let $niceDay = $el.find('#have-a-nice-day');

    assert.backgroundColourEqual($niceDay[0], 'transparent');
    assert.colourEqual($niceDay[0], 'white');
  });
});

test('check that the normal overrides are applied correctly', function(assert) {
  visit('/');

  andThen(function() {
    let $el = Ember.$('#acceptance-test').addClass('normal-override');

    assert.backgroundColourEqual($el[0], 'red');
    assert.colourEqual($el[0], 'white');

    let $godfrey = $el.find('#godfrey');

    assert.backgroundColourEqual($godfrey[0], 'dimgrey');
    assert.colourEqual($godfrey[0], 'white');

    let $niceDay = $el.find('#have-a-nice-day');

    assert.backgroundColourEqual($niceDay[0], 'dimgrey');
    assert.colourEqual($niceDay[0], 'salmon');
  });
});

test('check that the Canadian overrides are applied correctly', function(assert) {
  visit('/');

  andThen(function() {
    let $el = Ember.$('#acceptance-test').addClass('canadian-override');

    assert.backgroundColourEqual($el[0], 'red');
    assert.colourEqual($el[0], 'white');

    let $godfrey = $el.find('#godfrey');

    assert.backgroundColourEqual($godfrey[0], 'dimgrey');
    assert.colourEqual($godfrey[0], 'white');

    let $niceDay = $el.find('#have-a-nice-day');

    assert.backgroundColourEqual($niceDay[0], 'dimgrey');
    assert.colourEqual($niceDay[0], 'salmon');
  });
});
