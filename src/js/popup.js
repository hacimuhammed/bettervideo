/* popup.js
 *
 * This file initializes its scripts after the popup has loaded.
 *
 * It shows how to access global variables from background.js.
 * Note that getViews could be used instead to access other scripts.
 *
 * A port to the active tab is open to send messages to its in-content.js script.
 *
 */

// Start the popup script, this could be anything from a simple script to a webapp
const initPopupScript = () => {

    const mainButton = document.getElementById('test');
    const brightMode = document.getElementById('brightMode');
    const contrastMode = document.getElementById('contrastMode');
    const darkMode = document.getElementById('darkMode');
    const normalMode = document.getElementById('normalMode');
    const focusMode = document.getElementById('focusMode');
    const youtubeMode = document.getElementById('youtubeMode')

    mainButton.addEventListener('click', ()=>{app(0);});
    brightMode.addEventListener('click', ()=>{app(1);});
    contrastMode.addEventListener('click', ()=>{app(2);});
    darkMode.addEventListener('click', ()=>{app(3);});
    normalMode.addEventListener('click', ()=>{app(4);});
    focusMode.addEventListener('click', ()=>{app(5);});
    youtubeMode.addEventListener('click', ()=>{app(6);});
};

function app(numb){
    // Access the background window object
const backgroundWindow = chrome.extension.getBackgroundPage();
// Do anything with the exposed variables from background.js
//console.log(backgroundWindow.sampleBackgroundGlobal);

// This port enables a long-lived connection to in-content.js
let port = null;

// Send messages to the open port
const sendPortMessage = message => port.postMessage(numb);

// Find the current active tab
const getTab = () =>
    new Promise(resolve => {
        chrome.tabs.query(
            {
                active: true,
                currentWindow: true
            },
            tabs => resolve(tabs[0])
        );
    });

// Handle port messages
const messageHandler = message => {
    console.log('popup.js - received message:', message);
};

// Find the current active tab, then open a port to it
getTab().then(tab => {
    // Connects to tab port to enable communication with inContent.js
    port = chrome.tabs.connect(tab.id, { name: 'chrome-extension-template' });
    // Set up the message listener
    port.onMessage.addListener(messageHandler);
    // Send a test message to in-content.js

    sendPortMessage('Message from popuptts!');
});
}



// Fire scripts after page has loaded
document.addEventListener('DOMContentLoaded', initPopupScript);