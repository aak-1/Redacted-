/* File: content.js
 * ---------------
 * Hello! You'll be making most of your changes
 * in this file. At a high level, this code replaces
 * the substring "cal" with the string "butt" on web pages.
 *
 * This file contains javascript code that is executed
 * everytime a webpage loads over HTTP or HTTPS.


var elements = document.getElementsByTagName('*');

var getdata;

chrome.storage.local.get("variable", function (data) {
    getdata = data.variable;
    console.log(getdata);
    // use getdata in your content script
    chrome.storage.local.remove("variable");// this is optional

    for (var d = 0; d < getdata.length; d++){
        var word = getdata[d];
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            for (var j = 0; j < element.childNodes.length; j++) {
                var node = element.childNodes[j];
                if (node.nodeType === word.length) {
                    var text = node.nodeValue;
                    var replacedText = text.replace(/${word}/gi, "[replaced]"); // replaces "cal," "Cal", etc. with "butt"
                    if (replacedText !== text) {
                        element.replaceChild(document.createTextNode(replacedText), node);
                    }
                }
            }
        }
    }
});
*/


const arrayToRegex = array => new RegExp(`(^|\\b)(${array.join('|')})($|\\b)`, 'gi');
const redact = () => '[replaced]';
const iterate_node = (node, testRegex, replaceFunc) => {
    if (node.nodeType === 3) {
        let text = node.data.replace(testRegex, replaceFunc);
        if (text != node.data)
            node.data = text;
    } else if (node.nodeType === 1 || node.nodeType === 9)
        for (let i = 0; i < node.childNodes.length; i++)
            iterate_node(node.childNodes[i], testRegex, replaceFunc);
}
const redact_node = (node, array) => iterate_node(node, arrayToRegex(array), redact);

redact_node(document, prompt('input comma separated words').split(',').map(e=>e.trim()));



/*
const cb = str => {
    const arrayToRegex = array => new RegExp(`(^|\\b)(${array.join('|')})($|\\b)`, 'gi');
    const redact = () => '[replaced]';
    const iterate_node = (node, testRegex, replaceFunc) => {
        if (node.nodeType === 3) {
            let text = node.data.replace(testRegex, replaceFunc);
            if (text != node.data)
                node.data = text;
        } else if (node.nodeType === 1 || node.nodeType === 9)
            for (let i = 0; i < node.childNodes.length; i++)
                iterate_node(node.childNodes[i], testRegex, replaceFunc);
    }
    const redact_node = (node, array) => {
        if (array.length == 0) return;
        iterate_node(node, arrayToRegex(array), redact);
    }
    redact_node(document, str.split(',').map(e=>e.trim()).filter(e=>e.length>0));
}

const w = window.open("", "Name", `width=400,height=400`);
w.cb = cb
w.document.body.innerHTML = `
    <input style="width:80vw" id="words" placeholder="Insert comma separated words..." /><br>
    <button onclick="window.cb(document.getElementById('words').value);window.close();">Submit</button>
`;*/