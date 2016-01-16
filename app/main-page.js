var vmModule = require("./main-view-model");
var switchModule = require("ui/switch");
var observableModule = require("data/observable");
var enums = require("ui/enums");

function pageLoaded(args) {
    var page = args.object;
    vmModule.mainViewModel.set("messageVisibility", "visible");
    page.bindingContext = vmModule.mainViewModel;
}

var label;
function onLabelLoaded(args) {
	console.log(args.object);
	label = args.object;
}

function onSwitchLoaded(args) {
	console.log("onSwitchLoaded");
	var switchObject = args.object;
	switchObject.addEventListener(observableModule.Observable.propertyChangeEvent, function (args) {
		console.log("property changed");
		if (args.propertyName == switchModule.Switch.checkedProperty.name) {
			console.log("Switch property changed");
    		vmModule.mainViewModel.set("messageVisibility", args.object.checked ? enums.Visibility.visible : enums.Visibility.collapse);
    		// label.visibility = args.object.checked ? enums.Visibility.visible : enums.Visibility.collapse;
		}
	});
}

exports.pageLoaded = pageLoaded;
exports.onLabelLoaded = onLabelLoaded;
exports.onSwitchLoaded = onSwitchLoaded;