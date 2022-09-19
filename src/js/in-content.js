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
    document.head.innerHTML = document.head.innerHTML + '<style type="text/css">*{transition: 500ms;}</style>'
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
        const list3 = document.querySelectorAll("iframe");
        for (let i = 0; i < list3.length; i++) {
            list3[i].style.filter = "saturate(500%)";
            list3[i].style.mixBlendMode = "lighten";
        }
    }
    else if(message == 1){
        const list = document.querySelectorAll("embed");
        for (let i = 0; i < list.length; i++) {
            list[i].style.filter = "brightness(150%)";
        }
        const list2 = document.querySelectorAll("video");
        for (let i = 0; i < list2.length; i++) {
            list2[i].style.filter = "brightness(150%)";
        }
        const list3 = document.querySelectorAll("iframe");
        for (let i = 0; i < list3.length; i++) {
            list3[i].style.filter = "brightness(150%)";
        }

    }
    else if(message == 2){
        const list = document.querySelectorAll("embed");
        for (let i = 0; i < list.length; i++) {
            list[i].style.filter = "contrast(150%)";
        }
        const list2 = document.querySelectorAll("video");
        for (let i = 0; i < list2.length; i++) {
            list2[i].style.filter = "contrast(150%)";
        }
        const list3 = document.querySelectorAll("iframe");
        for (let i = 0; i < list3.length; i++) {
            list3[i].style.filter = "contrast(150%)";
        }

    }
    else if(message == 3){
        const list = document.querySelectorAll("embed");
        for (let i = 0; i < list.length; i++) {
            list[i].style.filter = "brightness(50%)";
        }
        const list2 = document.querySelectorAll("video");
        for (let i = 0; i < list2.length; i++) {
            list2[i].style.filter = "brightness(50%)";
        }
        const list3 = document.querySelectorAll("iframe");
        for (let i = 0; i < list3.length; i++) {
            list3[i].style.filter = "brightness(50%)";
        }

    }
    else if(message == 4){
        const list = document.querySelectorAll("embed");
        for (let i = 0; i < list.length; i++) {
            list[i].style.filter = "none";
        }
        const list2 = document.querySelectorAll("video");
        for (let i = 0; i < list2.length; i++) {
            list2[i].style.filter = "none";
        }
        const list3 = document.querySelectorAll("iframe");
        for (let i = 0; i < list3.length; i++) {
            list3[i].style.filter = "none";
        }

    }
    else if(message == 5){

        const list = document.querySelectorAll("embed");
        for (let i = 0; i < list.length; i++) {
            list[i].style.filter = "blur(10px)";
        }
        const list2 = document.querySelectorAll("video");
        for (let i = 0; i < list2.length; i++) {
            list2[i].style.filter = "blur(10px)";
        }
        const list3 = document.querySelectorAll("iframe");
        for (let i = 0; i < list3.length; i++) {
            list3[i].style.filter = "blur(10px)";
        }
    }

    else if(message == 6){
        const list1 = document.getElementById("movie_player")
        list1.style.borderRadius = "16px";
        list1.style.boxShadow = "3px 3px 10px 1px rgba(0,0,0,0.5)";
        list1.addEventListener("mouseover", () => {list1.style.transform = "scale(1.015)"});
        list1.addEventListener("mouseout", () => {list1.style.transform = "scale(1)"});
        const list = document.querySelectorAll(".ytd-subscribe-button-renderer")
        for (let i = 0; i < list.length; i++) {
            list[i].style.borderRadius = "500px";
        }



    }

};


// Start scripts after setting up the connection to popup
chrome.extension.onConnect.addListener(popupPort => {
    // Listen for popup messages
    popupPort.onMessage.addListener(popupMessageHandler);

    // Set listener for disconnection (aka. popup closed)
    //popupPort.onDisconnect.addListener(() => {
    //    console.log('in-content.js - disconnected from popup');
    //
    //});

    // Make popup port accessible to other methods
    port = popupPort;
    // Perform any logic or set listeners
    sendPortMessage('message from in-content.js');
});

//const handleBackgroundResponse = response =>
//    console.log('in-content.js - Received response:', response);

chrome.runtime.sendMessage('Message from in-content.js!', handleBackgroundResponse);
