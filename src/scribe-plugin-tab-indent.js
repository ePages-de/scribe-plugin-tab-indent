(function () {
    'use strict';

    var scribePluginTabIndent = function () {
        return function (scribe) {
            scribe.el.addEventListener('keydown', function (event) {
                // tab pressed
                if (event.keyCode === 9) {
                    event.preventDefault();

                    // check if current selection is inside a list
                    var listActive =
                        scribe.getCommand('insertUnorderedList').queryState() ||
                        scribe.getCommand('insertOrderedList').queryState();

                    if (event.shiftKey) {
                        // when shift is also pressed do an outdent
                        scribe.getCommand('outdent').execute();
                    } else if (listActive) {
                        // when we are in a list indent it by one
                        scribe.getCommand('indent').execute();
                    }
                }
            });
        };
    };

    // Module system magic dance
    if (typeof module !== 'undefined') {
        module.exports = scribePluginTabIndent;
    } else if (typeof define === 'function' && typeof define.amd === 'object') {
        define(function () {
            return scribePluginTabIndent;
        });
    } else {
        window.scribePluginTabIndent = scribePluginTabIndent;
    }
}());
