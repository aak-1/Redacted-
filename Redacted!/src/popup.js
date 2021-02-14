/* File: popup.js
 * -----------------------
 * This javascript file restores settings when the DOM loads.
 * You shouldn't have to change this file unless you also
 * change the corresponding popup.html file.
 */


//let words = []

document.addEventListener('DOMContentLoaded', function () {
    let btn = document.getElementById('submit');
    btn.addEventListener('click', add);

    let links = document.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        (function () {
            var ln = links[i];
            var location = ln.href;
            ln.onclick = function () {
                chrome.tabs.create({active: true, url: location});
            };
        })();
    }
});


/*
function add(){
    console.log(words);
    let userInput = document.getElementById('user-input').value;    
    console.log(userInput);
    words.push(userInput);
    console.log(words);

    chrome.storage.local.set({
        variable: words
    },
     function () {
    chrome.tabs.executeScript({
            file: "content.js"
        });
    });
    
}

*/