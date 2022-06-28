/* in-content.js
*
* This file has an example on how to communicate with other parts of the extension through a long lived connection (port) and also through short lived connections (chrome.runtime.sendMessage).
*
* Note that in this scenario the port is open from the popup, but other extensions may open it from the background page or not even have either background.js or popup.js.
* */

// Extension port to communicate with the popup, also helps detecting when it closes
let port = null;

// Send messages to the open port (Popup)
const sendPortMessage = data => port.postMessage(data);

// Handle incoming popup messages
const popupMessageHandler = message => {

    console.log('in-content.js - message from popup:', message);
    console.log('testhaci');

    if(message == 0){
        const list = document.querySelectorAll("embed");
        for (let i = 0; i < list.length; i++) {
            list[i].style.filter = "saturate(500%)";
            list[i].style.mixBlendMode = "lighten";
        }
        const list2 = document.querySelectorAll("video");
        for (let i = 0; i < list2.length; i++) {
            list2[i].style.filter = "saturate(500%)";
            list2[i].style.mixBlendMode = "lighten";
        }
    }
    else if(message == 1){
        const list = document.querySelectorAll("embed");
        for (let i = 0; i < list.length; i++) {
            list[i].style.filter = "saturate(100%)";
            list[i].style.mixBlendMode = "lighten";
        }
        const list2 = document.querySelectorAll("video");
        for (let i = 0; i < list2.length; i++) {
            list2[i].style.filter = "saturate(100%)";
            list2[i].style.mixBlendMode = "lighten";
        }
    }
};

// Start scripts after setting up the connection to popup
chrome.extension.onConnect.addListener(popupPort => {
    // Listen for popup messages
    popupPort.onMessage.addListener(popupMessageHandler);
    // Set listener for disconnection (aka. popup closed)
    popupPort.onDisconnect.addListener(() => {
        console.log('in-content.js - disconnected from popup');

    });
    // Make popup port accessible to other methods
    port = popupPort;
    // Perform any logic or set listeners
    sendPortMessage('message from in-content.js');
});

// Response handler for short lived messages
const handleBackgroundResponse = response =>
    console.log('in-content.js - Received response:', response);
    console.log("abccba");
// Send a message to background.js
chrome.runtime.sendMessage('Message from in-content.js!', handleBackgroundResponse);
