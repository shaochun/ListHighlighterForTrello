chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(request);
    if (request.toggledOff) {
		chrome.browserAction.setIcon({path: '/img/buttonIconDehighlighted.png'});
	} else {
		chrome.browserAction.setIcon({path: '/img/buttonIcon.png'});
	}
});
