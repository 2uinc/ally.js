define([
  'intern!object',
  'intern/chai!expect',
  '../helper/dispatch-event',
  'ally/observe/interaction-type',
], function(registerSuite, expect, dispatchEvent, observeInteractionType) {

  registerSuite(function() {
    var handle;

    return {
      name: 'observe/interaction-type',

      afterEach: function() {
        // make sure a failed test cannot leave listeners behind
        handle && handle.disengage({force: true});
      },

      lifecycle: function() {
        handle = observeInteractionType();
        expect(handle.disengage).to.be.a('function');
        expect(handle.get).to.be.a('function');

        var type = handle.get();
        expect(type.pointer).to.equal(false, 'initial pointer');
        expect(type.key).to.equal(false, 'initial key');
      },
      'detect mouse': function() {
        var deferred = this.async(10000);
        handle = observeInteractionType();

        var type = handle.get();
        expect(type.pointer).to.equal(false, 'initial pointer');
        expect(type.key).to.equal(false, 'initial key');

        dispatchEvent.mouse(document.documentElement, 'mousedown', {});
        type = handle.get();
        expect(type.pointer).to.equal(true, 'pointer-down pointer');
        expect(type.key).to.equal(false, 'pointer-down key');

        dispatchEvent.mouse(document.documentElement, 'mouseup', {});
        type = handle.get();
        expect(type.pointer).to.equal(true, 'pointer-up pointer');
        expect(type.key).to.equal(false, 'pointer-up key');

        setTimeout(deferred.callback(function() {
          type = handle.get();
          expect(type.pointer).to.equal(false, 'pointer-up pointer delayed');
          expect(type.key).to.equal(false, 'pointer-up key delayed');
        }), 20);
      },
      'detect key': function() {
        var supportsSynthEvent = dispatchEvent.createKey('keydown', {
          key: 'Tab',
          keyCode: 9,
        });

        if (supportsSynthEvent.keyCode !== 9) {
          this.skip('Synthetic Tab events not supported');
        }

        var deferred = this.async(10000);
        handle = observeInteractionType();

        var type = handle.get();
        expect(type.pointer).to.equal(false, 'initial pointer');
        expect(type.key).to.equal(false, 'initial key');

        dispatchEvent.key(document.documentElement, 'keydown', {
          key: 'Tab',
          keyCode: 9,
        });
        type = handle.get();
        expect(type.pointer).to.equal(false, 'key-down pointer');
        expect(type.key).to.equal(true, 'key-down key');

        dispatchEvent.key(document.documentElement, 'keyup', {
          key: 'Tab',
          keyCode: 9,
        });
        type = handle.get();
        expect(type.pointer).to.equal(false, 'key-up pointer');
        expect(type.key).to.equal(true, 'key-up key');

        setTimeout(deferred.callback(function() {
          type = handle.get();
          expect(type.pointer).to.equal(false, 'key-up pointer delayed');
          expect(type.key).to.equal(false, 'key-up key delayed');
        }), 20);
      },
      'skip modifier key': function() {
        var spaceKey = {
          key: 'Space',
          keyCode: 16,
        };

        if (dispatchEvent.key(null, 'keydown', spaceKey).keyCode !== 16) {
          this.skip('Synthetic shift event not detectable');
        }

        handle = observeInteractionType();

        var type = handle.get();
        expect(type.pointer).to.equal(false, 'initial pointer');
        expect(type.key).to.equal(false, 'initial key');

        dispatchEvent.key(document.documentElement, 'keydown', spaceKey);
        type = handle.get();
        expect(type.pointer).to.equal(false, 'key-down pointer');
        expect(type.key).to.equal(false, 'key-down key');

        dispatchEvent.key(document.documentElement, 'keyup', spaceKey);
        type = handle.get();
        expect(type.pointer).to.equal(false, 'key-up pointer');
        expect(type.key).to.equal(false, 'key-up key');
      },
    };
  });
});
