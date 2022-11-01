import React from 'react';
import {useState, useEffect} from 'react';
import HideAllCompExcept from './functions/HideAllCompExcept';
import PopupHeight from './functions/PopupHeight';
import ChangeHeight from './functions/ChangeHeight';
import JustChangeHeight from './functions/JustChangeHeight';
import ActDeactFeature from './functions/ActDeactFeature';

export default function NavBar({logConsole, portThree}) {
	const [isLoadingOne, setIsLoadingOne] = useState(true);
	const [allFeatures, setAllFeatures] = useState([]);

	useEffect(function () {
		// Get AllFeatures
		chrome.storage.local.get(['allFeatures'], function (result) {
			setAllFeatures(JSON.parse(result.allFeatures));
			if (logConsole === 'true') console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'NavJs, UseEffect - Set AllFeatures');
			setIsLoadingOne(false);
		});

		// OnUpdate AllFeatures
		chrome.storage.onChanged.addListener(function (changes) {
			if (changes.allFeatures) {
				setAllFeatures(JSON.parse(changes.allFeatures.newValue));
				if (logConsole === 'true') console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'NavJs, UseEffect, OnUpdate - Set AllFeatures');
			}
		});

		// OnUpdate SetMinimised, CH + HAE
		chrome.storage.onChanged.addListener(function (changes) {
			if (changes.setMinimised) {
				if (changes.setMinimised.newValue === true) {
					if (logConsole === 'true')
						console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'NavJs, UseEffect, OnUpdate - If SetMinimised True, Minimise');
					document.querySelector('#navBar').firstChild.style.borderRadius = '8px';
					ChangeHeight(portThree, 40.5); // 40.5 = Header Height
				}

				// What Will Happen On Closing Minimised Popup
				// It Will Become Minimised + Invisible
				// HAE is For Making It Visible While
				// ChangeHeight Will Make Its Height Appropriate
				else if (changes.setMinimised.newValue === false) {
					if (logConsole === 'true') console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'NavJs, UseEffect, OnUpdate - If SetMinimised False');
					chrome.storage.local.get(['allFeatures'], function (result) {
						if (!document.querySelector('#mainBody').classList.contains('hidden')) {
							if (logConsole === 'true') console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'NavJs, UseEffect, OnUpdate - CH + HAE MainBody');
							ChangeHeight(portThree, PopupHeight(JSON.parse(result.allFeatures)));
							HideAllCompExcept('mainBody');
						} else if (!document.querySelector('#toggleInfo').classList.contains('hidden')) {
							if (logConsole === 'true') console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'NavJs, UseEffect, OnUpdate - CH + HAE Info');
							ChangeHeight(portThree, PopupHeight(JSON.parse(result.allFeatures)));
							HideAllCompExcept('toggleInfo');
						} else if (!document.querySelector('#toggleSettings').classList.contains('hidden')) {
							if (logConsole === 'true') console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'NavJs, UseEffect, OnUpdate - CH + HAE Settings');
							ChangeHeight(portThree, PopupHeight(JSON.parse(result.allFeatures)));
							HideAllCompExcept('toggleSettings');
						} else if (!document.querySelector('#colorPalettePage').classList.contains('hidden')) {
							if (logConsole === 'true') console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'NavJs, UseEffect, OnUpdate - CH + HAE Palette');
							ChangeHeight(portThree, PopupHeight(JSON.parse(result.allFeatures)));
							HideAllCompExcept('colorPalettePage');
						}
					});
				}
			}
		});

		// OnUpdate SetHomePageActive, JCH + HAE
		chrome.storage.onChanged.addListener(function (changes) {
			if (changes.setHomePageActive) {
				if (changes.setHomePageActive.newValue === true) {
					if (logConsole === 'true') console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'NavJs, UseEffect, OnUpdate - If SetHomeActive');
					if (document.querySelector('#mainBody').classList.contains('hidden')) {
						chrome.storage.local.get(['allFeatures'], function (result) {
							if (logConsole === 'true') console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'NavJs, UseEffect, OnUpdate - CH + HAE MainBody');
							JustChangeHeight(portThree, PopupHeight(JSON.parse(result.allFeatures)));
							HideAllCompExcept('mainBody');
						});
					}
					chrome.storage.local.set({setHomePageActive: false});
				}
			}
		});

		// OnUpdate SetActFeatDisabled, ADF
		chrome.storage.onChanged.addListener(function (changes) {
			if (changes.setActFeatDisabled) {
				if (changes.setActFeatDisabled.newValue === true) {
					if (logConsole === 'true') console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'NavJs, UseEffect, OnUpdate - If SetActFeatDisable');
					chrome.storage.local.get(['allFeatures'], function (result) {
						chrome.storage.local.get(['whichFeatureActive'], function (outcome) {
							if (outcome.whichFeatureActive !== null) {
								if (logConsole === 'true')
									console.log(
										new Date().getSeconds(),
										new Date().getMilliseconds(),
										`NavJs, UseEffect, OnUpdate, ADF - ${outcome.whichFeatureActive.charAt(0).toUpperCase() + outcome.whichFeatureActive.slice(1)}`
									);
								ActDeactFeature(logConsole, portThree, JSON.parse(result.allFeatures), outcome.whichFeatureActive);
								chrome.storage.local.set({setActFeatDisabled: false});
							}
						});
					});
				}
			}
		});

		// OnUpdate WhichFeatureActive, CH + HAE
		chrome.storage.onChanged.addListener(function (changes) {
			if (changes.whichFeatureActive) {
				if (changes.whichFeatureActive.newValue === 'clearAllCache') {
					if (logConsole === 'true') console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'NavJs, UseEffect, OnUpdate, WFA - ClearAllCache');
					if (document.querySelector('#clearAllCache')) {
						document.querySelector('#clearAllCache > i').classList.remove('fa-recycle');
						document.querySelector('#clearAllCache > i').classList.add('fa-badge-check');
						setTimeout(function () {
							document.querySelector('#clearAllCache > i').classList.remove('fa-badge-check');
							document.querySelector('#clearAllCache > i').classList.add('fa-recycle');
							chrome.storage.local.set({whichFeatureActive: null});
						}, 1000);
					}
				} else if (changes.whichFeatureActive.newValue === 'colorPalette') {
					if (logConsole === 'true') console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'NavJs, UseEffect, OnUpdate, WFA - Palette');
					chrome.storage.local.get(['allFeatures'], function (result) {
						if (document.querySelector('#colorPalettePage')) {
							if (document.querySelector('#colorPalettePage').classList.contains('hidden')) {
								if (logConsole === 'true') console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'NavJs, UseEffect, OnUpdate - CH + HAE Palette');
								ChangeHeight(portThree, PopupHeight(JSON.parse(result.allFeatures)));
								HideAllCompExcept('colorPalettePage');

								let bodyHeight = PopupHeight(JSON.parse(result.allFeatures)) - 41.5;
								document.querySelector('#colorPalettePageChild').style.height = `${bodyHeight}px`;
							}
						}
					});
				}
			}
		});
	}, []);

	function DarkMode() {
		chrome.storage.local.get(['colorTheme'], function (result) {
			if (result.colorTheme === 'light') {
				document.documentElement.classList.add('dark');
				chrome.storage.local.set({colorTheme: 'dark'});
			} else if (result.colorTheme === 'dark') {
				document.documentElement.classList.remove('dark');
				chrome.storage.local.set({colorTheme: 'light'});
			}
		});
	}

	function ToggleInfo() {
		if (document.querySelector('#toggleInfo').classList.contains('hidden')) {
			chrome.storage.local.set({setActFeatDisabled: true});

			if (logConsole === 'true') console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'NavJs, ToggleInfo - CH + HAE ToggleInfo');
			ChangeHeight(portThree, PopupHeight(allFeatures));
			HideAllCompExcept('toggleInfo');

			let bodyHeight = PopupHeight(allFeatures) - 41.5;
			document.querySelector('#toggleInfoChild').style.height = `${bodyHeight}px`;

			chrome.storage.local.get(['howLongPopupIs'], function (result) {
				if (result.howLongPopupIs === 40.5) chrome.storage.local.set({setMinimised: false});
			});
		} else {
			if (logConsole === 'true') console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'NavJs, ToggleInfo - CH + HAE MainBody');
			ChangeHeight(portThree, PopupHeight(allFeatures));
			HideAllCompExcept('mainBody');
			chrome.storage.local.get(['howLongPopupIs'], function (result) {
				if (result.howLongPopupIs === 40.5) chrome.storage.local.set({setMinimised: false});
			});
		}
	}

	function ToggleSettings() {
		if (document.querySelector('#toggleSettings').classList.contains('hidden')) {
			chrome.storage.local.set({setActFeatDisabled: true});

			if (logConsole === 'true') console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'NavJs, ToggleSettings - CH + HAE ToggleSettings');
			ChangeHeight(portThree, PopupHeight(allFeatures));
			HideAllCompExcept('toggleSettings');

			let bodyHeight = PopupHeight(allFeatures) - 41.5;
			document.querySelector('#toggleSettingsChild').style.height = `${bodyHeight}px`;

			chrome.storage.local.get(['howLongPopupIs'], function (result) {
				if (result.howLongPopupIs === 40.5) chrome.storage.local.set({setMinimised: false});
			});
		} else {
			if (logConsole === 'true') console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'NavJs, ToggleSettings - CH + HAE MainBody');
			ChangeHeight(portThree, PopupHeight(allFeatures));
			HideAllCompExcept('mainBody');

			chrome.storage.local.get(['howLongPopupIs'], function (result) {
				if (result.howLongPopupIs === 40.5) chrome.storage.local.set({setMinimised: false});
			});
		}
	}

	function PauseExtension() {
		chrome.storage.local.set({setActFeatDisabled: true});
		chrome.storage.local.set({isStopBtnPressed: true});
	}

	function MinimiseExtension() {
		chrome.storage.local.get(['howLongPopupIs'], function (result) {
			if (result.howLongPopupIs === 40.5) {
				chrome.storage.local.set({setMinimised: false});
			} else {
				chrome.storage.local.set({setMinimised: true});
			}
		});
	}

	function ShowHideExtension() {
		if (logConsole === 'true') console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'NavJs, SHE, Send MSG to CJS');
		portThree.postMessage({action: 'showHideExtension'});
	}

	if (!isLoadingOne) {
		return (
			<header id='navBar'>
				<div className='flex justify-between border border-borderOne dark:border-borderOneD box-border rounded-t-lg py-[8px] px-[18px]'>
					<h1 className='text-[13px] text-titleText dark:text-titleTextD font-medium cursor-default select-none relative top-[0.5px]'>
						SuperDev<img className='inline ml-[6px] relative bottom-[1.5px]' src='../icons/icon128.png' alt='logo' width='14'></img>
					</h1>
					<nav className='relative bottom-[0.5px]'>
						<button
							id='pauseExtensionButton'
							tabIndex='-1'
							className='text-faText dark:text-faTextD text-right fa-solid fa-circle-stop text-xs ml-[6px] p-1 py-[5px] border-0 outline-0 invisible'
							onClick={PauseExtension}></button>
						<button
							id='movePopupButton'
							tabIndex='-1'
							className='text-faText dark:text-faTextD text-right fa-solid fa-up-down-left-right text-xs ml-[6px] p-1 py-[5px] border-0 outline-0'></button>
						<button
							id='toggleInfoButton'
							tabIndex='-1'
							className='text-faText dark:text-faTextD text-right fa-solid fa-circle-info text-[12.5px] ml-[6px] p-1 py-[5px] border-0 outline-0'
							onClick={ToggleInfo}></button>
						<button
							id='darkModeButton'
							tabIndex='-1'
							className='text-faText dark:text-faTextD text-right fa-solid fa-circle-half-stroke text-[12.5px] ml-[6px] p-1 py-[5px] border-0 outline-0'
							onClick={DarkMode}></button>
						<button
							id='toggleSettingsButton'
							tabIndex='-1'
							className='text-faText dark:text-faTextD text-right fa-solid fa-gear text-[12.5px] ml-[6px] p-1 py-[5px] border-0 outline-0'
							onClick={ToggleSettings}></button>
						<button
							id='minimiseExtensionButton'
							tabIndex='-1'
							className='text-faText dark:text-faTextD text-right fa-solid fa-circle-minus text-[12.5px] ml-[6px] p-1 py-[5px] border-0 outline-0'
							onClick={MinimiseExtension}></button>
						<button
							id='showHideExtensionButton'
							tabIndex='-1'
							className='text-faText dark:text-faTextD text-right fa-solid fa-circle-xmark text-[12.5px] ml-[6px] p-1 py-[5px] pr-0 border-0 outline-0'
							onClick={ShowHideExtension}></button>
					</nav>
				</div>
			</header>
		);
	}
}
