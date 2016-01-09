define([
  'intern!object',
  'intern/chai!expect',
  '../helper/fixtures/shadow-input.fixture',
  'ally/get/active-elements',
], function(registerSuite, expect, shadowInputFixture, getActiveElements) {

  registerSuite(function() {
    var fixture;

    return {
      name: 'get/active-elements',

      beforeEach: function() {
        fixture = shadowInputFixture();
      },
      afterEach: function() {
        fixture.remove();
        fixture = null;
      },

      'inactive document': function() {
        var active = getActiveElements();
        expect(active.length).to.equal(1);
        // Internet Explorer 10 may think it's <html> rather than <body>
        if (active[0] === document.documentElement) {
          expect(active[0]).to.equal(document.documentElement);
        } else {
          expect(active[0]).to.equal(document.body);
        }
      },
      'active in document': function() {
        fixture.input.outer.focus();
        var active = getActiveElements();
        expect(active.length).to.equal(1);
        expect(active[0]).to.equal(document.activeElement);
      },
      'active in ShadowHost': function() {
        if (!fixture.shadow.first) {
          this.skip('Shadow DOM not supported');
        }

        fixture.input.first.focus();
        var active = getActiveElements();
        expect(active.length).to.equal(2);
        expect(active[0]).to.equal(fixture.input.first);
        expect(active[1]).to.equal(fixture.shadow.first);
      },
      'active in nested ShadowHost': function() {
        if (!fixture.shadow.first) {
          this.skip('Shadow DOM not supported');
        }

        fixture.input.second.focus();
        var active = getActiveElements();
        expect(active.length).to.equal(3);
        expect(active[0]).to.equal(fixture.input.second);
        expect(active[1]).to.equal(fixture.shadow.second);
        expect(active[2]).to.equal(fixture.shadow.first);
      },
    };
  });
});
