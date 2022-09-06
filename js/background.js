chrome.action.onClicked.addListener((tab) => {
	if (!tab.url.includes('chrome://')) {
		chrome.scripting.executeScript({
			target: {tabId: tab.id},
			function: popup,
		});
	}
});

function popup() {
	if (document.getElementById('superDev') !== null) {
		document.getElementById('superDev').remove();
	} else {
		let iframe = document.createElement('iframe');
		iframe.src = chrome.runtime.getURL('../popups/index.html');
		iframe.id = 'superDev';
		iframe.style.cssText =
			'position: fixed !important; animation-duration: 0.5s !important; animation-timing-function: ease-in-out !important; animation-fill-mode: forwards !important; top: 18px !important; right: 18px !important; box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.09) !important; width: 412px !important; height: 625px !important; border: 0 !important; border-radius: 8px !important; transition: 1s !important; transition-timing-function: ease-out; display: block !important; z-index: 99999999 !important;';
		document.body.appendChild(iframe);
	}
}
