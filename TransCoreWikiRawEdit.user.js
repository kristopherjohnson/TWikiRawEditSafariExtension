// ==UserScript==
// @name TransCore Twiki Raw Edit Button
// @namespace http://kristopherjohnson.net/userscript
// @description Changes the Edit button so that it opens Raw Edit rather than WYSIWYG
// @include https://atl-tech-ctr.transcore.com/twiki/bin/view/*
// @include https://atl-tech-ctr.transcore.com/twiki/
// @include http://cvs.tcore.com/twiki/bin/view/*
// @include http://cvs.tcore.com/twiki/
// ==/UserScript==

var changeEditLinks = function() {
    var editLinks = document.evaluate(
        "//a[@title='Edit this topic text']",
        document,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null);

    // There will actually be two matching elements, one
    // at the top of the page and one at the bottom.
    // We'll change the top one, so that the bottom
    // one is still a WYSIWYG editor.

    if (editLinks.snapshotLength > 0) {
        var editLink = editLinks.snapshotItem(0);
        editLink.href += ';nowysiwyg=1';
        editLink.title = 'Raw Edit this topic text';
        editLink.accessKey = 'w';
        editLink.innerHTML = 'Edit';
    }
}

// Changing the links doesn't work if we let this
// run at the document-idle event, so we'll wait a
// bit and then make the change.

window.setTimeout(changeEditLinks, 100);

