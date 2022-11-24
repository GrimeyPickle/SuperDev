<p align="center">
  <img src="https://github.com/twoabd/superdev/blob/main/screenshots/github/1.png">
</p>

## SuperDev &middot; [![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

<a href="https://www.producthunt.com/posts/superdev?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-superdev" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=368130&theme=light" alt="SuperDev - All&#0032;in&#0032;one&#0032;browser&#0032;extension&#0032;for&#0032;web&#0032;designers&#0032;&#0038;&#0032;developers | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>

An Open-source Swiss Army Toolbox for Web Designers, Developers, and Founders That Minimises the Development/Designing Time and Provides Various Tools to Debug the Web Without Any Hassle. List of Features Below -

* ```Text Editor``` - Edit Any Website's Text Easily
* ```Page Ruler``` - Measure Distance Between Two Points
* ```Color Picker``` - Pick Site Colors, Even From Images in RGB/HEX
* ```Color Palette``` - Website's Colors Palette in RGB/HEX
* ```Page Guideline``` - Check Alignments in Real-time With Guidelines
* ```Page Highlight``` - Highlight Page Elements With Different Colors
* ```Move Element``` - Move Any Element Within the Page
* ```Delete Element``` - Delete Any Element From the Page
* ```Export Element``` - Export HTML + Used CSS of Any Page Element
* ```Clear All Cache``` - Clear Cache/Cookie/LocalStorage

This project is tested with BrowserStack.
</br>

https://user-images.githubusercontent.com/52224233/202926098-43390400-63e2-4ede-94a1-0fca804ba7ad.mov

### Privacy Note
* It Does Not Collect Any Data at All and is Fully Offline Except for Two Fetch Requests.
* Those Fetch Requests Are Used to Fetch the Site's External Stylesheets by Export Element Feature.

### Additional Features
* ```Dark/Light Mode``` - Choose Between Dark and Light Mode
* ```Minimise Popup``` - Manual/Auto Minimise Popup
* ```Move Popup``` - Move Popup Anywhere on the Page
* ```Customise Settings``` - Choose From Multiple Settings

### About Export Element
* It Removes All ```Unused CSS``` From the Exported Element, So Only Used CSS Will Be Included in the Results.
* It Converts All Relative Urls to Absolute, It Means All ```href```, ```src```, ```srcset``` or CSS ```url()``` Will Work Perfectly After Export.
* It Works Perfectly Well With ```@media```, ```@font-face```, ```@supports```, ```@imports``` and ```@keyframes``` and Retains Only the Used Ones.
* It Works Perfectly Well With CSS ```vars()```, and Converts CSS Variable Values to Actual Value.
* It Removes Comments From CSS, Add Browser Prefixes Such as ```-moz```, ```-webkit``` Wherever Necessary.
* It Removes Overridden, Discarded, Unused CSS Rules Completely.
* It Converts to Shorthands Wherever Necessary and Formats Everything Before Export.
* It's Algorithm (500+ Lines) is Second to None Except CSS Scan's (Paid) That Too With a Negligible 5-10% Difference in Precision.

### Install On
* [Google Chrome](https://chrome.google.com/webstore/detail/superdev/jlkikimlceonbmfjieipbonnglnlchhl) - Working Perfectly
* [Microsoft Edge](https://chrome.google.com/webstore/detail/superdev/jlkikimlceonbmfjieipbonnglnlchhl) - Working Perfectly
* [Brave Browser](https://chrome.google.com/webstore/detail/superdev/jlkikimlceonbmfjieipbonnglnlchhl) - Working Perfectly
* [Mozilla Firefox]() - Coming Really Soon<br>

### Built With
* ```ReactJS``` - Used by Superdev Popup
* ```TailWindCSS``` - Used by Superdev Popup
* ```PostCSS``` - Used by Export Element
* ```JSBeautify``` - Used by Export Element

### Troubleshooting
* This is a Very Active Project, and Bug Reports Are Most Welcome.
* If It's Not Working on a Site, Try Turning It Off and/or Refreshing the Page.
* If It's Still Not Working, Uninstall and Reinstall the Extension.
* Make Sure You're Running the Latest Version of Superdev + the Browser.
* If None of This Work, Submit an Issue [Here](Https://github.com/twoabd/superdev/issues/new).

### Important Note
* ```Page Ruler``` and ```Color Picker``` Both Takes Page Screenshots, Process That Image to Find the Distance Between Two Objects and the Color of That Area. It Means It Won't Work Properly on Sliders and Moving Elements of the Page.
* ```Export to Codepen``` Functionality of Export Element Features Won't Work on Some Super Secure Sites Because of CSP (Form Action) Header, Save to File Instead in That Case. Due to Issues in Chrome Api MV3, CSP Header Can't Be Modified Programmatically, and Disabling CSP Will Be a Major Security Risk, That's Why I Am Leaving It as It is.
* ```Export Element``` Feature Currently Disables CORS on All Fonts, Images, and Media Files Across All Websites. This is to Ensure All Fonts, Images, and Media Files Load Correctly on Codepen and Exported Files on the User's Device. However, I Still Need to Figure Out Whether to Retain This Feature or Remove It.
* ```Superdev``` is Saving You and Your Team a Good Amount of Time and Effort? [Buy Me a Coffee](Https://www.buymeacoffee.com/abdollah) ☕

### Manual Install
You Can Run Superdev Locally Without Having to Install It From the Chrome Store. Here's How:

* Download the Code. In the Web Version of Github, You Can Do That by Clicking the Green "Code" Button, and Then "Download Zip".
* Go to chrome://extensions/ in Your Browser, and Enable Developer Mode
* Unzip First and Drag the Build Folder or Click on the "Load Unpacked" Button and Locate the Build Folder.
* That's It, You Will Now Be Able to Use Superdev Locally. Make Sure You Pin It on the Toolbar by Clicking the "Puzzle" Icon in the Toolbar (Top Right) and Pinning Superdev.

### Coming in Pro
* ```CSS Inspector and Viewer```
* ```Padding/Margin Visualiser```
* ```Add Custom JS and CSS```
* ```Fonts Inspector and Fonts List```
* ```Website Font Changer```
* ```Extract Media/Images/SVGs```
* ```Take Full Site Screenshots```
* ```Responsive Site Viewer```
* ```Quick Source Code Viewer```
* ```Site Info + Technology Lookup```
* ```And More ++```

### Todo:
* ```Document Codebase``` Properly
* ```Optimise``` Export Element Algorithm
* ```Optimise``` Code Performance & Design
* ```Add Support``` for Mozilla Firefox
* ```Translate``` to Other Languages
* ```Move Codebase``` to TypeScript
#
Feel Free to Reach Out to Me Through Email at magnetonx@gmail.com or [Linkedin](https://www.linkedin.com/in/abdullahchoudhary/) if You Have Any Questions or Feedback! Hope You Find This Useful 😀
