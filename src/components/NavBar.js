import React from 'react';
import {useState, useEffect} from 'react';
import HideAllCompExcept from './functions/HideAllCompExcept';
import PopupHeight from './functions/PopupHeight';
import ActDeactFeature from './functions/ActDeactFeature';

export default function NavBar({allFeatures, activeTab, portThree, allFeaturesRef}) {
	useEffect(function () {
		chrome.storage.onChanged.addListener(async function (changes) {
			// OnUpdate SetMinimised
			if (changes['setPopupMinimised' + activeTab[0].id]) {
				if (changes['setPopupMinimised' + activeTab[0].id]['newValue'] === true) {
					document.querySelector('#navBar').firstChild.style.setProperty('border-radius', '8px');
					portThree.postMessage({action: 'setPopupHeight', height: 40.5, activeTab: activeTab});
					await chrome.storage.local.set({['setPopupMinimised' + activeTab[0].id]: false});
				}
			}

			// OnUpdate SetMaximised
			if (changes['setPopupMaximised' + activeTab[0].id]) {
				if (changes['setPopupMaximised' + activeTab[0].id]['newValue'] === true) {
					portThree.postMessage({action: 'setPopupHeight', height: PopupHeight(allFeatures), activeTab: activeTab});
					document.querySelector('#navBar').firstChild.style.setProperty('border-radius', '');
					await chrome.storage.local.set({['setPopupMaximised' + activeTab[0].id]: false});
				}
			}

			// OnUpdate SetHomePageActive
			if (changes['setHomePageActive' + activeTab[0].id]) {
				if (changes['setHomePageActive' + activeTab[0].id]['newValue'] === true) {
					portThree.postMessage({action: 'setPopupHeight', height: PopupHeight(allFeatures), activeTab: activeTab});
					HideAllCompExcept('mainBody');
					await chrome.storage.local.set({['setHomePageActive' + activeTab[0].id]: false});
				}
			}

			// OnUpdate SetActFeatDisabled
			if (changes['setActFeatDisabled' + activeTab[0].id]) {
				if (changes['setActFeatDisabled' + activeTab[0].id]['newValue'] === true) {
					chrome.storage.local.get(['whichFeatureActive' + activeTab[0].id], async function (result) {
						if (result['whichFeatureActive' + activeTab[0].id] !== null) {
							ActDeactFeature(allFeatures, activeTab, portThree, result['whichFeatureActive' + activeTab[0].id]);
							await chrome.storage.local.set({['setActFeatDisabled' + activeTab[0].id]: false});
						}
					});
				}
			}

			// OnUpdate WhichFeatureActive
			if (changes['whichFeatureActive' + activeTab[0].id]) {
				if (changes['whichFeatureActive' + activeTab[0].id]['newValue'] === 'clearAllCache') {
					document.querySelector('#clearAllCache > i').classList.remove('fa-recycle');
					document.querySelector('#clearAllCache > i').classList.add('fa-badge-check');
					setTimeout(async function () {
						document.querySelector('#clearAllCache > i').classList.remove('fa-badge-check');
						document.querySelector('#clearAllCache > i').classList.add('fa-recycle');
						await chrome.storage.local.set({['whichFeatureActive' + activeTab[0].id]: null});
					}, 1000);
				} else if (changes['whichFeatureActive' + activeTab[0].id]['newValue'] === 'colorPalette') {
					portThree.postMessage({action: 'setPopupHeight', height: PopupHeight(allFeatures), activeTab: activeTab});
					HideAllCompExcept('colorPalettePage');
					let childHeight = PopupHeight(allFeatures) - 41.5;
					document.querySelector('#colorPalettePageChild').style.setProperty('height', `${childHeight}px`);
				}
			}
		});

		// Disable ActFeature on Escape With Focus on Iframe
		document.addEventListener('keyup', function (event) {
			event.preventDefault();
			if (event.key === 'Escape' && event.isTrusted === true) {
				chrome.storage.local.get(['whichFeatureActive' + activeTab[0].id], function (result) {
					if (result['whichFeatureActive' + activeTab[0].id] !== null) {
						ActDeactFeature(allFeatures, activeTab, portThree, result['whichFeatureActive' + activeTab[0].id]);
						portThree.postMessage({action: 'setPopupHeight', height: PopupHeight(allFeatures), activeTab: activeTab});
						HideAllCompExcept('mainBody');
					}
				});
			}
		});
	}, []);

	async function darkMode() {
		if (document.documentElement.classList.contains('dark')) {
			document.documentElement.classList.remove('dark');
			await chrome.storage.local.set({['colorTheme']: 'light'});
			portThree.postMessage({action: 'setPopupShadow', activeTab: activeTab});
		} else if (!document.documentElement.classList.contains('dark')) {
			document.documentElement.classList.add('dark');
			await chrome.storage.local.set({['colorTheme']: 'dark'});
			portThree.postMessage({action: 'setPopupShadow', activeTab: activeTab});
		}
	}

	function toggleInfo() {
		if (document.querySelector('#toggleInfo').classList.contains('hidden')) {
			chrome.storage.local.get(['whichFeatureActive' + activeTab[0].id], function (result) {
				if (result['whichFeatureActive' + activeTab[0].id] !== null) {
					ActDeactFeature(allFeatures, activeTab, portThree, result['whichFeatureActive' + activeTab[0].id]);
				}
			});

			portThree.postMessage({action: 'setPopupHeight', height: PopupHeight(allFeatures), activeTab: activeTab});
			HideAllCompExcept('toggleInfo');

			// Set Child Height, Only Needed For Scrollbar
			let childHeight = PopupHeight(allFeatures) - 41.5;
			document.querySelector('#toggleInfoChild').style.setProperty('height', `${childHeight}px`);
		} else {
			portThree.postMessage({action: 'setPopupHeight', height: PopupHeight(allFeatures), activeTab: activeTab});
			HideAllCompExcept('mainBody');
		}
	}

	function toggleSettings() {
		if (document.querySelector('#toggleSettings').classList.contains('hidden')) {
			chrome.storage.local.get(['whichFeatureActive' + activeTab[0].id], function (result) {
				if (result['whichFeatureActive' + activeTab[0].id] !== null) {
					ActDeactFeature(allFeatures, activeTab, portThree, result['whichFeatureActive' + activeTab[0].id]);
				}
			});

			portThree.postMessage({action: 'setPopupHeight', height: PopupHeight(allFeatures), activeTab: activeTab});
			HideAllCompExcept('toggleSettings');

			// Set Child Height, Only Needed For Scrollbar
			let childHeight = PopupHeight(allFeatures) - 41.5;
			document.querySelector('#toggleSettingsChild').style.setProperty('height', `${childHeight}px`);
		} else {
			portThree.postMessage({action: 'setPopupHeight', height: PopupHeight(allFeatures), activeTab: activeTab});
			HideAllCompExcept('mainBody');
		}
	}

	function stopActFeatButton() {
		chrome.storage.local.get(['whichFeatureActive' + activeTab[0].id], function (result) {
			if (result['whichFeatureActive' + activeTab[0].id] !== null) {
				ActDeactFeature(allFeatures, activeTab, portThree, result['whichFeatureActive' + activeTab[0].id]);
			}
		});
	}

	function minimiseExtension() {
		chrome.storage.local.get(['howLongPopupIs' + activeTab[0].id], async function (result) {
			if (result['howLongPopupIs' + activeTab[0].id] === 40.5) {
				await chrome.storage.local.set({['setPopupMaximised' + activeTab[0].id]: true});
			} else {
				await chrome.storage.local.set({['setPopupMinimised' + activeTab[0].id]: true});
			}
		});
	}

	function showHideExtension() {
		portThree.postMessage({action: 'showHideExtension', activeTab: activeTab});
	}

	return (
		<header id='navBar'>
			<div className='flex justify-between border border-borderOne dark:border-borderOneD box-border rounded-t-lg py-[8px] px-[18px]'>
				<h1 className='text-[13px] text-titleText dark:text-titleTextD font-medium cursor-default select-none relative top-[0.5px]'>
					SuperDev<img className='inline ml-[6px] relative bottom-[1.5px]' src='../icons/icon128.png' alt='logo' width='14'></img>
				</h1>
				<nav className='relative bottom-[0.5px]'>
					<button
						tabIndex='-1'
						id='stopActFeatButton'
						className='text-faText dark:text-faTextD text-right fa-solid fa-circle-stop text-xs ml-[6px] p-1 py-[5px] border-0 outline-0 invisible'
						onClick={stopActFeatButton}></button>
					<button
						tabIndex='-1'
						id='movePopupButton'
						className='text-faText dark:text-faTextD text-right fa-solid fa-up-down-left-right text-xs ml-[6px] p-1 py-[5px] border-0 outline-0'></button>
					<button
						tabIndex='-1'
						id='toggleInfoButton'
						className='text-faText dark:text-faTextD text-right fa-solid fa-circle-info text-[12.5px] ml-[6px] p-1 py-[5px] border-0 outline-0'
						onClick={toggleInfo}></button>
					<button
						tabIndex='-1'
						id='darkModeButton'
						className='text-faText dark:text-faTextD text-right fa-solid fa-circle-half-stroke text-[12.5px] ml-[6px] p-1 py-[5px] border-0 outline-0'
						onClick={darkMode}></button>
					<button
						tabIndex='-1'
						id='toggleSettingsButton'
						className='text-faText dark:text-faTextD text-right fa-solid fa-gear text-[12.5px] ml-[6px] p-1 py-[5px] border-0 outline-0'
						onClick={toggleSettings}></button>
					<button
						tabIndex='-1'
						id='minimiseExtensionButton'
						className='text-faText dark:text-faTextD text-right fa-solid fa-circle-minus text-[12.5px] ml-[6px] p-1 py-[5px] border-0 outline-0'
						onClick={minimiseExtension}></button>
					<button
						tabIndex='-1'
						id='showHideExtensionButton'
						className='text-faText dark:text-faTextD text-right fa-solid fa-circle-xmark text-[12.5px] ml-[6px] p-1 py-[5px] pr-0 border-0 outline-0'
						onClick={showHideExtension}></button>
				</nav>
			</div>
		</header>
	);
}
