import Ember from 'ember';
import QUnit from 'qunit';

function normalizeColour(color) {
  let $el        = Ember.$('<div />').css('color', color).appendTo('body'),
      normalized = window.getComputedStyle($el[0]).color;

  $el.remove();

  return normalized;
}

QUnit.extend(QUnit.assert, {

  backgroundColourEqual(el, value) {
    return this.styleEqual(el, 'background-color', normalizeColour(value));
  },

  colourEqual(el, value) {
    return this.styleEqual(el, 'color', normalizeColour(value));
  },

  styleEqual(el, property, value) {
    let actual = window.getComputedStyle(el).getPropertyValue(property);
    return this.equal(actual, value, `${ property }: ${ value };`);
  }

});
