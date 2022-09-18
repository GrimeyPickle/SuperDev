export default function DisableAllFeatureExcept(featureId, portFour) {
	let allFeatures = JSON.parse(localStorage.getItem('allFeatures'));
	allFeatures.map((value, index) => {
		if (value.id !== featureId) {
			if (document.querySelector('#' + value.id).classList.contains('active')) {
				document.querySelector('#' + value.id).classList.remove('from-pink-500', 'via-red-500', 'to-yellow-500', 'active');
				document.querySelector('#' + value.id).classList.add('from-btnOne', 'to-btnTwo');
			}
			if (value.id === 'textEditor') {
				portFour.postMessage({action: 'deactivateTextEditor'});
				portFour.onMessage.addListener(function (response) {
					console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Action', response.action);
				});
			}
			if (value.id === 'pageRuler') {
				portFour.postMessage({action: 'deactivatePageRuler'});
				portFour.onMessage.addListener(function (response) {
					console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Action', response.action);
				});
			}
		}
	});
}
