chrome.runtime.onConnect.addListener(function (port) {
	port.onMessage.addListener(function (request) {
		switch (request.action) {
			case 'showHideExtension':
				showHideExtension(request.activeTab, port, request);
				break;
			case 'setPopupHeight':
				setPopupHeight(request.activeTab, port, request);
				break;
			case 'setPopupShadow':
				setPopupShadow(request.activeTab, port, request);
				break;
			case 'setFirstRender':
				setFirstRender(request.activeTab, port, request);
				break;
			case 'activateTextEditor':
				activateTextEditor(request.activeTab, port, request);
				break;
			case 'deactivateTextEditor':
				deactivateTextEditor(request.activeTab, port, request);
				break;
			case 'activatePageRuler':
				activatePageRuler(request.activeTab, port, request);
				break;
			case 'deactivatePageRuler':
				deactivatePageRuler(request.activeTab, port, request);
				break;
			case 'activateColorPicker':
				activateColorPicker(request.activeTab, port, request);
				break;
			case 'deactivateColorPicker':
				deactivateColorPicker(request.activeTab, port, request);
				break;
			case 'activateColorPalette':
				activateColorPalette(request.activeTab, port, request);
				break;
			case 'deactivateColorPalette':
				deactivateColorPalette(request.activeTab, port, request);
				break;
			case 'activatePageGuideline':
				activatePageGuideline(request.activeTab, port, request);
				break;
			case 'deactivatePageGuideline':
				deactivatePageGuideline(request.activeTab, port, request);
				break;
			case 'activatePageHighlight':
				activatePageHighlight(request.activeTab, port, request);
				break;
			case 'deactivatePageHighlight':
				deactivatePageHighlight(request.activeTab, port, request);
				break;
			case 'activateMoveElement':
				activateMoveElement(request.activeTab, port, request);
				break;
			case 'deactivateMoveElement':
				deactivateMoveElement(request.activeTab, port, request);
				break;
			case 'activateExportElement':
				activateExportElement(request.activeTab, port, request);
				break;
			case 'deactivateExportElement':
				deactivateExportElement(request.activeTab, port, request);
				break;
			case 'activateDeleteElement':
				activateDeleteElement(request.activeTab, port, request);
				break;
			case 'deactivateDeleteElement':
				deactivateDeleteElement(request.activeTab, port, request);
				break;
			case 'activateClearAllCache':
				activateClearAllCache(request.activeTab, port, request);
				break;
		}
	});
});

async function showHideExtension(activeTab, port, request) {
	if (document.contentType === 'text/html') {
		// If Popup Doesn't Exists, Create
		if (document.querySelector('#superDevWrapper') === null) {
			let superDev = document.createElement('body');
			superDev.id = 'superDev';
			superDev.style.cssText = `
			display: block !important;
			padding: 0 !important;
			margin: 0 !important;
			border: 0 !important;
			outline: 0 !important;
			background-color: transparent !important;
			box-sizing: border-box !important;
			overflow: hidden !important;
			visibility: hidden !important;
			width: 0px !important;
			height: 0px !important;`;

			let superDevWrapper = document.createElement('superdev-wrapper');
			superDevWrapper.id = 'superDevWrapper';
			superDevWrapper.style.cssText = `
			display: block !important;
			padding: 0 !important;
			margin: 0 !important;
			border: 0 !important;
			outline: 0 !important;
			background-color: transparent !important;
			box-sizing: border-box !important;
			overflow: hidden !important;

			position: fixed !important;
			top: 18px !important;
			right: 18px !important;
			visibility: hidden !important;
			width: 335px !important;
			border-radius: 8px !important;
			z-index: 2147483646 !important;`;

			let superDevHandler = document.createElement('superdev-handler');
			superDevHandler.id = 'superDevHandler';
			superDevHandler.style.cssText = `
			display: block !important;
			position: relative !important;
			padding: 0 !important;
			margin: 0 !important;
			border: 0 !important;
			outline: 0 !important;
			background-color: transparent !important;
			box-sizing: border-box !important;
			overflow: hidden !important;

			cursor: move !important;
			width: 18px !important;
			height: 38.5px !important;
			margin-left: 168px !important;
			margin-bottom: -38.5px !important;
			border-radius: 8px !important;
			z-index: 2147483647 !important;`;

			let superDevPopup = document.createElement('iframe');
			superDevPopup.src = chrome.runtime.getURL('index.html');
			superDevPopup.id = 'superDevPopup';
			superDevPopup.scrolling = 'no';
			superDevPopup.allow = 'clipboard-write';
			superDevPopup.style.cssText = `
			display: block !important;
			padding: 0 !important;
			margin: 0 !important;
			border: 0 !important;
			outline: 0 !important;
			background-color: transparent !important;
			box-sizing: border-box !important;
			overflow: hidden !important;

			width: 335px !important;
			border-radius: 8px !important;
			z-index: 2147483646 !important;`;

			document.documentElement.appendChild(superDev);
			superDev.appendChild(superDevWrapper);
			superDevWrapper.appendChild(superDevHandler);
			superDevWrapper.appendChild(superDevPopup);

			$('#superDevWrapper').draggable({
				handle: '#superDevHandler',
				iframeFix: true,
				containment: 'document',
			});
			port.postMessage({action: 'popupCreated'});
		}

		// If Popup Exists, Show/Hide
		else if (document.querySelector('#superDevWrapper') !== null) {
			let superDevWrapper = document.querySelector('#superDevWrapper');

			// If Popup Visible, Set Hidden
			if (superDevWrapper.style.getPropertyValue('visibility') !== 'hidden') {
				superDevWrapper.style.setProperty('visibility', 'hidden', 'important');
				await chrome.storage.local.set({['setHomePageActive' + activeTab[0].id]: true});
				await chrome.storage.local.set({['setActFeatDisabled' + activeTab[0].id]: true});
				port.postMessage({action: 'popupHidden'});
			}

			// If Popup Hidden, Set Visible
			else {
				// Reset on Visible
				await chrome.storage.local.set({['setHomePageActive' + activeTab[0].id]: false}); // True, False
				await chrome.storage.local.set({['setActFeatDisabled' + activeTab[0].id]: false}); // True, False
				await chrome.storage.local.set({['setPopupMinimised' + activeTab[0].id]: false}); // True, False
				await chrome.storage.local.set({['setPopupMaximised' + activeTab[0].id]: false}); // True, False
				await chrome.storage.local.set({['whichFeatureActive' + activeTab[0].id]: null}); // String, Null

				superDevWrapper.style.setProperty('top', '18px', 'important');
				superDevWrapper.style.setProperty('right', '18px', 'important');
				superDevWrapper.style.setProperty('bottom', '', 'important');
				superDevWrapper.style.setProperty('left', '', 'important');
				superDevWrapper.style.setProperty('visibility', 'visible', 'important');
				port.postMessage({action: 'popupVisible'});
			}
		}
	}
}

function setPopupHeight(activeTab, port, request) {
	let superDevPopup = document.querySelector('#superDevPopup');
	chrome.storage.local.get(['howLongPopupIs' + activeTab[0].id], async function (result) {
		if (result['howLongPopupIs' + activeTab[0].id] !== request.height) {
			await chrome.storage.local.set({['howLongPopupIs' + activeTab[0].id]: request.height});
			superDevPopup.style.setProperty('height', `${request.height}px`, 'important');
			port.postMessage({action: 'heightChanged'});
		}
	});
}

function setPopupShadow(activeTab, port, request) {
	let superDevWrapper = document.querySelector('#superDevWrapper');
	chrome.storage.local.get(['colorTheme'], async function (result) {
		if (result['colorTheme'] === 'dark') {
			superDevWrapper.style.setProperty('box-shadow', `rgb(0 0 0 / 12%) 0px 0px 8px 0px, rgb(0 0 0 / 24%) 0px 4px 8px 0px`, 'important');
			port.postMessage({action: 'shadowChanged'});
		} else if (result['colorTheme'] === 'light') {
			superDevWrapper.style.setProperty('box-shadow', `rgb(0 0 0 / 6%) 0px 0px 8px 0px, rgb(0 0 0 / 12%) 0px 4px 8px 0px`, 'important');
			port.postMessage({action: 'shadowChanged'});
		}
	});
}

function setFirstRender(activeTab, port, request) {
	let superDevWrapper = document.querySelector('#superDevWrapper');
	let superDevPopup = document.querySelector('#superDevPopup');

	// Height + Shadow + Visible
	requestAnimationFrame(function () {
		requestAnimationFrame(function () {
			chrome.storage.local.get(['howLongPopupIs' + activeTab[0].id], async function (result) {
				if (result['howLongPopupIs' + activeTab[0].id] !== request.height) {
					await chrome.storage.local.set({['howLongPopupIs' + activeTab[0].id]: request.height});
					superDevPopup.style.setProperty('height', `${request.height}px`, 'important');
					port.postMessage({action: 'firstRenderHeightChanged'});
				}
			});
			requestAnimationFrame(function () {
				requestAnimationFrame(function () {
					chrome.storage.local.get(['colorTheme'], async function (result) {
						if (result['colorTheme'] === 'dark') {
							superDevWrapper.style.setProperty('box-shadow', `rgb(0 0 0 / 12%) 0px 0px 8px 0px, rgb(0 0 0 / 24%) 0px 4px 8px 0px`, 'important');
							port.postMessage({action: 'shadowChanged'});
						} else if (result['colorTheme'] === 'light') {
							superDevWrapper.style.setProperty('box-shadow', `rgb(0 0 0 / 6%) 0px 0px 8px 0px, rgb(0 0 0 / 12%) 0px 4px 8px 0px`, 'important');
							port.postMessage({action: 'firstRenderShadowChanged'});
						}
					});
					requestAnimationFrame(function () {
						requestAnimationFrame(function () {
							if (superDevWrapper.style.getPropertyValue('visibility') === 'hidden') {
								superDevWrapper.style.setProperty('visibility', 'visible', 'important');
								port.postMessage({action: 'firstRenderPopupVisible'});
							}
						});
					});
				});
			});
		});
	});
}

async function activateTextEditor(activeTab, port, request) {
	document.addEventListener('mouseover', onMouseOver);
	document.addEventListener('mouseout', onMouseOut);
	document.addEventListener('keyup', onEscape, true);

	let pageGuidelineWrapper = document.createElement('page-guideline-wrapper');
	pageGuidelineWrapper.classList.add('pageGuidelineWrapper');
	document.documentElement.appendChild(pageGuidelineWrapper);

	function onMouseOver(event) {
		if (
			event.target.id !== 'superDevHandler' &&
			event.target.id !== 'superDevPopup' &&
			event.target.id !== 'superDevWrapper' &&
			event.target.tagName !== 'HTML' &&
			event.target.id !== 'superDev'
		) {
			if (event.target.innerText !== '') {
				event.target.setAttribute('contenteditable', true);
				event.target.setAttribute('spellcheck', false);
				event.target.classList.add('pageGuidelineOutline');
				renderPageGuideline(true);
				event.target.focus({preventScroll: true});
			}
		}
	}

	function onMouseOut(event) {
		if (
			event.target.id !== 'superDevHandler' &&
			event.target.id !== 'superDevPopup' &&
			event.target.id !== 'superDevWrapper' &&
			event.target.tagName !== 'HTML' &&
			event.target.id !== 'superDev'
		) {
			if (event.target.classList.contains('pageGuidelineOutline')) {
				event.target.removeAttribute('contenteditable', true);
				event.target.removeAttribute('spellcheck', false);
				event.target.classList.remove('pageGuidelineOutline');
				renderPageGuideline(false);
			}
		}
	}

	function renderPageGuideline(toShow) {
		if (toShow === true) {
			let pageGuidelinePosition = document.querySelector('.pageGuidelineOutline').getBoundingClientRect();
			let scrollWidth =
				document.documentElement.scrollWidth -
				(document.documentElement.scrollWidth -
					(document.documentElement.offsetWidth +
						(+window.getComputedStyle(document.documentElement).getPropertyValue('margin-left').replaceAll('px', '') +
							+window.getComputedStyle(document.documentElement).getPropertyValue('margin-right').replaceAll('px', ''))));
			let scrollHeight = document.documentElement.scrollHeight;
			let top = pageGuidelinePosition.top + document.documentElement.scrollTop;
			let bottom = pageGuidelinePosition.bottom + document.documentElement.scrollTop;
			let left = pageGuidelinePosition.left + document.documentElement.scrollLeft;
			let right = pageGuidelinePosition.right + document.documentElement.scrollLeft;

			pageGuidelineWrapper.innerHTML = `
			<svg  width="100%" viewBox="0 0 ${scrollWidth} ${scrollHeight}" version="1.1"
			xmlns="http://www.w3.org/2000/svg">
				<rect fill="none" width="${scrollWidth}" height="${scrollHeight}" x="${left}" y="${top}" style="display:none;">
				</rect>
					<line x1="${left}" y1="0" x2="${left}" y2="${scrollHeight}"></line>
					<line x1="${right}" y1="0" x2="${right}" y2="${scrollHeight}"></line>
					<line x1="0" y1="${top}" x2="${scrollWidth}" y2="${top}"></line>
					<line x1="0" y1="${bottom}" x2="${scrollWidth}" y2="${bottom}"></line>
			</svg>`;
		} else {
			pageGuidelineWrapper.innerHTML = ``;
		}
	}

	async function onEscape(event) {
		event.preventDefault();
		event.stopImmediatePropagation();

		if (event.key === 'Escape') {
			if (event.isTrusted === true) {
				await chrome.storage.local.set({['setActFeatDisabled' + activeTab[0].id]: true});
			} else if (event.isTrusted === false) {
				destroyTextEditor();
			}
		}
	}

	function destroyTextEditor() {
		document.removeEventListener('mouseover', onMouseOver);
		document.removeEventListener('mouseout', onMouseOut);
		document.removeEventListener('keyup', onEscape, true);

		if (document.querySelector('.pageGuidelineOutline')) {
			document.querySelector('.pageGuidelineOutline').blur();
			document.querySelector('.pageGuidelineOutline').removeAttribute('contenteditable', true);
			document.querySelector('.pageGuidelineOutline').removeAttribute('spellcheck', false);
			document.querySelector('.pageGuidelineOutline').classList.remove('pageGuidelineOutline');
		}

		chrome.storage.local.get(['howLongPopupIs' + activeTab[0].id], async function (result) {
			if (result['howLongPopupIs' + activeTab[0].id] === 40.5) {
				await chrome.storage.local.set({['setPopupMaximised' + activeTab[0].id]: true});
			}
		});

		document.querySelector('.pageGuidelineWrapper').remove();
	}

	port.postMessage({action: 'Text Editor Activated'});
	await chrome.storage.local.set({['setPopupMinimised' + activeTab[0].id]: true});
}

function deactivateTextEditor(activeTab, port, request) {
	document.dispatchEvent(new KeyboardEvent('keyup', {key: 'Escape'}));
	port.postMessage({action: 'Text Editor Deactivated'});
}

function activatePageRuler(activeTab, port, request) {
	let canvasImage = new Image();
	let domCanvas = document.createElement('canvas');
	let canvasCtx = domCanvas.getContext('2d', {willReadFrequently: true});
	let portTwo = chrome.runtime.connect({name: 'portTwo'});
	let superDevWrapper = document.querySelector('#superDevWrapper');
	let superDevPopup = document.querySelector('#superDevPopup');
	let pageScrollDelay = 600;
	let windowResizeDelay = 1200;

	let changeTimeout;
	let isPaused = true;
	let inputX, inputY;
	let isConnClosed = false;
	let pageRulerCursor = document.createElement('page-ruler-cursor');
	pageRulerCursor.className = 'pageRulerCursor';

	document.addEventListener('mousemove', onMouseMove);
	document.addEventListener('touchmove', onMouseMove);
	document.addEventListener('scroll', onPageScroll);
	window.addEventListener('resize', onWindowResize);
	document.addEventListener('keyup', onEscape, true);
	window.focus({preventScroll: true});

	disableCursor();
	requestNewScreenshot();

	portTwo.onMessage.addListener(function (request) {
		if (isConnClosed) return;

		switch (request.action) {
			case 'parseScreenshot':
				parseScreenshot(request.dataUrl);
				break;
			case 'showDimensions':
				showDimensions(request.data);
				break;
			case 'screenshotProcessed':
				resume();
				break;
		}
	});

	function parseScreenshot(dataUrl) {
		canvasImage.src = dataUrl;
		// https://macarthur.me/posts/when-dom-updates-appear-to-be-asynchronous
		requestAnimationFrame(function () {
			requestAnimationFrame(function () {
				loadImage();
			});
		});
	}

	async function loadImage() {
		domCanvas.width = window.innerWidth;
		domCanvas.height = window.innerHeight;
		canvasCtx.drawImage(canvasImage, 0, 0, domCanvas.width, domCanvas.height);
		let imageData = canvasCtx.getImageData(0, 0, domCanvas.width, domCanvas.height).data;

		// Minimised + Visible After Screenshot Processed
		await chrome.storage.local.set({['howLongPopupIs' + activeTab[0].id]: 40.5});
		superDevPopup.style.setProperty('height', '40.5px', 'important');
		superDevWrapper.style.setProperty('visibility', 'visible', 'important');

		portTwo.postMessage({
			action: 'toGrayscale',
			imageData: Array.from(imageData),
			width: domCanvas.width,
			height: domCanvas.height,
		});
	}

	function removeDimensions() {
		let dimensions = document.querySelector('.pageRulerWrapper');
		if (dimensions) document.documentElement.removeChild(dimensions);
	}

	function onPageScroll() {
		if (!isPaused) pause();
		if (changeTimeout) clearTimeout(changeTimeout);
		changeTimeout = setTimeout(requestNewScreenshot, pageScrollDelay);
	}

	function onWindowResize() {
		if (!isPaused) pause();
		if (changeTimeout) clearTimeout(changeTimeout);
		changeTimeout = setTimeout(requestNewScreenshot, windowResizeDelay);
	}

	async function requestNewScreenshot() {
		// In Case od Scroll or Resize
		superDevWrapper.style.setProperty('visibility', 'hidden', 'important');
		requestAnimationFrame(function () {
			requestAnimationFrame(function () {
				portTwo.postMessage({action: 'takeScreenshot'});
			});
		});
	}

	function pause() {
		isPaused = true;
		removeDimensions();
		enableCursor();
	}

	function resume() {
		isPaused = false;
		disableCursor();
	}

	function disableCursor() {
		document.documentElement.appendChild(pageRulerCursor);
	}

	function enableCursor() {
		document.documentElement.removeChild(pageRulerCursor);
	}

	function onMouseMove(event) {
		if (
			event.target.id !== 'superDevHandler' &&
			event.target.id !== 'superDevPopup' &&
			event.target.id !== 'superDevWrapper' &&
			event.target.tagName !== 'HTML' &&
			event.target.id !== 'superDev'
		) {
			if (event.touches) {
				inputX = event.touches[0].clientX;
				inputY = event.touches[0].clientY;
			} else {
				inputX = event.clientX;
				inputY = event.clientY;
			}
			sendToWorker(event);
		} else {
			removeDimensions();
		}
	}

	function sendToWorker(event) {
		if (isPaused) return;

		portTwo.postMessage({
			action: 'measureDistances',
			data: {x: inputX, y: inputY},
		});
	}

	function showDimensions(dimensions) {
		if (isPaused) return;

		removeDimensions();
		if (!dimensions) return;

		let pageRulerWrapper = document.createElement('page-ruler-wrapper');
		pageRulerWrapper.className = 'pageRulerWrapper';
		pageRulerWrapper.style.setProperty('left', `${dimensions.x}px`, 'important');
		pageRulerWrapper.style.setProperty('top', `${dimensions.y}px`, 'important');

		let measureWidth = dimensions.left + dimensions.right;
		let measureHeight = dimensions.top + dimensions.bottom;

		let xAxis = document.createElement('page-ruler-x-axis');
		xAxis.className = 'x pageRulerAxis';
		xAxis.style.setProperty('left', `-${dimensions.left}px`, 'important');
		xAxis.style.setProperty('width', `${measureWidth}px`, 'important');

		let yAxis = document.createElement('page-ruler-y-axis');
		yAxis.className = 'y pageRulerAxis';
		yAxis.style.setProperty('top', `-${dimensions.top}px`, 'important');
		yAxis.style.setProperty('height', `${measureHeight}px`, 'important');

		let pageRulerTooltip = document.createElement('page-ruler-tooltip');
		pageRulerTooltip.className = 'pageRulerTooltip';

		pageRulerTooltip.textContent = measureWidth + 1 + ' x ' + (measureHeight + 1) + ' px';

		if (dimensions.y < 40) pageRulerTooltip.classList.add('bottom');

		if (dimensions.x > window.innerWidth - 120) pageRulerTooltip.classList.add('left');

		pageRulerWrapper.appendChild(xAxis);
		pageRulerWrapper.appendChild(yAxis);
		pageRulerWrapper.appendChild(pageRulerTooltip);

		document.documentElement.appendChild(pageRulerWrapper);
	}

	async function onEscape(event) {
		event.preventDefault();
		event.stopImmediatePropagation();

		if (event.key === 'Escape') {
			if (event.isTrusted === true) {
				await chrome.storage.local.set({['setActFeatDisabled' + activeTab[0].id]: true});
			} else if (event.isTrusted === false) {
				destroyPageRuler();
			}
		}
	}

	function destroyPageRuler() {
		isConnClosed = true;
		document.removeEventListener('mousemove', onMouseMove);
		document.removeEventListener('touchmove', onMouseMove);
		document.removeEventListener('scroll', onPageScroll);
		window.removeEventListener('resize', onWindowResize);
		document.removeEventListener('keyup', onEscape, true);

		chrome.storage.local.get(['howLongPopupIs' + activeTab[0].id], async function (result) {
			if (result['howLongPopupIs' + activeTab[0].id] === 40.5) {
				await chrome.storage.local.set({['setPopupMaximised' + activeTab[0].id]: true});
			}
		});

		removeDimensions();
		enableCursor();
	}

	port.postMessage({action: 'Page Ruler Activated'});
}

function deactivatePageRuler(activeTab, port, request) {
	document.dispatchEvent(new KeyboardEvent('keyup', {key: 'Escape'}));
	port.postMessage({action: 'Page Ruler Deactivated'});
}

function activateColorPicker(activeTab, port, request) {
	let canvasImage = new Image();
	let domCanvas = document.createElement('canvas');
	let canvasCtx = domCanvas.getContext('2d', {willReadFrequently: true});
	let portTwo = chrome.runtime.connect({name: 'portTwo'});
	let superDevWrapper = document.querySelector('#superDevWrapper');
	let superDevPopup = document.querySelector('#superDevPopup');
	let pageScrollDelay = 600;
	let windowResizeDelay = 1200;

	let changeTimeout;
	let isPaused = true;
	let inputX, inputY;
	let isConnClosed = false;
	let colorPickerCursor = document.createElement('color-picker-cursor');
	colorPickerCursor.className = 'colorPickerCursor';

	document.addEventListener('mousemove', onMouseMove);
	document.addEventListener('touchmove', onMouseMove);
	document.addEventListener('scroll', onPageScroll);
	document.addEventListener('click', onMouseClick, true);
	window.addEventListener('resize', onWindowResize);
	document.addEventListener('keyup', onEscape, true);
	window.focus({preventScroll: true});

	disableCursor();
	requestNewScreenshot();

	portTwo.onMessage.addListener(function (request) {
		if (isConnClosed) return;

		switch (request.action) {
			case 'parseScreenshot':
				parseScreenshot(request.dataUrl);
				break;
			case 'showColorPicker':
				showColorPicker(request.data);
				break;
			case 'colorPickerSet':
				resume();
				break;
		}
	});

	function parseScreenshot(dataUrl) {
		canvasImage.src = dataUrl;
		// https://macarthur.me/posts/when-dom-updates-appear-to-be-asynchronous
		requestAnimationFrame(function () {
			requestAnimationFrame(function () {
				loadImage();
			});
		});
	}

	async function loadImage() {
		domCanvas.width = window.innerWidth;
		domCanvas.height = window.innerHeight;
		canvasCtx.drawImage(canvasImage, 0, 0, domCanvas.width, domCanvas.height);
		let imageData = canvasCtx.getImageData(0, 0, domCanvas.width, domCanvas.height).data;

		// Minimised + Visible After Screenshot Processed
		await chrome.storage.local.set({['howLongPopupIs' + activeTab[0].id]: 40.5});
		superDevPopup.style.setProperty('height', '40.5px', 'important');
		superDevWrapper.style.setProperty('visibility', 'visible', 'important');

		portTwo.postMessage({
			action: 'setColorPicker',
			imageData: Array.from(imageData),
			width: domCanvas.width,
			height: domCanvas.height,
		});
	}

	function removeColorPicker() {
		let colorPickerWrapper = document.querySelector('.colorPickerWrapper');
		if (colorPickerWrapper) document.documentElement.removeChild(colorPickerWrapper);
	}

	function onPageScroll() {
		if (!isPaused) pause();
		if (changeTimeout) clearTimeout(changeTimeout);
		changeTimeout = setTimeout(requestNewScreenshot, pageScrollDelay);
	}

	function onWindowResize() {
		if (!isPaused) pause();
		if (changeTimeout) clearTimeout(changeTimeout);
		changeTimeout = setTimeout(requestNewScreenshot, windowResizeDelay);
	}

	async function requestNewScreenshot() {
		superDevWrapper.style.setProperty('visibility', 'hidden', 'important');
		requestAnimationFrame(function () {
			requestAnimationFrame(function () {
				portTwo.postMessage({action: 'takeScreenshot'});
			});
		});
	}

	function pause() {
		isPaused = true;
		removeColorPicker();
		enableCursor();
	}

	function resume() {
		isPaused = false;
		disableCursor();
	}

	function disableCursor() {
		document.documentElement.appendChild(colorPickerCursor);
	}

	function enableCursor() {
		document.documentElement.removeChild(colorPickerCursor);
	}

	function onMouseMove(event) {
		if (
			event.target.id !== 'superDevHandler' &&
			event.target.id !== 'superDevPopup' &&
			event.target.id !== 'superDevWrapper' &&
			event.target.tagName !== 'HTML' &&
			event.target.id !== 'superDev'
		) {
			if (event.touches) {
				inputX = event.touches[0].clientX;
				inputY = event.touches[0].clientY;
			} else {
				inputX = event.clientX;
				inputY = event.clientY;
			}
			sendToWorker(event);
		} else {
			removeColorPicker();
		}
	}

	function onMouseClick(event) {
		event.preventDefault();
		event.stopImmediatePropagation();

		if (event.isTrusted === true) {
			if (document.querySelector('.colorPickerTooltipChild')) {
				navigator.clipboard.writeText(document.querySelector('.colorPickerTooltipChild').innerText);
				document.querySelector('.colorPickerTooltipChild').innerText = 'Copied';
			}
		}
	}

	function sendToWorker(event) {
		if (isPaused) return;

		portTwo.postMessage({
			action: 'getColorAt',
			data: {x: inputX, y: inputY},
		});
	}

	function showColorPicker(spotColor) {
		if (isPaused) return;

		removeColorPicker();
		if (!spotColor) return;

		let colorPickerWrapper = document.createElement('color-picker-wrapper');
		colorPickerWrapper.className = 'colorPickerWrapper';
		colorPickerWrapper.style.setProperty('left', `${spotColor.x}px`, 'important');
		colorPickerWrapper.style.setProperty('top', `${spotColor.y}px`, 'important');

		let colorPickerTooltip = document.createElement('color-picker-tooltip');
		colorPickerTooltip.className = 'colorPickerTooltip';

		let colorPickerTooltipBG = document.createElement('color-picker-tooltip-bg');
		colorPickerTooltipBG.className = 'colorPickerTooltipBG';

		let colorPickerTooltipChild = document.createElement('color-picker-tooltip-child');
		colorPickerTooltipChild.className = 'colorPickerTooltipChild';

		chrome.storage.local.get(['allFeatures'], function (result) {
			JSON.parse(result['allFeatures']).forEach(function (value, index) {
				if (value.id === 'colorPicker') {
					if (value.settings.checkboxColorPicker1 === true) {
						colorPickerTooltipBG.style.setProperty('background-color', `${spotColor.hex}`, 'important');
						colorPickerTooltipChild.textContent = spotColor.hex;
						if (spotColor.y < 60) colorPickerTooltip.classList.add('bottom');
						if (spotColor.x > window.innerWidth - 110) colorPickerTooltip.classList.add('left');
					} else if (value.settings.checkboxColorPicker2 === true) {
						colorPickerTooltipBG.style.setProperty('background-color', `${spotColor.rgb}`, 'important');
						colorPickerTooltipChild.textContent = spotColor.rgb;
						if (spotColor.y < 60) colorPickerTooltip.classList.add('bottom');
						if (spotColor.x > window.innerWidth - 220) colorPickerTooltip.classList.add('left');
					}
				}
			});
		});

		colorPickerTooltip.appendChild(colorPickerTooltipBG);
		colorPickerTooltip.appendChild(colorPickerTooltipChild);
		colorPickerWrapper.appendChild(colorPickerTooltip);
		document.documentElement.appendChild(colorPickerWrapper);
	}

	async function onEscape(event) {
		event.preventDefault();
		event.stopImmediatePropagation();

		if (event.key === 'Escape') {
			if (event.isTrusted === true) {
				await chrome.storage.local.set({['setActFeatDisabled' + activeTab[0].id]: true});
			} else if (event.isTrusted === false) {
				destroyColorPicker();
			}
		}
	}

	function destroyColorPicker() {
		isConnClosed = true;
		document.removeEventListener('mousemove', onMouseMove);
		document.removeEventListener('touchmove', onMouseMove);
		document.removeEventListener('scroll', onPageScroll);
		document.removeEventListener('click', onMouseClick, true);
		window.removeEventListener('resize', onWindowResize);
		document.removeEventListener('keyup', onEscape, true);

		chrome.storage.local.get(['howLongPopupIs' + activeTab[0].id], async function (result) {
			if (result['howLongPopupIs' + activeTab[0].id] === 40.5) {
				await chrome.storage.local.set({['setPopupMaximised' + activeTab[0].id]: true});
			}
		});

		removeColorPicker();
		enableCursor();
	}

	port.postMessage({action: 'Color Picker Activated'});
}

function deactivateColorPicker(activeTab, port, request) {
	document.dispatchEvent(new KeyboardEvent('keyup', {key: 'Escape'}));
	port.postMessage({action: 'Color Picker Deactivated'});
}

function activateColorPalette(activeTab, port, request) {
	document.addEventListener('keyup', onEscape, true);
	window.focus({preventScroll: true});

	// Get All Colors
	let allColors = [];
	let elementComputedStyles;
	document.querySelectorAll('*').forEach(function (element) {
		elementComputedStyles = window.getComputedStyle(element);
		allColors.push(elementComputedStyles.getPropertyValue('background-color'));
		allColors.push(elementComputedStyles.getPropertyValue('border-color'));
		allColors.push(elementComputedStyles.getPropertyValue('border-block-color'));
		allColors.push(elementComputedStyles.getPropertyValue('border-block-end-color'));
		allColors.push(elementComputedStyles.getPropertyValue('border-block-start-color'));
		allColors.push(elementComputedStyles.getPropertyValue('border-bottom-color'));
		allColors.push(elementComputedStyles.getPropertyValue('border-inline-end-color'));
		allColors.push(elementComputedStyles.getPropertyValue('border-inline-start-color'));
		allColors.push(elementComputedStyles.getPropertyValue('border-left-color'));
		allColors.push(elementComputedStyles.getPropertyValue('border-right-color'));
		allColors.push(elementComputedStyles.getPropertyValue('border-top-color'));
		allColors.push(elementComputedStyles.getPropertyValue('caret-color'));
		allColors.push(elementComputedStyles.getPropertyValue('color'));
		allColors.push(elementComputedStyles.getPropertyValue('column-rule-color'));
		allColors.push(elementComputedStyles.getPropertyValue('fill'));
		allColors.push(elementComputedStyles.getPropertyValue('flood-color'));
		allColors.push(elementComputedStyles.getPropertyValue('lighting-color'));
		allColors.push(elementComputedStyles.getPropertyValue('outline-color'));
		allColors.push(elementComputedStyles.getPropertyValue('stop-color'));
		allColors.push(elementComputedStyles.getPropertyValue('stroke'));
		allColors.push(elementComputedStyles.getPropertyValue('text-decoration-color'));
		allColors.push(elementComputedStyles.getPropertyValue('text-emphasis-color'));
		allColors.push(elementComputedStyles.getPropertyValue('webkit-border-after-color'));
		allColors.push(elementComputedStyles.getPropertyValue('webkit-border-before-color'));
		allColors.push(elementComputedStyles.getPropertyValue('webkit-border-end-color'));
		allColors.push(elementComputedStyles.getPropertyValue('webkit-border-start-color'));
		allColors.push(elementComputedStyles.getPropertyValue('webkit-column-rule-color'));
		allColors.push(elementComputedStyles.getPropertyValue('webkit-tap-highlight-color'));
		allColors.push(elementComputedStyles.getPropertyValue('webkit-text-emphasis-color'));
		allColors.push(elementComputedStyles.getPropertyValue('webkit-text-fill-color'));
		allColors.push(elementComputedStyles.getPropertyValue('webkit-text-stroke-color'));
	});

	// Color Processing/Filtering
	if (allColors.length !== 0) {
		allColors = [...new Set(allColors)];
		allColors = allColors.filter(function (value, index) {
			return value.startsWith('rgb(');
		});
		if (allColors.length !== 0) {
			allColors = allColors.map(function (valueOne, indexOne) {
				if (valueOne.includes(') ')) return valueOne.replaceAll(') ', ');').split(';');
				else return valueOne;
			});
			allColors = [...new Set(allColors.flat())];

			// RGB or Hex?
			chrome.storage.local.get(['allFeatures'], function (result) {
				JSON.parse(result['allFeatures']).forEach(function (value, index) {
					if (value.id === 'colorPalette') {
						if (value.settings.checkboxColorPalette1 === true) {
							allColors = allColors.map(function (value, index) {
								return rgbToHex(value);
							});
							port.postMessage({action: 'allColors', allColors: allColors});
						} else if (value.settings.checkboxColorPalette2 === true) {
							port.postMessage({action: 'allColors', allColors: allColors});
						}
					}
				});
			});
		}
	}

	function rgbToHex(rgb) {
		let hex = rgb.split('(')[1].split(')')[0];
		hex = hex.split(',');
		hex = '#' + ((1 << 24) + (+hex[0] << 16) + (+hex[1] << 8) + +hex[2]).toString(16).slice(1);
		return hex.toUpperCase();
	}

	async function onEscape(event) {
		event.preventDefault();
		event.stopImmediatePropagation();

		if (event.key === 'Escape') {
			if (event.isTrusted === true) {
				await chrome.storage.local.set({['setActFeatDisabled' + activeTab[0].id]: true});
			} else if (event.isTrusted === false) {
				destroyColorPalette();
			}
		}
	}

	async function destroyColorPalette() {
		document.removeEventListener('keyup', onEscape, true);
		await chrome.storage.local.set({['setHomePageActive' + activeTab[0].id]: true});
	}

	port.postMessage({action: 'Color Palette Activated'});
}

function deactivateColorPalette(activeTab, port, request) {
	document.dispatchEvent(new KeyboardEvent('keyup', {key: 'Escape'}));
	port.postMessage({action: 'Color Palette Deactivated'});
}

async function activatePageGuideline(activeTab, port, request) {
	document.addEventListener('mouseover', onMouseOver);
	document.addEventListener('mouseout', onMouseOut);
	document.addEventListener('keyup', onEscape, true);
	window.focus({preventScroll: true});

	let pageGuidelineWrapper = document.createElement('page-guideline-wrapper');
	pageGuidelineWrapper.classList.add('pageGuidelineWrapper');
	document.documentElement.appendChild(pageGuidelineWrapper);

	function onMouseOver(event) {
		if (
			event.target.id !== 'superDevHandler' &&
			event.target.id !== 'superDevPopup' &&
			event.target.id !== 'superDevWrapper' &&
			event.target.tagName !== 'HTML' &&
			event.target.id !== 'superDev'
		) {
			event.target.classList.add('pageGuidelineOutline');
			renderPageGuideline(true);
		}
	}

	function onMouseOut(event) {
		if (
			event.target.id !== 'superDevHandler' &&
			event.target.id !== 'superDevPopup' &&
			event.target.id !== 'superDevWrapper' &&
			event.target.tagName !== 'HTML' &&
			event.target.id !== 'superDev'
		) {
			renderPageGuideline(false);
			event.target.classList.remove('pageGuidelineOutline');
		}
	}

	function renderPageGuideline(toShow) {
		if (toShow === true) {
			let pageGuidelinePosition = document.querySelector('.pageGuidelineOutline').getBoundingClientRect();
			let scrollWidth =
				document.documentElement.scrollWidth -
				(document.documentElement.scrollWidth -
					(document.documentElement.offsetWidth +
						(+window.getComputedStyle(document.documentElement).getPropertyValue('margin-left').replaceAll('px', '').replaceAll('px', '') +
							+window.getComputedStyle(document.documentElement).getPropertyValue('margin-right').replaceAll('px', '').replaceAll('px', ''))));

			let scrollHeight = document.documentElement.scrollHeight;
			let top = pageGuidelinePosition.top + document.documentElement.scrollTop;
			let bottom = pageGuidelinePosition.bottom + document.documentElement.scrollTop;
			let left = pageGuidelinePosition.left + document.documentElement.scrollLeft;
			let right = pageGuidelinePosition.right + document.documentElement.scrollLeft;

			pageGuidelineWrapper.innerHTML = `
			<svg  width="100%" viewBox="0 0 ${scrollWidth} ${scrollHeight}" version="1.1"
			xmlns="http://www.w3.org/2000/svg">
				<rect fill="none" width="${scrollWidth}" height="${scrollHeight}" x="${left}" y="${top}" style="display:none;">
				</rect>
					<line x1="${left}" y1="0" x2="${left}" y2="${scrollHeight}"></line>
					<line x1="${right}" y1="0" x2="${right}" y2="${scrollHeight}"></line>
					<line x1="0" y1="${top}" x2="${scrollWidth}" y2="${top}"></line>
					<line x1="0" y1="${bottom}" x2="${scrollWidth}" y2="${bottom}"></line>
			</svg>`;
		} else {
			pageGuidelineWrapper.innerHTML = ``;
		}
	}

	async function onEscape(event) {
		event.preventDefault();
		event.stopImmediatePropagation();

		if (event.key === 'Escape') {
			if (event.isTrusted === true) {
				await chrome.storage.local.set({['setActFeatDisabled' + activeTab[0].id]: true});
			} else if (event.isTrusted === false) {
				destroyPageGuideline();
			}
		}
	}

	function destroyPageGuideline() {
		document.removeEventListener('mouseover', onMouseOver);
		document.removeEventListener('mouseout', onMouseOut);
		document.removeEventListener('keyup', onEscape, true);

		if (document.querySelector('.pageGuidelineOutline')) {
			document.querySelector('.pageGuidelineOutline').blur();
			document.querySelector('.pageGuidelineOutline').classList.remove('pageGuidelineOutline');
		}

		chrome.storage.local.get(['howLongPopupIs' + activeTab[0].id], async function (result) {
			if (result['howLongPopupIs' + activeTab[0].id] === 40.5) {
				await chrome.storage.local.set({['setPopupMaximised' + activeTab[0].id]: true});
			}
		});

		document.querySelector('.pageGuidelineWrapper').remove();
	}

	port.postMessage({action: 'Page Guideline Activated'});
	await chrome.storage.local.set({['setPopupMinimised' + activeTab[0].id]: true});
}

function deactivatePageGuideline(activeTab, port, request) {
	document.dispatchEvent(new KeyboardEvent('keyup', {key: 'Escape'}));
	port.postMessage({action: 'Page Guideline Deactivated'});
}

async function activatePageHighlight(activeTab, port, request) {
	document.addEventListener('keyup', onEscape, true);
	window.focus({preventScroll: true});

	chrome.storage.local.get(['allFeatures'], function (result) {
		JSON.parse(result['allFeatures']).forEach(function (value, index) {
			if (value.id === 'pageHighlight') {
				if (value.settings.checkboxPageHighlight1 === true) {
					// All Page Elements
					document.querySelectorAll('*').forEach(function (element) {
						if (
							element.offsetHeight !== 0 &&
							element.offsetWidth !== 0 &&
							element.id !== 'superDevHandler' &&
							element.id !== 'superDevPopup' &&
							element.id !== 'superDevWrapper' &&
							element.tagName !== 'HTML' &&
							element.id !== 'superDev'
						) {
							let color = rgba();
							if (value.settings.checkboxPageHighlight6 !== true) {
								element.style.setProperty('box-sizing', 'border-box', 'important');
								element.style.setProperty('border', '2px solid ' + color, 'important');
							}

							element.style.setProperty('background-color', color, 'important');
						}
					});
				} else if (value.settings.checkboxPageHighlight2 === true) {
					// Block Level
					document.querySelectorAll('*').forEach(function (element) {
						if (
							element.offsetHeight !== 0 &&
							element.offsetWidth !== 0 &&
							element.id !== 'superDevHandler' &&
							element.id !== 'superDevPopup' &&
							element.id !== 'superDevWrapper' &&
							element.tagName !== 'HTML' &&
							element.id !== 'superDev'
						) {
							if (
								element.tagName === 'ADDRESS' ||
								element.tagName === 'ARTICLE' ||
								element.tagName === 'ASIDE' ||
								element.tagName === 'BLOCKQUOTE' ||
								element.tagName === 'CANVAS' ||
								element.tagName === 'DD' ||
								element.tagName === 'DIV' ||
								element.tagName === 'DL' ||
								element.tagName === 'DT' ||
								element.tagName === 'FIELDSET' ||
								element.tagName === 'FIGCAPTION' ||
								element.tagName === 'FIGURE' ||
								element.tagName === 'FOOTER' ||
								element.tagName === 'FORM' ||
								element.tagName === 'H1' ||
								element.tagName === 'H2' ||
								element.tagName === 'H3' ||
								element.tagName === 'H4' ||
								element.tagName === 'H5' ||
								element.tagName === 'H6' ||
								element.tagName === 'HEADER' ||
								element.tagName === 'HR' ||
								element.tagName === 'LI' ||
								element.tagName === 'MAIN' ||
								element.tagName === 'NAV' ||
								element.tagName === 'NOSCRIPT' ||
								element.tagName === 'OL' ||
								element.tagName === 'P' ||
								element.tagName === 'PRE' ||
								element.tagName === 'SECTION' ||
								element.tagName === 'TABLE' ||
								element.tagName === 'TFOOT' ||
								element.tagName === 'UL' ||
								element.tagName === 'VIDEO'
							) {
								let color = rgba();
								if (value.settings.checkboxPageHighlight6 !== true) {
									element.style.setProperty('box-sizing', 'border-box', 'important');
									element.style.setProperty('border', '2px solid ' + color, 'important');
								}

								element.style.setProperty('background-color', color, 'important');
							}
						}
					});
				} else if (value.settings.checkboxPageHighlight3 === true) {
					// Inline Level
					document.querySelectorAll('*').forEach(function (element) {
						if (
							element.offsetHeight !== 0 &&
							element.offsetWidth !== 0 &&
							element.id !== 'superDevHandler' &&
							element.id !== 'superDevPopup' &&
							element.id !== 'superDevWrapper' &&
							element.tagName !== 'HTML' &&
							element.id !== 'superDev'
						) {
							if (
								element.tagName === 'A' ||
								element.tagName === 'ABBR' ||
								element.tagName === 'ACRONYM' ||
								element.tagName === 'B' ||
								element.tagName === 'BDO' ||
								element.tagName === 'BIG' ||
								element.tagName === 'BR' ||
								element.tagName === 'BUTTON' ||
								element.tagName === 'CITE' ||
								element.tagName === 'CODE' ||
								element.tagName === 'DFN' ||
								element.tagName === 'EM' ||
								element.tagName === 'I' ||
								element.tagName === 'IMG' ||
								element.tagName === 'INPUT' ||
								element.tagName === 'KBD' ||
								element.tagName === 'LABEL' ||
								element.tagName === 'MAP' ||
								element.tagName === 'OBJECT' ||
								element.tagName === 'OUTPUT' ||
								element.tagName === 'Q' ||
								element.tagName === 'SAMP' ||
								element.tagName === 'SCRIPT' ||
								element.tagName === 'SELECT' ||
								element.tagName === 'SMALL' ||
								element.tagName === 'SPAN' ||
								element.tagName === 'STRONG' ||
								element.tagName === 'SUB' ||
								element.tagName === 'SUP' ||
								element.tagName === 'TEXTAREA' ||
								element.tagName === 'TIME' ||
								element.tagName === 'TT' ||
								element.tagName === 'VAR'
							) {
								let color = rgba();
								if (value.settings.checkboxPageHighlight6 !== true) {
									element.style.setProperty('box-sizing', 'border-box', 'important');
									element.style.setProperty('border', '2px solid ' + color, 'important');
								}

								element.style.setProperty('background-color', color, 'important');
							}
						}
					});
				} else if (value.settings.checkboxPageHighlight4 === true) {
					// Semantic + Div
					document.querySelectorAll('*').forEach(function (element) {
						if (
							element.offsetHeight !== 0 &&
							element.offsetWidth !== 0 &&
							element.id !== 'superDevHandler' &&
							element.id !== 'superDevPopup' &&
							element.id !== 'superDevWrapper' &&
							element.tagName !== 'HTML' &&
							element.id !== 'superDev'
						) {
							if (
								element.tagName === 'ARTICLE' ||
								element.tagName === 'ASIDE' ||
								element.tagName === 'DETAILS' ||
								element.tagName === 'FIGCAPTION' ||
								element.tagName === 'FIGURE' ||
								element.tagName === 'FOOTER' ||
								element.tagName === 'HEADER' ||
								element.tagName === 'MAIN' ||
								element.tagName === 'MARK' ||
								element.tagName === 'NAV' ||
								element.tagName === 'SECTION' ||
								element.tagName === 'SUMMARY' ||
								element.tagName === 'TIME'
							) {
								let color = rgba();
								if (value.settings.checkboxPageHighlight6 !== true) {
									element.style.setProperty('box-sizing', 'border-box', 'important');
									element.style.setProperty('border', '2px solid ' + color, 'important');
								}

								element.style.setProperty('background-color', color, 'important');
							}
						}
					});
				} else if (value.settings.checkboxPageHighlight5 === true) {
					// Headings + Paragraphgs
					document.querySelectorAll('*').forEach(function (element) {
						if (
							element.offsetHeight !== 0 &&
							element.offsetWidth !== 0 &&
							element.id !== 'superDevHandler' &&
							element.id !== 'superDevPopup' &&
							element.id !== 'superDevWrapper' &&
							element.tagName !== 'HTML' &&
							element.id !== 'superDev'
						) {
							if (
								element.tagName === 'H1' ||
								element.tagName === 'H2' ||
								element.tagName === 'H3' ||
								element.tagName === 'H4' ||
								element.tagName === 'H5' ||
								element.tagName === 'H6' ||
								element.tagName === 'P'
							) {
								let color = rgba();
								if (value.settings.checkboxPageHighlight6 !== true) {
									element.style.setProperty('box-sizing', 'border-box', 'important');
									element.style.setProperty('border', '2px solid ' + color, 'important');
								}

								element.style.setProperty('background-color', color, 'important');
							}
						}
					});
				}
			}
		});
	});

	function rgba() {
		let o = Math.round,
			r = Math.random,
			s = 255;
		return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + 0.4 + ')';
	}

	async function onEscape(event) {
		event.preventDefault();
		event.stopImmediatePropagation();

		if (event.key === 'Escape') {
			if (event.isTrusted === true) {
				await chrome.storage.local.set({['setActFeatDisabled' + activeTab[0].id]: true});
			} else if (event.isTrusted === false) {
				destroyPageHighlight();
			}
		}
	}

	function destroyPageHighlight() {
		document.removeEventListener('keyup', onEscape, true);

		chrome.storage.local.get(['howLongPopupIs' + activeTab[0].id], async function (result) {
			if (result['howLongPopupIs' + activeTab[0].id] === 40.5) {
				await chrome.storage.local.set({['setPopupMaximised' + activeTab[0].id]: true});
			}
		});

		chrome.storage.local.get(['allFeatures'], function (result) {
			JSON.parse(result['allFeatures']).forEach(function (value, index) {
				if (value.id === 'pageHighlight') {
					if (value.settings.checkboxPageHighlight1 === true) {
						// All Page Elements
						document.querySelectorAll('*').forEach(function (element) {
							if (
								element.offsetHeight !== 0 &&
								element.offsetWidth !== 0 &&
								element.id !== 'superDevHandler' &&
								element.id !== 'superDevPopup' &&
								element.id !== 'superDevWrapper' &&
								element.tagName !== 'HTML' &&
								element.id !== 'superDev'
							) {
								if (value.settings.checkboxPageHighlight6 !== true) {
									element.style.removeProperty('box-sizing');
									element.style.removeProperty('border');
								}

								element.style.removeProperty('background-color');
							}
						});
					} else if (value.settings.checkboxPageHighlight2 === true) {
						// Block Level
						document.querySelectorAll('*').forEach(function (element) {
							if (
								element.offsetHeight !== 0 &&
								element.offsetWidth !== 0 &&
								element.id !== 'superDevHandler' &&
								element.id !== 'superDevPopup' &&
								element.id !== 'superDevWrapper' &&
								element.tagName !== 'HTML' &&
								element.id !== 'superDev'
							) {
								if (
									element.tagName === 'ADDRESS' ||
									element.tagName === 'ARTICLE' ||
									element.tagName === 'ASIDE' ||
									element.tagName === 'BLOCKQUOTE' ||
									element.tagName === 'CANVAS' ||
									element.tagName === 'DD' ||
									element.tagName === 'DIV' ||
									element.tagName === 'DL' ||
									element.tagName === 'DT' ||
									element.tagName === 'FIELDSET' ||
									element.tagName === 'FIGCAPTION' ||
									element.tagName === 'FIGURE' ||
									element.tagName === 'FOOTER' ||
									element.tagName === 'FORM' ||
									element.tagName === 'H1' ||
									element.tagName === 'H2' ||
									element.tagName === 'H3' ||
									element.tagName === 'H4' ||
									element.tagName === 'H5' ||
									element.tagName === 'H6' ||
									element.tagName === 'HEADER' ||
									element.tagName === 'HR' ||
									element.tagName === 'LI' ||
									element.tagName === 'MAIN' ||
									element.tagName === 'NAV' ||
									element.tagName === 'NOSCRIPT' ||
									element.tagName === 'OL' ||
									element.tagName === 'P' ||
									element.tagName === 'PRE' ||
									element.tagName === 'SECTION' ||
									element.tagName === 'TABLE' ||
									element.tagName === 'TFOOT' ||
									element.tagName === 'UL' ||
									element.tagName === 'VIDEO'
								) {
									if (value.settings.checkboxPageHighlight6 !== true) {
										element.style.removeProperty('box-sizing');
										element.style.removeProperty('border');
									}

									element.style.removeProperty('background-color');
								}
							}
						});
					} else if (value.settings.checkboxPageHighlight3 === true) {
						// Inline Level
						document.querySelectorAll('*').forEach(function (element) {
							if (
								element.offsetHeight !== 0 &&
								element.offsetWidth !== 0 &&
								element.id !== 'superDevHandler' &&
								element.id !== 'superDevPopup' &&
								element.id !== 'superDevWrapper' &&
								element.tagName !== 'HTML' &&
								element.id !== 'superDev'
							) {
								if (
									element.tagName === 'A' ||
									element.tagName === 'ABBR' ||
									element.tagName === 'ACRONYM' ||
									element.tagName === 'B' ||
									element.tagName === 'BDO' ||
									element.tagName === 'BIG' ||
									element.tagName === 'BR' ||
									element.tagName === 'BUTTON' ||
									element.tagName === 'CITE' ||
									element.tagName === 'CODE' ||
									element.tagName === 'DFN' ||
									element.tagName === 'EM' ||
									element.tagName === 'I' ||
									element.tagName === 'IMG' ||
									element.tagName === 'INPUT' ||
									element.tagName === 'KBD' ||
									element.tagName === 'LABEL' ||
									element.tagName === 'MAP' ||
									element.tagName === 'OBJECT' ||
									element.tagName === 'OUTPUT' ||
									element.tagName === 'Q' ||
									element.tagName === 'SAMP' ||
									element.tagName === 'SCRIPT' ||
									element.tagName === 'SELECT' ||
									element.tagName === 'SMALL' ||
									element.tagName === 'SPAN' ||
									element.tagName === 'STRONG' ||
									element.tagName === 'SUB' ||
									element.tagName === 'SUP' ||
									element.tagName === 'TEXTAREA' ||
									element.tagName === 'TIME' ||
									element.tagName === 'TT' ||
									element.tagName === 'VAR'
								) {
									if (value.settings.checkboxPageHighlight6 !== true) {
										element.style.removeProperty('box-sizing');
										element.style.removeProperty('border');
									}

									element.style.removeProperty('background-color');
								}
							}
						});
					} else if (value.settings.checkboxPageHighlight4 === true) {
						// Semantic + Div
						document.querySelectorAll('*').forEach(function (element) {
							if (
								element.offsetHeight !== 0 &&
								element.offsetWidth !== 0 &&
								element.id !== 'superDevHandler' &&
								element.id !== 'superDevPopup' &&
								element.id !== 'superDevWrapper' &&
								element.tagName !== 'HTML' &&
								element.id !== 'superDev'
							) {
								if (
									element.tagName === 'ARTICLE' ||
									element.tagName === 'ASIDE' ||
									element.tagName === 'DETAILS' ||
									element.tagName === 'FIGCAPTION' ||
									element.tagName === 'FIGURE' ||
									element.tagName === 'FOOTER' ||
									element.tagName === 'HEADER' ||
									element.tagName === 'MAIN' ||
									element.tagName === 'MARK' ||
									element.tagName === 'NAV' ||
									element.tagName === 'SECTION' ||
									element.tagName === 'SUMMARY' ||
									element.tagName === 'TIME'
								) {
									if (value.settings.checkboxPageHighlight6 !== true) {
										element.style.removeProperty('box-sizing');
										element.style.removeProperty('border');
									}

									element.style.removeProperty('background-color');
								}
							}
						});
					} else if (value.settings.checkboxPageHighlight5 === true) {
						// Headings + Paragraphgs
						document.querySelectorAll('*').forEach(function (element) {
							if (
								element.offsetHeight !== 0 &&
								element.offsetWidth !== 0 &&
								element.id !== 'superDevHandler' &&
								element.id !== 'superDevPopup' &&
								element.id !== 'superDevWrapper' &&
								element.tagName !== 'HTML' &&
								element.id !== 'superDev'
							) {
								if (
									element.tagName === 'H1' ||
									element.tagName === 'H2' ||
									element.tagName === 'H3' ||
									element.tagName === 'H4' ||
									element.tagName === 'H5' ||
									element.tagName === 'H6' ||
									element.tagName === 'P'
								) {
									if (value.settings.checkboxPageHighlight6 !== true) {
										element.style.removeProperty('box-sizing');
										element.style.removeProperty('border');
									}

									element.style.removeProperty('background-color');
								}
							}
						});
					}
				}
			});
		});
	}

	port.postMessage({action: 'Page Highlight Activated'});
	await chrome.storage.local.set({['setPopupMinimised' + activeTab[0].id]: true});
}

function deactivatePageHighlight(activeTab, port, request) {
	document.dispatchEvent(new KeyboardEvent('keyup', {key: 'Escape'}));
	port.postMessage({action: 'Page Highlight Deactivated'});
}

async function activateMoveElement(activeTab, port, request) {
	document.addEventListener('mouseover', onMouseOver);
	document.addEventListener('mouseout', onMouseOut);
	document.addEventListener('click', onMouseClick, true);
	document.addEventListener('keyup', onEscape, true);
	window.focus({preventScroll: true});

	let pageGuidelineWrapper = document.createElement('page-guideline-wrapper');
	pageGuidelineWrapper.classList.add('pageGuidelineWrapper');
	document.documentElement.appendChild(pageGuidelineWrapper);

	function onMouseOver(event) {
		if (
			event.target.id !== 'superDevHandler' &&
			event.target.id !== 'superDevPopup' &&
			event.target.id !== 'superDevWrapper' &&
			event.target.tagName !== 'HTML' &&
			event.target.id !== 'superDev'
		) {
			event.target.classList.add('pageGuidelineOutline');
			renderPageGuideline(true);
		}
	}

	function onMouseOut(event) {
		if (
			event.target.id !== 'superDevHandler' &&
			event.target.id !== 'superDevPopup' &&
			event.target.id !== 'superDevWrapper' &&
			event.target.tagName !== 'HTML' &&
			event.target.id !== 'superDev'
		) {
			renderPageGuideline(false);
			event.target.classList.remove('pageGuidelineOutline');
		}
	}

	async function onMouseClick(event) {
		event.preventDefault();
		event.stopImmediatePropagation();

		if (event.isTrusted === true) {
			if (
				event.target.id !== 'superDevHandler' &&
				event.target.id !== 'superDevPopup' &&
				event.target.id !== 'superDevWrapper' &&
				event.target.tagName !== 'HTML' &&
				event.target.id !== 'superDev'
			) {
				event.target.style.setProperty('cursor', 'move', 'important');
				event.target.classList.add('moveElementDraggable');
				$('.moveElementDraggable').draggable({
					iframeFix: true,
					containment: 'document',
					cancel: false,
					create: function () {
						renderPageGuideline(false);
					},
					start: function () {
						document.removeEventListener('mouseover', onMouseOver);
						document.removeEventListener('mouseout', onMouseOut);
					},
					stop: function () {
						document.addEventListener('mouseover', onMouseOver);
						document.addEventListener('mouseout', onMouseOut);
					},
				});
			}
		}
	}

	function renderPageGuideline(toShow) {
		if (toShow === true) {
			let pageGuidelinePosition = document.querySelector('.pageGuidelineOutline').getBoundingClientRect();
			let scrollWidth =
				document.documentElement.scrollWidth -
				(document.documentElement.scrollWidth -
					(document.documentElement.offsetWidth +
						(+window.getComputedStyle(document.documentElement).getPropertyValue('margin-left').replaceAll('px', '') +
							+window.getComputedStyle(document.documentElement).getPropertyValue('margin-right').replaceAll('px', ''))));
			let scrollHeight = document.documentElement.scrollHeight;
			let top = pageGuidelinePosition.top + document.documentElement.scrollTop;
			let bottom = pageGuidelinePosition.bottom + document.documentElement.scrollTop;
			let left = pageGuidelinePosition.left + document.documentElement.scrollLeft;
			let right = pageGuidelinePosition.right + document.documentElement.scrollLeft;

			pageGuidelineWrapper.innerHTML = `
			<svg  width="100%" viewBox="0 0 ${scrollWidth} ${scrollHeight}" version="1.1"
			xmlns="http://www.w3.org/2000/svg">
				<rect fill="none" width="${scrollWidth}" height="${scrollHeight}" x="${left}" y="${top}" style="display:none;">
				</rect>
					<line x1="${left}" y1="0" x2="${left}" y2="${scrollHeight}"></line>
					<line x1="${right}" y1="0" x2="${right}" y2="${scrollHeight}"></line>
					<line x1="0" y1="${top}" x2="${scrollWidth}" y2="${top}"></line>
					<line x1="0" y1="${bottom}" x2="${scrollWidth}" y2="${bottom}"></line>
			</svg>`;
		} else {
			pageGuidelineWrapper.innerHTML = ``;
		}
	}

	async function onEscape(event) {
		event.preventDefault();
		event.stopImmediatePropagation();

		if (event.key === 'Escape') {
			if (event.isTrusted === true) {
				await chrome.storage.local.set({['setActFeatDisabled' + activeTab[0].id]: true});
			} else if (event.isTrusted === false) {
				destroyMoveElement();
			}
		}
	}

	function destroyMoveElement() {
		document.removeEventListener('mouseover', onMouseOver);
		document.removeEventListener('mouseout', onMouseOut);
		document.removeEventListener('click', onMouseClick, true);
		document.removeEventListener('keyup', onEscape, true);

		if (document.querySelector('.pageGuidelineOutline')) {
			document.querySelector('.pageGuidelineOutline').blur();
			document.querySelector('.pageGuidelineOutline').classList.remove('pageGuidelineOutline');
		}

		chrome.storage.local.get(['howLongPopupIs' + activeTab[0].id], async function (result) {
			if (result['howLongPopupIs' + activeTab[0].id] === 40.5) {
				await chrome.storage.local.set({['setPopupMaximised' + activeTab[0].id]: true});
			}
		});

		if (document.querySelector('.moveElementDraggable')) {
			$('.moveElementDraggable').draggable('destroy');
			document.querySelectorAll('.moveElementDraggable').forEach(function (element) {
				element.style.setProperty('cursor', 'default', 'important');
			});
			document.querySelector('.moveElementDraggable').classList.remove('moveElementDraggable');
		}

		document.querySelector('.pageGuidelineWrapper').remove();
	}

	port.postMessage({action: 'Move Element Activated'});
	await chrome.storage.local.set({['setPopupMinimised' + activeTab[0].id]: true});
}

function deactivateMoveElement(activeTab, port, request) {
	document.dispatchEvent(new KeyboardEvent('keyup', {key: 'Escape'}));
	port.postMessage({action: 'Move Element Deactivated'});
}

async function activateDeleteElement(activeTab, port, request) {
	document.addEventListener('mouseover', onMouseOver);
	document.addEventListener('mouseout', onMouseOut);
	document.addEventListener('click', onMouseClick, true);
	document.addEventListener('keyup', onEscape, true);
	window.focus({preventScroll: true});

	let pageGuidelineWrapper = document.createElement('page-guideline-wrapper');
	pageGuidelineWrapper.classList.add('pageGuidelineWrapper');
	document.documentElement.appendChild(pageGuidelineWrapper);

	function onMouseOver(event) {
		if (
			event.target.id !== 'superDevHandler' &&
			event.target.id !== 'superDevPopup' &&
			event.target.id !== 'superDevWrapper' &&
			event.target.tagName !== 'HTML' &&
			event.target.id !== 'superDev'
		) {
			event.target.classList.add('pageGuidelineOutline');
			renderPageGuideline(true);
		}
	}

	function onMouseOut(event) {
		if (
			event.target.id !== 'superDevHandler' &&
			event.target.id !== 'superDevPopup' &&
			event.target.id !== 'superDevWrapper' &&
			event.target.tagName !== 'HTML' &&
			event.target.id !== 'superDev'
		) {
			renderPageGuideline(false);
			event.target.classList.remove('pageGuidelineOutline');
		}
	}

	function onMouseClick(event) {
		event.preventDefault();
		event.stopImmediatePropagation();

		if (event.isTrusted === true) {
			if (
				event.target.id !== 'superDevHandler' &&
				event.target.id !== 'superDevPopup' &&
				event.target.id !== 'superDevWrapper' &&
				event.target.tagName !== 'HTML' &&
				event.target.id !== 'superDev'
			) {
				event.target.classList.add('deleteElementWrapper');
				document.querySelector('.deleteElementWrapper').remove();
			}
		}
	}

	function renderPageGuideline(toShow) {
		if (toShow === true) {
			let pageGuidelinePosition = document.querySelector('.pageGuidelineOutline').getBoundingClientRect();
			let scrollWidth =
				document.documentElement.scrollWidth -
				(document.documentElement.scrollWidth -
					(document.documentElement.offsetWidth +
						(+window.getComputedStyle(document.documentElement).getPropertyValue('margin-left').replaceAll('px', '') +
							+window.getComputedStyle(document.documentElement).getPropertyValue('margin-right').replaceAll('px', ''))));
			let scrollHeight = document.documentElement.scrollHeight;
			let top = pageGuidelinePosition.top + document.documentElement.scrollTop;
			let bottom = pageGuidelinePosition.bottom + document.documentElement.scrollTop;
			let left = pageGuidelinePosition.left + document.documentElement.scrollLeft;
			let right = pageGuidelinePosition.right + document.documentElement.scrollLeft;

			pageGuidelineWrapper.innerHTML = `
			<svg  width="100%" viewBox="0 0 ${scrollWidth} ${scrollHeight}" version="1.1"
			xmlns="http://www.w3.org/2000/svg">
				<rect fill="none" width="${scrollWidth}" height="${scrollHeight}" x="${left}" y="${top}" style="display:none;">
				</rect>
					<line x1="${left}" y1="0" x2="${left}" y2="${scrollHeight}"></line>
					<line x1="${right}" y1="0" x2="${right}" y2="${scrollHeight}"></line>
					<line x1="0" y1="${top}" x2="${scrollWidth}" y2="${top}"></line>
					<line x1="0" y1="${bottom}" x2="${scrollWidth}" y2="${bottom}"></line>
			</svg>`;
		} else {
			pageGuidelineWrapper.innerHTML = ``;
		}
	}

	async function onEscape(event) {
		event.preventDefault();
		event.stopImmediatePropagation();

		if (event.key === 'Escape') {
			if (event.isTrusted === true) {
				await chrome.storage.local.set({['setActFeatDisabled' + activeTab[0].id]: true});
			} else if (event.isTrusted === false) {
				destroyDeleteElement();
			}
		}
	}

	function destroyDeleteElement() {
		document.removeEventListener('mouseover', onMouseOver);
		document.removeEventListener('mouseout', onMouseOut);
		document.removeEventListener('click', onMouseClick, true);
		document.removeEventListener('keyup', onEscape, true);

		if (document.querySelector('.pageGuidelineOutline')) {
			document.querySelector('.pageGuidelineOutline').blur();
			document.querySelector('.pageGuidelineOutline').classList.remove('pageGuidelineOutline');
		}

		chrome.storage.local.get(['howLongPopupIs' + activeTab[0].id], async function (result) {
			if (result['howLongPopupIs' + activeTab[0].id] === 40.5) {
				await chrome.storage.local.set({['setPopupMaximised' + activeTab[0].id]: true});
			}
		});

		document.querySelector('.pageGuidelineWrapper').remove();
	}

	port.postMessage({action: 'Delete Element Activated'});
	await chrome.storage.local.set({['setPopupMinimised' + activeTab[0].id]: true});
}

function deactivateDeleteElement(activeTab, port, request) {
	document.dispatchEvent(new KeyboardEvent('keyup', {key: 'Escape'}));
	port.postMessage({action: 'Delete Element Deactivated'});
}

async function activateExportElement(activeTab, port, request) {
	document.addEventListener('mouseover', onMouseOver);
	document.addEventListener('mouseout', onMouseOut);
	document.addEventListener('keyup', onEscape, true);
	window.focus({preventScroll: true});

	let pageGuidelineWrapper = document.createElement('page-guideline-wrapper');
	pageGuidelineWrapper.classList.add('pageGuidelineWrapper');
	document.documentElement.appendChild(pageGuidelineWrapper);

	function onMouseOver(event) {
		if (
			event.target.id !== 'superDevHandler' &&
			event.target.id !== 'superDevPopup' &&
			event.target.id !== 'superDevWrapper' &&
			event.target.tagName !== 'HTML' &&
			event.target.id !== 'superDev'
		) {
			event.target.classList.add('pageGuidelineOutline');
			renderPageGuideline(true);
		}
	}

	function onMouseOut(event) {
		if (
			event.target.id !== 'superDevHandler' &&
			event.target.id !== 'superDevPopup' &&
			event.target.id !== 'superDevWrapper' &&
			event.target.tagName !== 'HTML' &&
			event.target.id !== 'superDev'
		) {
			renderPageGuideline(false);
			event.target.classList.remove('pageGuidelineOutline');
		}
	}

	let portTwo = chrome.runtime.connect({name: 'portTwo'});
	let allStyleSheets = [];
	let regexZero = new RegExp(/url\(['"]?(.*?)['"]?\)/gm); // Search for url()
	let regexOne = new RegExp(/var\(([a-zA-Z-0-9_,#."%\s]+)\)/gm); // CSS variables used in CSS
	let regexTwo = new RegExp(/(--[a-zA-Z0-9-_]+)/gm); // CSS variables declaration
	let regexThree = new RegExp(/(href=['"]|src=['"])(.*?)(['"])/gm); // Search for href and src attributes
	let regexFive = new RegExp(/(srcset=['"]|srcSet=['"])(.*?)(['"])/gm); // Search for srcset and srcSet
	let regexSix = new RegExp(/\\/gm); // Remove backslashes
	let regexSeven = new RegExp(/\/[^/]*$/gm); // Remove everything after last slash

	// All Same Origin Stylesheets
	[...document.styleSheets].forEach(function (valueOne, indexOne) {
		try {
			allStyleSheets[indexOne] = [...valueOne.cssRules]
				.map(function (valueTwo, indexTwo) {
					return valueTwo.cssText;
				})
				.filter(Boolean)
				.join('');

			// Relative CSS URL to Absolute CSS URL
			if (allStyleSheets[indexOne].includes('url(')) {
				let matchStyleURLs = [...allStyleSheets[indexOne].matchAll(regexZero)];
				matchStyleURLs.forEach(function (valueTwo, indexTwo) {
					if (
						!valueTwo[1].replaceAll(regexSix, '').startsWith('//') &&
						!valueTwo[1].replaceAll(regexSix, '').startsWith('blob:') &&
						!valueTwo[1].replaceAll(regexSix, '').startsWith('data:') &&
						!valueTwo[1].replaceAll(regexSix, '').startsWith('http://') &&
						!valueTwo[1].replaceAll(regexSix, '').startsWith('https://')
					) {
						if (valueTwo[1].startsWith('/')) {
							allStyleSheets[indexOne] = allStyleSheets[indexOne].replaceAll(
								valueTwo[0],
								valueTwo[0].replaceAll(valueTwo[1], new URL(new URL(document.baseURI).origin + valueTwo[1]).href)
							);
						} else {
							if (valueOne.href) {
								allStyleSheets[indexOne] = allStyleSheets[indexOne].replaceAll(
									valueTwo[0],
									valueTwo[0].replaceAll(valueTwo[1], new URL(valueOne.href.replaceAll(regexSeven, '') + '/' + valueTwo[1]).href)
								);
							} else {
								allStyleSheets[indexOne] = allStyleSheets[indexOne].replaceAll(
									valueTwo[0],
									valueTwo[0].replaceAll(valueTwo[1], new URL(document.baseURI.replaceAll(regexSeven, '') + '/' + valueTwo[1]).href)
								);
							}
						}
					} else if (valueTwo[1].replaceAll(regexSix, '').startsWith('//')) {
						allStyleSheets[indexOne] = allStyleSheets[indexOne].replaceAll(
							valueTwo[0],
							valueTwo[0].replaceAll(valueTwo[1], new URL('https:' + valueTwo[1]).href)
						);
					}
				});
			}
		} catch (e) {
			allStyleSheets[indexOne] = valueOne.href;
		}
	});

	// All Different Origin Stylesheets
	portTwo.postMessage({action: 'fetchStyles', allStyleSheets: allStyleSheets});
	document.body.style.setProperty('cursor', 'wait', 'important');
	portTwo.onMessage.addListener(function (request) {
		if (request.action === 'allStyleSheets') {
			allStyleSheets = request.allStyleSheets;
			document.body.style.removeProperty('cursor');
			document.addEventListener('click', onMouseClick, true);
		}
	});

	async function onMouseClick(event) {
		event.preventDefault();
		event.stopImmediatePropagation();

		if (event.isTrusted === true && allStyleSheets.length !== 0) {
			if (
				event.target.id !== 'superDevHandler' &&
				event.target.id !== 'superDevPopup' &&
				event.target.id !== 'superDevWrapper' &&
				event.target.tagName !== 'HTML' &&
				event.target.id !== 'superDev'
			) {
				const postcss = require('postcss');
				const selectorparser = require('postcss-selector-parser');
				const discardcomments = require('postcss-discard-comments');
				const autoprefixer = require('autoprefixer'); //CSSNano
				const cssdeclarationsorter = require('css-declaration-sorter'); //CSSNano
				const mergelonghand = require('postcss-merge-longhand');
				const mergerules = require('postcss-merge-rules');
				const discardempty = require('postcss-discard-empty');
				const discardoverridden = require('postcss-discard-overridden');
				const discardduplicates = require('postcss-discard-duplicates');
				const discardunused = require('postcss-discard-unused');
				const orderedvalues = require('postcss-ordered-values');
				const uniqueselectors = require('postcss-unique-selectors');

				let usedSelectors = [];
				let usedSelecOne = [];
				let usedSelecTwo = [];
				let usedRuleSelectors = [];
				let filteredHTML;
				let selectedElement;
				let allStylesRef = allStyleSheets;
				let filteredCSS = postcss.parse(allStylesRef);
				let usedAnimations = [];
				let targetVars = window.getComputedStyle(event.target);
				let notToBeRemoved = [];
				let finalCSS = '';

				// Which Pseudo Selectors to Remove
				const dePseudify = (function () {
					const ignoredPseudos = [
						':link',
						':visited',
						':hover',
						':active',
						':focus',
						':focus-within',
						':enabled',
						':disabled',
						':checked',
						':indeterminate',
						':required',
						':invalid',
						':valid',
						'::first-line',
						'::first-letter',
						'::selection',
						'::before',
						'::after',
						':target',
						':before',
						':after',
						'::?-(?:moz|ms|webkit|o)-[a-z0-9-]+',
					];
					const pseudosRegex = new RegExp('^(' + ignoredPseudos.join('|') + ')$', 'i');
					const processor = selectorparser(function (selectors) {
						selectors.walkPseudos(function (selector) {
							if (pseudosRegex.test(selector.value)) {
								selector.remove();
							}
						});
					});

					return function (selector) {
						return processor.processSync(selector);
					};
				})();

				// Remove Pseudos from Selectors
				filteredCSS.walkRules(function (rule) {
					usedSelectors.push(rule.selectors.map(dePseudify));
				});
				usedSelectors = [...new Set(usedSelectors.flat())];

				// Set filteredHTML
				event.target.classList.remove('pageGuidelineOutline');
				event.target.classList.add('inherited-styles');
				filteredHTML = event.target.outerHTML;

				// Render Event Target Into ShadowRoot
				let exportElementWrapper = document.createElement('export-element-wrapper');
				let exportElementShaRoot = exportElementWrapper.attachShadow({mode: 'closed'});
				exportElementWrapper.style.setProperty('display', 'none', 'important');
				if (filteredHTML.includes('</body>')) {
					exportElementShaRoot.innerHTML = `
					<!DOCTYPE html>
					<html>
					<head><style>${allStylesRef}</style></head>
					${filteredHTML}
					</html>`;
					document.documentElement.appendChild(exportElementWrapper);
				} else {
					exportElementShaRoot.innerHTML = `
					<!DOCTYPE html>
					<html>
					<head><style>${allStylesRef}</style></head>
					<body>${filteredHTML}</body>
					</html>`;
					document.documentElement.appendChild(exportElementWrapper);
				}

				// Filter Unused Selectors
				usedSelecOne = usedSelectors.filter(function (selector) {
					try {
						return exportElementShaRoot.querySelector(selector) !== null;
					} catch (e) {
						return false;
					}
				});
				usedSelecTwo = usedSelectors.filter(function (selector) {
					try {
						return event.target.querySelector(selector) !== null;
					} catch (e) {
						return false;
					}
				});
				exportElementWrapper.remove();
				usedSelectors = [...new Set(usedSelecOne.concat(usedSelecTwo))];

				// Remove Unused CSS
				filteredCSS.walk(function (rule) {
					if (rule.type === 'rule') {
						// Return From Function If Keyframe
						if (rule.parent.type === 'atrule' && rule.parent.name.endsWith('keyframes')) return;

						// Find Used & Filter Unused Selectors
						usedRuleSelectors = rule.selectors.filter(function (selector) {
							selector = dePseudify(selector); // Remove Pseudos
							if (selector[0] === '@') return true; // Don't Filter AtRules
							return usedSelectors.indexOf(selector) !== -1; // Filter Unused Selectors
						});

						// Remove Rule If No Selectors are Used
						if (usedRuleSelectors.length === 0) rule.remove();
						else rule.selectors = usedRuleSelectors;
					}
				});

				// Remove Comments
				filteredCSS.walkComments(function (Comments) {
					Comments.remove();
				});

				// Remove @Media Print + Empty AtRules
				filteredCSS.walkAtRules(function (atRule) {
					if (atRule.name === 'media' && atRule.params === 'print') {
						atRule.remove();
					} else if (atRule.nodes && atRule.nodes.length === 0) {
						atRule.remove();
					}
				});

				// Filter Unused Keyframes
				filteredCSS.walkDecls(function (decl) {
					if (decl.prop.endsWith('animation-name')) {
						usedAnimations.push(...postcss.list.comma(decl.value));
					} else if (decl.prop.endsWith('animation')) {
						postcss.list.comma(decl.value).forEach(function (anim) {
							usedAnimations.push(...postcss.list.space(anim));
						});
					}
				});
				usedAnimations = new Set(usedAnimations);
				filteredCSS.walkAtRules(/keyframes$/, function (atRule) {
					if (!usedAnimations.has(atRule.params)) {
						atRule.remove();
					}
				});

				// Remove CSS Variables
				filteredCSS.walkDecls(function (decl) {
					if (decl.value.includes('var(')) {
						let usedVars = [...new Set(decl.value.match(regexOne))];
						usedVars.forEach(function (valueOne, indexOne) {
							let usedVarsName = valueOne.match(regexTwo);
							if (targetVars.getPropertyValue(usedVarsName[0]) !== '') {
								decl.value = decl.value.replaceAll(
									valueOne,
									valueOne.replaceAll(regexTwo, targetVars.getPropertyValue(usedVarsName[0]).trim()).slice(4).slice(0, -1)
								);
							} else {
								notToBeRemoved.push(usedVarsName[0]);
							}
						});
					}
				});
				filteredCSS.walkDecls(function (decl) {
					if (decl.prop.startsWith('--')) {
						if (!notToBeRemoved.includes(decl.prop)) {
							decl.remove();
						}
					}
				});

				// Stringify FilteredCSS
				postcss.stringify(filteredCSS, function (result) {
					finalCSS += result;
				});
				filteredCSS = finalCSS;

				// Adding Inherited CSS
				selectedElement = window.getComputedStyle(document.querySelector('.inherited-styles'));
				filteredCSS =
					`body { background-color:${window.getComputedStyle(document.body).getPropertyValue('background-color')}; }` +
					`.inherited-styles { box-sizing:${selectedElement.getPropertyValue('box-sizing')}; color:${selectedElement.getPropertyValue(
						'color'
					)}; font-family:${selectedElement.getPropertyValue('font-family')}; font-weight:${selectedElement.getPropertyValue(
						'font-weight'
					)}; font-size:${selectedElement.getPropertyValue('font-size')}; line-height:${selectedElement.getPropertyValue(
						'line-height'
					)}; margin:${selectedElement.getPropertyValue('margin')}; padding:${selectedElement.getPropertyValue('padding')}; }` +
					filteredCSS;

				// If CSS Uses REM?
				let oneRemValue = window.getComputedStyle(document.querySelector('html')).getPropertyValue('font-size');
				if (filteredCSS.includes('rem')) filteredCSS = filteredCSS + `html { font-size: ${oneRemValue}; }`;

				// CSSNano Checks
				await postcss([
					discardcomments,
					autoprefixer,
					cssdeclarationsorter(),
					mergelonghand,
					mergerules,
					discardempty,
					discardoverridden,
					discardduplicates,
					discardunused,
					orderedvalues,
					uniqueselectors,
				])
					.process(filteredCSS, {from: undefined})
					.then(function (result) {
						filteredCSS = result.css;
					});

				// Relative to Absolute, HREF + SRC
				if (filteredHTML.includes('href=') || filteredHTML.includes('src=')) {
					let matchHTMLURLs = [...filteredHTML.matchAll(regexThree)];
					matchHTMLURLs.forEach(function (value, index) {
						if (
							!value[2].replaceAll(regexSix, '').startsWith('//') &&
							!value[2].replaceAll(regexSix, '').startsWith('blob:') &&
							!value[2].replaceAll(regexSix, '').startsWith('data:') &&
							!value[2].replaceAll(regexSix, '').startsWith('http://') &&
							!value[2].replaceAll(regexSix, '').startsWith('https://')
						) {
							if (value[2].startsWith('/')) {
								filteredHTML = filteredHTML.replaceAll(value[0], value[0].replaceAll(value[2], new URL(new URL(document.baseURI).origin + value[2]).href));
							} else {
								filteredHTML = filteredHTML.replaceAll(
									value[0],
									value[0].replaceAll(value[2], new URL(document.baseURI.replaceAll(regexSeven, '') + '/' + value[2]).href)
								);
							}
						} else if (value[2].replaceAll(regexSix, '').startsWith('//')) {
							filteredHTML = filteredHTML.replaceAll(value[0], value[0].replaceAll(value[2], new URL('https:' + value[2]).href));
						}
					});
				}

				// Relative to Absolute, SRCSET
				if (filteredHTML.includes('srcset=') || filteredHTML.includes('srcSet=')) {
					let matchHTMLURLs = [...filteredHTML.matchAll(regexFive)];
					matchHTMLURLs.forEach(function (valueOne, indexOne) {
						let valueOnee = valueOne[0];
						valueOnee
							.replaceAll(/(\s+[0-9]+(\.[0-9]+)?[wx])/gm, '')
							.replaceAll(/ /gm, '')
							.replaceAll(/(srcset=['"]|srcSet=['"])/gm, '')
							.replaceAll(/['"]/gm, '')
							.split(',')
							.forEach(function (valueTwo, indexTwo) {
								if (
									!valueTwo.replaceAll(regexSix, '').startsWith('//') &&
									!valueTwo.replaceAll(regexSix, '').startsWith('blob:') &&
									!valueTwo.replaceAll(regexSix, '').startsWith('data:') &&
									!valueTwo.replaceAll(regexSix, '').startsWith('http://') &&
									!valueTwo.replaceAll(regexSix, '').startsWith('https://')
								) {
									if (valueTwo.startsWith('/')) {
										valueOnee = valueOnee.replaceAll(valueTwo, new URL(new URL(document.baseURI).origin + valueTwo).href);
									} else {
										valueOnee = valueOnee.replaceAll(valueTwo, new URL(document.baseURI.replaceAll(regexSeven, '') + '/' + valueTwo).href);
									}
								} else if (valueTwo.replaceAll(regexSix, '').startsWith('//')) {
									valueOnee = valueOnee.replaceAll(valueTwo, new URL('https:' + valueTwo).href);
								}
							});
						filteredHTML = filteredHTML.replaceAll(valueOne[0], valueOnee);
					});
				}

				// Remove MoveElement Cursor From OuterHTML
				if (filteredHTML.includes('cursor: default !important; ')) {
					filteredHTML = filteredHTML.replaceAll('cursor: default !important; ', '');
				} else if (filteredHTML.includes(' cursor: default !important;')) {
					filteredHTML = filteredHTML.replaceAll(' cursor: default !important;', '');
				}

				// Remove Scripts and Custom Elements
				filteredHTML = filteredHTML.replaceAll(/<script([\S\s]*?)<\/script>/gm, '');
				filteredHTML = filteredHTML.replaceAll(/<superdev-wrapper([\S\s]*?)<\/superdev-wrapper>/gm, '');
				filteredHTML = filteredHTML.replaceAll(/<page-guideline-wrapper([\S\s]*?)<\/page-guideline-wrapper>/gm, '');
				filteredHTML = filteredHTML.replaceAll(/<export-element-wrapper([\S\s]*?)<\/export-element-wrapper>/gm, '');

				// Format Before Codepen/Save File
				filteredHTML = html_beautify(filteredHTML, {indent_size: 2, indent_with_tabs: true, preserve_newlines: false});
				filteredCSS = css_beautify(filteredCSS, {indent_size: 2, indent_with_tabs: true, preserve_newlines: false});

				// Remove Inherited Class from DOM
				event.target.classList.remove('inherited-styles');

				//CodePen or Save to File
				chrome.storage.local.get(['allFeatures'], function (result) {
					JSON.parse(result['allFeatures']).forEach(function (value, index) {
						if (value.id === 'exportElement') {
							// Export to Codepen
							if (value.settings.checkboxExportElement1 === true) {
								let codepenValue = JSON.stringify({
									title: 'SuperDev - Exported Element',
									description: 'Copied with SuperDev',
									html: filteredHTML,
									css: filteredCSS,
									js: `/* https://github.com/twoabd/superdev */`,
									tags: ['SuperDev'],
								});
								let codepenForm = document.createElement('form');
								codepenForm.setAttribute('action', 'https://codepen.io/pen/define');
								codepenForm.setAttribute('method', 'POST');
								codepenForm.setAttribute('target', '_blank');
								codepenForm.innerHTML = '<input type="hidden" name="data" value=\'\' id="codepenValue" />';
								codepenForm.querySelector('#codepenValue').value = codepenValue;
								document.documentElement.appendChild(codepenForm);
								codepenForm.submit();
								codepenForm.remove();
							}
							// Export to File
							else if (value.settings.checkboxExportElement2 === true) {
								let text = `${filteredHTML} <style> ${filteredCSS} </style>`;
								let file = new Blob([text], {type: 'text/plain;charset=utf-8'});
								let saveToFileAnchor = document.createElement('a');
								saveToFileAnchor.href = URL.createObjectURL(file);
								saveToFileAnchor.download = 'exported-element.html';
								document.documentElement.appendChild(saveToFileAnchor);
								let clickEvent = new MouseEvent('click');
								saveToFileAnchor.dispatchEvent(clickEvent);
								setTimeout(function () {
									URL.revokeObjectURL(saveToFileAnchor.href);
									document.documentElement.removeChild(saveToFileAnchor);
								}, 50);
							}
						}
					});
				});
			}
		}
	}

	function renderPageGuideline(toShow) {
		if (toShow === true) {
			let pageGuidelinePosition = document.querySelector('.pageGuidelineOutline').getBoundingClientRect();
			let scrollWidth =
				document.documentElement.scrollWidth -
				(document.documentElement.scrollWidth -
					(document.documentElement.offsetWidth +
						(+window.getComputedStyle(document.documentElement).getPropertyValue('margin-left').replaceAll('px', '') +
							+window.getComputedStyle(document.documentElement).getPropertyValue('margin-right').replaceAll('px', ''))));
			let scrollHeight = document.documentElement.scrollHeight;
			let top = pageGuidelinePosition.top + document.documentElement.scrollTop;
			let bottom = pageGuidelinePosition.bottom + document.documentElement.scrollTop;
			let left = pageGuidelinePosition.left + document.documentElement.scrollLeft;
			let right = pageGuidelinePosition.right + document.documentElement.scrollLeft;

			pageGuidelineWrapper.innerHTML = `
			<svg  width="100%" viewBox="0 0 ${scrollWidth} ${scrollHeight}" version="1.1"
			xmlns="http://www.w3.org/2000/svg">
				<rect fill="none" width="${scrollWidth}" height="${scrollHeight}" x="${left}" y="${top}" style="display:none;">
				</rect>
					<line x1="${left}" y1="0" x2="${left}" y2="${scrollHeight}"></line>
					<line x1="${right}" y1="0" x2="${right}" y2="${scrollHeight}"></line>
					<line x1="0" y1="${top}" x2="${scrollWidth}" y2="${top}"></line>
					<line x1="0" y1="${bottom}" x2="${scrollWidth}" y2="${bottom}"></line>
			</svg>`;
		} else {
			pageGuidelineWrapper.innerHTML = ``;
		}
	}

	async function onEscape(event) {
		event.preventDefault();
		event.stopImmediatePropagation();

		if (event.key === 'Escape') {
			if (event.isTrusted === true) {
				await chrome.storage.local.set({['setActFeatDisabled' + activeTab[0].id]: true});
			} else if (event.isTrusted === false) {
				destroyExportElement();
			}
		}
	}

	function destroyExportElement() {
		document.removeEventListener('mouseover', onMouseOver);
		document.removeEventListener('mouseout', onMouseOut);
		document.removeEventListener('click', onMouseClick, true);
		document.removeEventListener('keyup', onEscape, true);

		if (document.querySelector('.pageGuidelineOutline')) {
			document.querySelector('.pageGuidelineOutline').blur();
			document.querySelector('.pageGuidelineOutline').classList.remove('pageGuidelineOutline');
		}

		chrome.storage.local.get(['howLongPopupIs' + activeTab[0].id], async function (result) {
			if (result['howLongPopupIs' + activeTab[0].id] === 40.5) {
				await chrome.storage.local.set({['setPopupMaximised' + activeTab[0].id]: true});
			}
		});

		document.querySelector('.pageGuidelineWrapper').remove();
	}

	port.postMessage({action: 'Export Element Activated'});
	await chrome.storage.local.set({['setPopupMinimised' + activeTab[0].id]: true});
}

function deactivateExportElement(activeTab, port, request) {
	document.dispatchEvent(new KeyboardEvent('keyup', {key: 'Escape'}));
	port.postMessage({action: 'Export Element Deactivated'});
}

function activateClearAllCache(activeTab, port, request) {
	chrome.storage.local.get(['allFeatures'], function (result) {
		JSON.parse(result['allFeatures']).forEach(function (value, index) {
			if (value.id === 'clearAllCache') {
				let portTwo = chrome.runtime.connect({name: 'portTwo'});
				portTwo.postMessage({action: 'clearAllCache', settings: value.settings});
			}
		});
	});
	port.postMessage({action: 'Clear All Cache Activated'});
}
