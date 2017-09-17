"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app = require("application");
var frames = require("ui/frame");
var Toast = require("nativescript-toast");
var page_1 = require("ui/page");
// import { Config } from '../env-config';
var utils = require("utils/utils");
var Connectivity = require("connectivity");
var dialogs = require("ui/dialogs");
// import { BarcodeScanner } from 'nativescript-barcodescanner';
var frame = require('ui/frame');
var pageCommon = require("ui/page/page-common").PageBase;
var LoadingIndicator = require("nativescript-loading-indicator").LoadingIndicator;
var page = new page_1.Page();
var loader = new LoadingIndicator();
// var barcodescanner = new BarcodeScanner();
var oldMissingSize = 0;
var optionsIndicator = {
    message: 'Đang tải...'
};
var Utils = (function () {
    function Utils() {
    }
    Utils.hideScrollViewBar = function (scrollView) {
        if (app.android) {
            scrollView.android.setVerticalScrollBarEnabled(false);
        }
        else {
            scrollView.ios.showsVerticalScrollIndicator = false;
        }
    };
    Utils.trackAndroidKeyboard = function () {
        if (!frame.topmost()) {
            setTimeout(Utils.trackAndroidKeyboard, 100);
            return;
        }
        if (!frame.topmost().currentPage) {
            setTimeout(Utils.trackAndroidKeyboard, 100);
            return;
        }
        var cv = frame.topmost().currentPage.android;
        var softButtonHeight = Utils.getSoftButtonHeight();
        var density = utils.ad.getApplicationContext().getResources().getDisplayMetrics().density;
        cv.getViewTreeObserver().addOnGlobalLayoutListener(new android.view.ViewTreeObserver.OnGlobalLayoutListener({
            onGlobalLayout: function () {
                // Grab the Current Screen Height
                var rect = new android.graphics.Rect();
                cv.getWindowVisibleDisplayFrame(rect);
                var screenHeight = cv.getRootView().getHeight();
                var missingSize = screenHeight - rect.bottom;
                if (missingSize > (screenHeight * 0.15)) {
                    notifyKeyboard(true, Math.round(missingSize / density - softButtonHeight)); // exchange Pixel to DP and minius softButtonHeight
                }
                else {
                    notifyKeyboard(false, Math.round(missingSize / density - softButtonHeight));
                }
            }
        }));
        function notifyKeyboard(isShown, missingSize) {
            // For a notification to occur, the frame, topmost() and currentPage has to exist; so we won't bother checking again...
            if (oldMissingSize == missingSize) {
                // avoid call onKeyboard while keyboard open
                return;
            }
            var currentPage = frame.topmost().currentPage;
            if (currentPage.exports && typeof currentPage.exports.onKeyboard == "function") {
                oldMissingSize = missingSize;
                currentPage.exports.onKeyboard({ showing: isShown, missingSize: missingSize, object: currentPage });
            }
        }
    };
    Utils.numberToFormatedString = function (num) {
        var str = num.toString();
        var result = '';
        var count = -1;
        for (var i = str.length - 1; i > -1; i--) {
            count++;
            if (count != 0 && count % 3 == 0) {
                result = '.'.concat(result);
            }
            result = str[i].concat(result);
        }
        return result;
    };
    Utils.getSoftButtonHeight = function () {
        var softButtonHeight = 0;
        if (app.android) {
            var context = utils.ad.getApplicationContext();
            var metrics = new android.util.DisplayMetrics();
            var windowManager = context.getSystemService(android.content.Context.WINDOW_SERVICE);
            windowManager.getDefaultDisplay().getMetrics(metrics);
            var usableHeight = metrics.heightPixels / metrics.density;
            windowManager.getDefaultDisplay().getRealMetrics(metrics);
            var realHeight = metrics.heightPixels / metrics.density;
            softButtonHeight = realHeight - usableHeight;
            return softButtonHeight;
        }
        else {
            return softButtonHeight;
        }
    };
    Utils.clearConfig = function (config) {
        for (var _i = 0, config_1 = config; _i < config_1.length; _i++) {
            var field = config_1[_i];
            if (field.errors) {
                for (var _a = 0, _b = field.errors; _a < _b.length; _a++) {
                    var error = _b[_a];
                    error.error = false;
                }
            }
            if (field.value)
                field.value = '';
            if (field.messageError)
                field.messageError = '';
        }
    };
    Utils.checkInternetConnection = function () {
        if (Connectivity.getConnectionType() == Connectivity.connectionType.none) {
            dialogs.alert({
                title: "Không thể kết nối",
                message: 'Không thể kết nối Internet',
                okButtonText: "OK"
            });
            return false;
        }
        return true;
    };
    Utils.hideKeyboard = function (txtArray) {
        if (app.android) {
            try {
                var activity = app.android.foregroundActivity;
                var Context = app.android.currentContext;
                var inputManager = Context.getSystemService(android.content.Context.INPUT_METHOD_SERVICE);
                inputManager.hideSoftInputFromWindow(activity.getCurrentFocus().getWindowToken(), android.view.inputmethod.InputMethodManager.HIDE_NOT_ALWAYS);
            }
            catch (ex) {
            }
        }
        else if (app.ios) {
            for (var txtItem in txtArray) {
                // txtArray[txtItem].ios.endEditing(true);
                txtArray[txtItem].ios.resignFirstResponder();
            }
        }
    };
    Utils.navigate = function (path, clearHistory, data) {
        if (path) {
            try {
                frames.topmost().navigate({
                    moduleName: path,
                    context: data || '',
                    animated: true,
                    clearHistory: clearHistory || false
                });
            }
            catch (ex) {
                console.log(ex);
            }
        }
    };
    Utils.goBack = function (BackstackEntry) {
        try {
            if (BackstackEntry)
                frames.topmost().goBack(BackstackEntry);
            else
                frames.topmost().goBack();
        }
        catch (ex) {
            console.log(ex);
        }
    };
    // public static hideStatusBar() {
    //     if (app.android)
    //         app.android.startActivity.getWindow().addFlags(android.view.WindowManager.LayoutParams.FLAG_FULLSCREEN);
    //     else
    //         UIApplication.sharedApplication.statusBarHidden = true;
    // }
    // public static showStatusBar() {
    //     if (app.android)
    //         app.android.startActivity.getWindow().addFlags(android.view.WindowManager.LayoutParams.FLAG_FORCE_NOT_FULLSCREEN);
    //     else
    //         UIApplication.sharedApplication.statusBarHidden = false;
    // }
    Utils.showModal = function (page, path, closeModalCallBack, fullsreen, context) {
        if (path && page) {
            try {
                page.showModal(path, context || {}, closeModalCallBack, fullsreen);
            }
            catch (ex) {
                console.log("Error showModal Utils: " + ex);
            }
        }
        else {
            console.log("Error showModal Utils");
        }
    };
    Utils.toastAlert = function (message) {
        Toast.makeText(message, "short").show();
    };
    Utils.showLoadingIndicator = function () {
        loader.show(optionsIndicator);
    };
    Utils.hideLoadingIndicator = function () {
        loader.hide();
    };
    // public static transparentModalIOS() {
    //     if (app.ios) {
    //         Page.prototype._showNativeModalView = function (parent, context, closeCallback, fullscreen) {
    //             pageCommon.prototype._showNativeModalView.call(this, parent, context, closeCallback, fullscreen);
    //             let that = this;
    //             this._modalParent = parent;
    //             if (!parent.ios.view.window) {
    //                 throw new Error('Parent page is not part of the window hierarchy. Close the current modal page before showing another one!');
    //             }
    //             if (fullscreen) {
    //                 this._ios.modalPresentationStyle = 0;
    //             } else {
    //                 this._ios.modalPresentationStyle = 2;
    //                 this._UIModalPresentationFormSheet = true;
    //             }
    //             pageCommon.prototype._raiseShowingModallyEvent.call(this);
    //             this._ios.providesPresentationContextTransitionStyle = true;
    //             this._ios.definesPresentationContext = true;
    //             this._ios.modalPresentationStyle = UIModalPresentationOverFullScreen;
    //             this._ios.modalTransitionStyle = UIModalTransitionStyleCrossDissolve;
    //             this._ios.view.backgroundColor = UIColor.clearColor;
    //             parent.ios.presentViewControllerAnimatedCompletion(this._ios, false, function completion() {
    //                 that._ios.modalPresentationStyle = UIModalPresentationCurrentContext;
    //                 that._raiseShownModallyEvent(parent, context, closeCallback);
    //             });
    //         }
    //     }
    // }
    // public static turnOffAnimateParentModalIOS() {
    //     if (app.ios) {
    //         Page.prototype._hideNativeModalView = function (parent) {
    //             parent.requestLayout();
    //             parent._ios.dismissModalViewControllerAnimated(false);
    //             pageCommon.prototype._hideNativeModalView.call(parent);
    //         }
    //     }
    // }
    // public static scanBarCode(page: any, callBackFunction: Function, closeCallbackFunction?: Function, buttonMaunalText?: string) {
    //     if (!closeCallbackFunction) {
    //         closeCallbackFunction = function () { console.log('close scan modal'); };
    //     }
    //     if (!buttonMaunalText) {
    //         buttonMaunalText = 'Nhập mã barcode';
    //     }
    //     localStorage.setItem('buttonMaunalText', buttonMaunalText);
    //     barcodescanner.hasCameraPermission()
    //         .then((permitted) => {
    //             if (permitted) {
    //                 page.showModal('shared/components/scan-modal/scan-modal', callBackFunction, closeCallbackFunction, (!!app.ios));
    //             }
    //             else {
    //                 barcodescanner.requestCameraPermission()
    //                     .then(() => {
    //                         page.showModal('shared/components/scan-modal/scan-modal', callBackFunction, closeCallbackFunction, (!!app.ios));
    //                     })
    //                     .catch((err) => {
    //                         dialogs.alert({
    //                             title: "Thông Báo",
    //                             message: "Vui lòng cho phép ứng dụng truy cập Camera để sử dụng tính năng quét barcode.",
    //                             okButtonText: "Trở lại"
    //                         });
    //                     })
    //             }
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    // }
    Utils.assign = function (obj) {
        var newObj = {};
        for (var i in obj) {
            newObj[i] = obj[i];
        }
        ;
        return newObj;
    };
    return Utils;
}());
exports.Utils = Utils;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlDQUFvQztBQUNwQyxpQ0FBb0M7QUFDcEMsMENBQTRDO0FBQzVDLGdDQUErQjtBQUMvQiwwQ0FBMEM7QUFDMUMsbUNBQXFDO0FBQ3JDLDJDQUE2QztBQUM3QyxvQ0FBdUM7QUFDdkMsZ0VBQWdFO0FBQ2hFLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNoQyxJQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQyxRQUFRLENBQUM7QUFDM0QsSUFBSSxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsZ0NBQWdDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQztBQUNsRixJQUFJLElBQUksR0FBRyxJQUFJLFdBQUksRUFBRSxDQUFDO0FBRXRCLElBQUksTUFBTSxHQUFHLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztBQUNwQyw2Q0FBNkM7QUFDN0MsSUFBSSxjQUFjLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZCLElBQUksZ0JBQWdCLEdBQUc7SUFDbkIsT0FBTyxFQUFFLGFBQWE7Q0FDekIsQ0FBQztBQUNGO0lBQUE7SUF1UUEsQ0FBQztJQXJRaUIsdUJBQWlCLEdBQS9CLFVBQWdDLFVBQWU7UUFDM0MsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDZCxVQUFVLENBQUMsT0FBTyxDQUFDLDJCQUEyQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFELENBQUM7UUFDRCxJQUFJLENBQUMsQ0FBQztZQUNGLFVBQVUsQ0FBQyxHQUFHLENBQUMsNEJBQTRCLEdBQUcsS0FBSyxDQUFDO1FBQ3hELENBQUM7SUFDTCxDQUFDO0lBRWEsMEJBQW9CLEdBQWxDO1FBQ0ksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQUMsVUFB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QWtFO0lBQ2xFLDJDQUEyQztJQUMzQyxpQ0FBaUM7SUFDakMsK0JBQStCO0lBQy9CLG1JQUFtSTtJQUNuSSxnQkFBZ0I7SUFDaEIscUJBQXFCO0lBQ3JCLDJEQUEyRDtJQUMzRCxvQ0FBb0M7SUFDcEMsMklBQTJJO0lBRTNJLHlCQUF5QjtJQUN6Qix3Q0FBd0M7SUFDeEMsMENBQTBDO0lBQzFDLGtEQUFrRDtJQUNsRCx3SEFBd0g7SUFDeEgsc0RBQXNEO0lBQ3RELDhCQUE4QjtJQUM5Qix5QkFBeUI7SUFDekIsZ0JBQWdCO0lBQ2hCLGFBQWE7SUFDYiw0QkFBNEI7SUFDNUIsZ0NBQWdDO0lBQ2hDLGFBQWE7SUFDYixJQUFJO0lBRVUsWUFBTSxHQUFwQixVQUFxQixHQUFHO1FBQ3BCLElBQUksTUFBTSxHQUFRLEVBQUUsQ0FBQztRQUNyQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkIsQ0FBQztRQUFBLENBQUM7UUFDRixNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFDTCxZQUFDO0FBQUQsQ0FBQyxBQXZRRCxJQXVRQztBQXZRWSxzQkFBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhcHAgPSByZXF1aXJlKFwiYXBwbGljYXRpb25cIik7XG5pbXBvcnQgZnJhbWVzID0gcmVxdWlyZShcInVpL2ZyYW1lXCIpO1xuaW1wb3J0ICogYXMgVG9hc3QgZnJvbSAnbmF0aXZlc2NyaXB0LXRvYXN0JztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuLy8gaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi4vZW52LWNvbmZpZyc7XG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tIFwidXRpbHMvdXRpbHNcIjtcbmltcG9ydCAqIGFzIENvbm5lY3Rpdml0eSBmcm9tIFwiY29ubmVjdGl2aXR5XCI7XG5pbXBvcnQgZGlhbG9ncyA9IHJlcXVpcmUoXCJ1aS9kaWFsb2dzXCIpO1xuLy8gaW1wb3J0IHsgQmFyY29kZVNjYW5uZXIgfSBmcm9tICduYXRpdmVzY3JpcHQtYmFyY29kZXNjYW5uZXInO1xudmFyIGZyYW1lID0gcmVxdWlyZSgndWkvZnJhbWUnKTtcbmNvbnN0IHBhZ2VDb21tb24gPSByZXF1aXJlKFwidWkvcGFnZS9wYWdlLWNvbW1vblwiKS5QYWdlQmFzZTtcbnZhciBMb2FkaW5nSW5kaWNhdG9yID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1sb2FkaW5nLWluZGljYXRvclwiKS5Mb2FkaW5nSW5kaWNhdG9yO1xudmFyIHBhZ2UgPSBuZXcgUGFnZSgpO1xuZGVjbGFyZSB2YXIgYW5kcm9pZDogYW55O1xudmFyIGxvYWRlciA9IG5ldyBMb2FkaW5nSW5kaWNhdG9yKCk7XG4vLyB2YXIgYmFyY29kZXNjYW5uZXIgPSBuZXcgQmFyY29kZVNjYW5uZXIoKTtcbnZhciBvbGRNaXNzaW5nU2l6ZSA9IDA7XG52YXIgb3B0aW9uc0luZGljYXRvciA9IHtcbiAgICBtZXNzYWdlOiAnxJBhbmcgdOG6o2kuLi4nXG59O1xuZXhwb3J0IGNsYXNzIFV0aWxzIHtcblxuICAgIHB1YmxpYyBzdGF0aWMgaGlkZVNjcm9sbFZpZXdCYXIoc2Nyb2xsVmlldzogYW55KSB7XG4gICAgICAgIGlmIChhcHAuYW5kcm9pZCkge1xuICAgICAgICAgICAgc2Nyb2xsVmlldy5hbmRyb2lkLnNldFZlcnRpY2FsU2Nyb2xsQmFyRW5hYmxlZChmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzY3JvbGxWaWV3Lmlvcy5zaG93c1ZlcnRpY2FsU2Nyb2xsSW5kaWNhdG9yID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHRyYWNrQW5kcm9pZEtleWJvYXJkKCkge1xuICAgICAgICBpZiAoIWZyYW1lLnRvcG1vc3QoKSkgeyBzZXRUaW1lb3V0KCBVdGlscy50cmFja0FuZHJvaWRLZXlib2FyZCwgMTAwKTsgcmV0dXJuOyB9XG4gICAgICAgIGlmICghZnJhbWUudG9wbW9zdCgpLmN1cnJlbnRQYWdlKSB7IHNldFRpbWVvdXQoIFV0aWxzLnRyYWNrQW5kcm9pZEtleWJvYXJkLCAxMDApOyByZXR1cm47IH1cblxuICAgICAgICB2YXIgY3YgPSBmcmFtZS50b3Btb3N0KCkuY3VycmVudFBhZ2UuYW5kcm9pZDtcbiAgICAgICAgdmFyIHNvZnRCdXR0b25IZWlnaHQgPSBVdGlscy5nZXRTb2Z0QnV0dG9uSGVpZ2h0KCk7XG4gICAgICAgIHZhciBkZW5zaXR5ID0gdXRpbHMuYWQuZ2V0QXBwbGljYXRpb25Db250ZXh0KCkuZ2V0UmVzb3VyY2VzKCkuZ2V0RGlzcGxheU1ldHJpY3MoKS5kZW5zaXR5O1xuICAgICAgICBjdi5nZXRWaWV3VHJlZU9ic2VydmVyKCkuYWRkT25HbG9iYWxMYXlvdXRMaXN0ZW5lcihuZXcgYW5kcm9pZC52aWV3LlZpZXdUcmVlT2JzZXJ2ZXIuT25HbG9iYWxMYXlvdXRMaXN0ZW5lcih7XG4gICAgICAgICAgICBvbkdsb2JhbExheW91dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIC8vIEdyYWIgdGhlIEN1cnJlbnQgU2NyZWVuIEhlaWdodFxuICAgICAgICAgICAgICAgIHZhciByZWN0ID0gbmV3IGFuZHJvaWQuZ3JhcGhpY3MuUmVjdCgpO1xuICAgICAgICAgICAgICAgIGN2LmdldFdpbmRvd1Zpc2libGVEaXNwbGF5RnJhbWUocmVjdCk7XG4gICAgICAgICAgICAgICAgdmFyIHNjcmVlbkhlaWdodCA9IGN2LmdldFJvb3RWaWV3KCkuZ2V0SGVpZ2h0KCk7XG4gICAgICAgICAgICAgICAgdmFyIG1pc3NpbmdTaXplID0gc2NyZWVuSGVpZ2h0IC0gcmVjdC5ib3R0b207XG4gICAgICAgICAgICAgICAgaWYgKG1pc3NpbmdTaXplID4gKHNjcmVlbkhlaWdodCAqIDAuMTUpKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vdGlmeUtleWJvYXJkKHRydWUsICBNYXRoLnJvdW5kKG1pc3NpbmdTaXplIC8gZGVuc2l0eSAtIHNvZnRCdXR0b25IZWlnaHQpKTsgLy8gZXhjaGFuZ2UgUGl4ZWwgdG8gRFAgYW5kIG1pbml1cyBzb2Z0QnV0dG9uSGVpZ2h0XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbm90aWZ5S2V5Ym9hcmQoZmFsc2UsICBNYXRoLnJvdW5kKG1pc3NpbmdTaXplIC8gZGVuc2l0eSAtIHNvZnRCdXR0b25IZWlnaHQpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKTtcblxuICAgICAgICBmdW5jdGlvbiBub3RpZnlLZXlib2FyZChpc1Nob3duLCBtaXNzaW5nU2l6ZSkge1xuICAgICAgICAgICAgLy8gRm9yIGEgbm90aWZpY2F0aW9uIHRvIG9jY3VyLCB0aGUgZnJhbWUsIHRvcG1vc3QoKSBhbmQgY3VycmVudFBhZ2UgaGFzIHRvIGV4aXN0OyBzbyB3ZSB3b24ndCBib3RoZXIgY2hlY2tpbmcgYWdhaW4uLi5cbiAgICAgICAgICAgIGlmIChvbGRNaXNzaW5nU2l6ZSA9PSBtaXNzaW5nU2l6ZSkge1xuICAgICAgICAgICAgICAgIC8vIGF2b2lkIGNhbGwgb25LZXlib2FyZCB3aGlsZSBrZXlib2FyZCBvcGVuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGN1cnJlbnRQYWdlID0gZnJhbWUudG9wbW9zdCgpLmN1cnJlbnRQYWdlO1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRQYWdlLmV4cG9ydHMgJiYgdHlwZW9mIGN1cnJlbnRQYWdlLmV4cG9ydHMub25LZXlib2FyZCA9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICBvbGRNaXNzaW5nU2l6ZSA9IG1pc3NpbmdTaXplO1xuICAgICAgICAgICAgICAgIGN1cnJlbnRQYWdlLmV4cG9ydHMub25LZXlib2FyZCh7IHNob3dpbmc6IGlzU2hvd24sIG1pc3NpbmdTaXplOiBtaXNzaW5nU2l6ZSwgb2JqZWN0OiBjdXJyZW50UGFnZSB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBwdWJsaWMgc3RhdGljIG51bWJlclRvRm9ybWF0ZWRTdHJpbmcobnVtOiBhbnkpIHtcbiAgICAgICAgdmFyIHN0ciA9IG51bS50b1N0cmluZygpO1xuICAgICAgICB2YXIgcmVzdWx0OiBzdHJpbmcgPSAnJztcbiAgICAgICAgdmFyIGNvdW50ID0gLTE7XG4gICAgICAgIGZvciAobGV0IGkgPSBzdHIubGVuZ3RoIC0gMTsgaSA+IC0xOyBpLS0pIHtcbiAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICBpZiAoY291bnQgIT0gMCAmJiBjb3VudCAlIDMgPT0gMCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9ICcuJy5jb25jYXQocmVzdWx0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdCA9IHN0cltpXS5jb25jYXQocmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0U29mdEJ1dHRvbkhlaWdodCgpIHtcbiAgICAgICAgdmFyIHNvZnRCdXR0b25IZWlnaHQgPSAwO1xuICAgICAgICBpZiAoYXBwLmFuZHJvaWQpIHtcbiAgICAgICAgICAgIHZhciBjb250ZXh0ID0gdXRpbHMuYWQuZ2V0QXBwbGljYXRpb25Db250ZXh0KCk7XG4gICAgICAgICAgICB2YXIgbWV0cmljcyA9IG5ldyBhbmRyb2lkLnV0aWwuRGlzcGxheU1ldHJpY3MoKTtcbiAgICAgICAgICAgIHZhciB3aW5kb3dNYW5hZ2VyID0gY29udGV4dC5nZXRTeXN0ZW1TZXJ2aWNlKGFuZHJvaWQuY29udGVudC5Db250ZXh0LldJTkRPV19TRVJWSUNFKTtcbiAgICAgICAgICAgIHdpbmRvd01hbmFnZXIuZ2V0RGVmYXVsdERpc3BsYXkoKS5nZXRNZXRyaWNzKG1ldHJpY3MpO1xuICAgICAgICAgICAgdmFyIHVzYWJsZUhlaWdodCA9IG1ldHJpY3MuaGVpZ2h0UGl4ZWxzIC8gbWV0cmljcy5kZW5zaXR5O1xuICAgICAgICAgICAgd2luZG93TWFuYWdlci5nZXREZWZhdWx0RGlzcGxheSgpLmdldFJlYWxNZXRyaWNzKG1ldHJpY3MpO1xuICAgICAgICAgICAgdmFyIHJlYWxIZWlnaHQgPSBtZXRyaWNzLmhlaWdodFBpeGVscyAvIG1ldHJpY3MuZGVuc2l0eTtcbiAgICAgICAgICAgIHNvZnRCdXR0b25IZWlnaHQgPSByZWFsSGVpZ2h0IC0gdXNhYmxlSGVpZ2h0O1xuICAgICAgICAgICAgcmV0dXJuIHNvZnRCdXR0b25IZWlnaHQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gc29mdEJ1dHRvbkhlaWdodDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgY2xlYXJDb25maWcoY29uZmlnKSB7XG4gICAgICAgIGZvciAodmFyIGZpZWxkIG9mIGNvbmZpZykge1xuICAgICAgICAgICAgaWYgKGZpZWxkLmVycm9ycykge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGVycm9yIG9mIGZpZWxkLmVycm9ycykge1xuICAgICAgICAgICAgICAgICAgICBlcnJvci5lcnJvciA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmaWVsZC52YWx1ZSkgZmllbGQudmFsdWUgPSAnJztcbiAgICAgICAgICAgIGlmIChmaWVsZC5tZXNzYWdlRXJyb3IpIGZpZWxkLm1lc3NhZ2VFcnJvciA9ICcnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBjaGVja0ludGVybmV0Q29ubmVjdGlvbigpIHtcbiAgICAgICAgaWYgKENvbm5lY3Rpdml0eS5nZXRDb25uZWN0aW9uVHlwZSgpID09IENvbm5lY3Rpdml0eS5jb25uZWN0aW9uVHlwZS5ub25lKSB7XG4gICAgICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJLaMO0bmcgdGjhu4Mga+G6v3QgbuG7kWlcIixcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAnS2jDtG5nIHRo4buDIGvhur90IG7hu5FpIEludGVybmV0JyxcbiAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT0tcIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBoaWRlS2V5Ym9hcmQodHh0QXJyYXk/KSB7XG4gICAgICAgIGlmIChhcHAuYW5kcm9pZCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgYWN0aXZpdHkgPSBhcHAuYW5kcm9pZC5mb3JlZ3JvdW5kQWN0aXZpdHk7XG4gICAgICAgICAgICAgICAgbGV0IENvbnRleHQgPSBhcHAuYW5kcm9pZC5jdXJyZW50Q29udGV4dDtcbiAgICAgICAgICAgICAgICBsZXQgaW5wdXRNYW5hZ2VyID0gQ29udGV4dC5nZXRTeXN0ZW1TZXJ2aWNlKGFuZHJvaWQuY29udGVudC5Db250ZXh0LklOUFVUX01FVEhPRF9TRVJWSUNFKTtcbiAgICAgICAgICAgICAgICBpbnB1dE1hbmFnZXIuaGlkZVNvZnRJbnB1dEZyb21XaW5kb3coYWN0aXZpdHkuZ2V0Q3VycmVudEZvY3VzKCkuZ2V0V2luZG93VG9rZW4oKSwgYW5kcm9pZC52aWV3LmlucHV0bWV0aG9kLklucHV0TWV0aG9kTWFuYWdlci5ISURFX05PVF9BTFdBWVMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGV4KSB7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhcHAuaW9zKSB7XG4gICAgICAgICAgICBmb3IgKHZhciB0eHRJdGVtIGluIHR4dEFycmF5KSB7XG4gICAgICAgICAgICAgICAgLy8gdHh0QXJyYXlbdHh0SXRlbV0uaW9zLmVuZEVkaXRpbmcodHJ1ZSk7XG4gICAgICAgICAgICAgICAgdHh0QXJyYXlbdHh0SXRlbV0uaW9zLnJlc2lnbkZpcnN0UmVzcG9uZGVyKCk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBwdWJsaWMgc3RhdGljIG5hdmlnYXRlKHBhdGg6IHN0cmluZywgY2xlYXJIaXN0b3J5PzogYm9vbGVhbiwgZGF0YT86IGFueSkge1xuICAgICAgICBpZiAocGF0aCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBmcmFtZXMudG9wbW9zdCgpLm5hdmlnYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgbW9kdWxlTmFtZTogcGF0aCxcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dDogZGF0YSB8fCAnJyxcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNsZWFySGlzdG9yeTogY2xlYXJIaXN0b3J5IHx8IGZhbHNlXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChleCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBwdWJsaWMgc3RhdGljIGdvQmFjayhCYWNrc3RhY2tFbnRyeT8pIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChCYWNrc3RhY2tFbnRyeSlcbiAgICAgICAgICAgICAgICBmcmFtZXMudG9wbW9zdCgpLmdvQmFjayhCYWNrc3RhY2tFbnRyeSk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgZnJhbWVzLnRvcG1vc3QoKS5nb0JhY2soKTtcbiAgICAgICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGV4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHB1YmxpYyBzdGF0aWMgaGlkZVN0YXR1c0JhcigpIHtcbiAgICAvLyAgICAgaWYgKGFwcC5hbmRyb2lkKVxuICAgIC8vICAgICAgICAgYXBwLmFuZHJvaWQuc3RhcnRBY3Rpdml0eS5nZXRXaW5kb3coKS5hZGRGbGFncyhhbmRyb2lkLnZpZXcuV2luZG93TWFuYWdlci5MYXlvdXRQYXJhbXMuRkxBR19GVUxMU0NSRUVOKTtcbiAgICAvLyAgICAgZWxzZVxuICAgIC8vICAgICAgICAgVUlBcHBsaWNhdGlvbi5zaGFyZWRBcHBsaWNhdGlvbi5zdGF0dXNCYXJIaWRkZW4gPSB0cnVlO1xuICAgIC8vIH1cblxuICAgIC8vIHB1YmxpYyBzdGF0aWMgc2hvd1N0YXR1c0JhcigpIHtcbiAgICAvLyAgICAgaWYgKGFwcC5hbmRyb2lkKVxuICAgIC8vICAgICAgICAgYXBwLmFuZHJvaWQuc3RhcnRBY3Rpdml0eS5nZXRXaW5kb3coKS5hZGRGbGFncyhhbmRyb2lkLnZpZXcuV2luZG93TWFuYWdlci5MYXlvdXRQYXJhbXMuRkxBR19GT1JDRV9OT1RfRlVMTFNDUkVFTik7XG4gICAgLy8gICAgIGVsc2VcbiAgICAvLyAgICAgICAgIFVJQXBwbGljYXRpb24uc2hhcmVkQXBwbGljYXRpb24uc3RhdHVzQmFySGlkZGVuID0gZmFsc2U7XG4gICAgLy8gfVxuXG4gICAgcHVibGljIHN0YXRpYyBzaG93TW9kYWwocGFnZTogYW55LCBwYXRoOiBzdHJpbmcsIGNsb3NlTW9kYWxDYWxsQmFjazogRnVuY3Rpb24sIGZ1bGxzcmVlbjogYm9vbGVhbiwgY29udGV4dD86IGFueSwgKSB7XG4gICAgICAgIGlmIChwYXRoICYmIHBhZ2UpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcGFnZS5zaG93TW9kYWwocGF0aCwgY29udGV4dCB8fCB7fSwgY2xvc2VNb2RhbENhbGxCYWNrLCBmdWxsc3JlZW4pO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIHNob3dNb2RhbCBVdGlsczogXCIgKyBleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIHNob3dNb2RhbCBVdGlsc1wiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwdWJsaWMgc3RhdGljIHRvYXN0QWxlcnQobWVzc2FnZSkge1xuICAgICAgICBUb2FzdC5tYWtlVGV4dChtZXNzYWdlLCBcInNob3J0XCIpLnNob3coKTtcbiAgICB9XG4gICAgcHVibGljIHN0YXRpYyBzaG93TG9hZGluZ0luZGljYXRvcigpIHtcbiAgICAgICAgbG9hZGVyLnNob3cob3B0aW9uc0luZGljYXRvcik7XG4gICAgfVxuICAgIHB1YmxpYyBzdGF0aWMgaGlkZUxvYWRpbmdJbmRpY2F0b3IoKSB7XG4gICAgICAgIGxvYWRlci5oaWRlKCk7XG4gICAgfVxuICAgIC8vIHB1YmxpYyBzdGF0aWMgdHJhbnNwYXJlbnRNb2RhbElPUygpIHtcbiAgICAvLyAgICAgaWYgKGFwcC5pb3MpIHtcbiAgICAvLyAgICAgICAgIFBhZ2UucHJvdG90eXBlLl9zaG93TmF0aXZlTW9kYWxWaWV3ID0gZnVuY3Rpb24gKHBhcmVudCwgY29udGV4dCwgY2xvc2VDYWxsYmFjaywgZnVsbHNjcmVlbikge1xuICAgIC8vICAgICAgICAgICAgIHBhZ2VDb21tb24ucHJvdG90eXBlLl9zaG93TmF0aXZlTW9kYWxWaWV3LmNhbGwodGhpcywgcGFyZW50LCBjb250ZXh0LCBjbG9zZUNhbGxiYWNrLCBmdWxsc2NyZWVuKTtcbiAgICAvLyAgICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgLy8gICAgICAgICAgICAgdGhpcy5fbW9kYWxQYXJlbnQgPSBwYXJlbnQ7XG4gICAgLy8gICAgICAgICAgICAgaWYgKCFwYXJlbnQuaW9zLnZpZXcud2luZG93KSB7XG4gICAgLy8gICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUGFyZW50IHBhZ2UgaXMgbm90IHBhcnQgb2YgdGhlIHdpbmRvdyBoaWVyYXJjaHkuIENsb3NlIHRoZSBjdXJyZW50IG1vZGFsIHBhZ2UgYmVmb3JlIHNob3dpbmcgYW5vdGhlciBvbmUhJyk7XG4gICAgLy8gICAgICAgICAgICAgfVxuICAgIC8vICAgICAgICAgICAgIGlmIChmdWxsc2NyZWVuKSB7XG4gICAgLy8gICAgICAgICAgICAgICAgIHRoaXMuX2lvcy5tb2RhbFByZXNlbnRhdGlvblN0eWxlID0gMDtcbiAgICAvLyAgICAgICAgICAgICB9IGVsc2Uge1xuICAgIC8vICAgICAgICAgICAgICAgICB0aGlzLl9pb3MubW9kYWxQcmVzZW50YXRpb25TdHlsZSA9IDI7XG4gICAgLy8gICAgICAgICAgICAgICAgIHRoaXMuX1VJTW9kYWxQcmVzZW50YXRpb25Gb3JtU2hlZXQgPSB0cnVlO1xuICAgIC8vICAgICAgICAgICAgIH1cbiAgICAvLyAgICAgICAgICAgICBwYWdlQ29tbW9uLnByb3RvdHlwZS5fcmFpc2VTaG93aW5nTW9kYWxseUV2ZW50LmNhbGwodGhpcyk7XG4gICAgLy8gICAgICAgICAgICAgdGhpcy5faW9zLnByb3ZpZGVzUHJlc2VudGF0aW9uQ29udGV4dFRyYW5zaXRpb25TdHlsZSA9IHRydWU7XG4gICAgLy8gICAgICAgICAgICAgdGhpcy5faW9zLmRlZmluZXNQcmVzZW50YXRpb25Db250ZXh0ID0gdHJ1ZTtcbiAgICAvLyAgICAgICAgICAgICB0aGlzLl9pb3MubW9kYWxQcmVzZW50YXRpb25TdHlsZSA9IFVJTW9kYWxQcmVzZW50YXRpb25PdmVyRnVsbFNjcmVlbjtcbiAgICAvLyAgICAgICAgICAgICB0aGlzLl9pb3MubW9kYWxUcmFuc2l0aW9uU3R5bGUgPSBVSU1vZGFsVHJhbnNpdGlvblN0eWxlQ3Jvc3NEaXNzb2x2ZTtcbiAgICAvLyAgICAgICAgICAgICB0aGlzLl9pb3Mudmlldy5iYWNrZ3JvdW5kQ29sb3IgPSBVSUNvbG9yLmNsZWFyQ29sb3I7XG4gICAgLy8gICAgICAgICAgICAgcGFyZW50Lmlvcy5wcmVzZW50Vmlld0NvbnRyb2xsZXJBbmltYXRlZENvbXBsZXRpb24odGhpcy5faW9zLCBmYWxzZSwgZnVuY3Rpb24gY29tcGxldGlvbigpIHtcbiAgICAvLyAgICAgICAgICAgICAgICAgdGhhdC5faW9zLm1vZGFsUHJlc2VudGF0aW9uU3R5bGUgPSBVSU1vZGFsUHJlc2VudGF0aW9uQ3VycmVudENvbnRleHQ7XG4gICAgLy8gICAgICAgICAgICAgICAgIHRoYXQuX3JhaXNlU2hvd25Nb2RhbGx5RXZlbnQocGFyZW50LCBjb250ZXh0LCBjbG9zZUNhbGxiYWNrKTtcbiAgICAvLyAgICAgICAgICAgICB9KTtcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgfVxuICAgIC8vIH1cbiAgICAvLyBwdWJsaWMgc3RhdGljIHR1cm5PZmZBbmltYXRlUGFyZW50TW9kYWxJT1MoKSB7XG4gICAgLy8gICAgIGlmIChhcHAuaW9zKSB7XG4gICAgLy8gICAgICAgICBQYWdlLnByb3RvdHlwZS5faGlkZU5hdGl2ZU1vZGFsVmlldyA9IGZ1bmN0aW9uIChwYXJlbnQpIHtcbiAgICAvLyAgICAgICAgICAgICBwYXJlbnQucmVxdWVzdExheW91dCgpO1xuICAgIC8vICAgICAgICAgICAgIHBhcmVudC5faW9zLmRpc21pc3NNb2RhbFZpZXdDb250cm9sbGVyQW5pbWF0ZWQoZmFsc2UpO1xuICAgIC8vICAgICAgICAgICAgIHBhZ2VDb21tb24ucHJvdG90eXBlLl9oaWRlTmF0aXZlTW9kYWxWaWV3LmNhbGwocGFyZW50KTtcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgfVxuICAgIC8vIH1cblxuICAgIC8vIHB1YmxpYyBzdGF0aWMgc2NhbkJhckNvZGUocGFnZTogYW55LCBjYWxsQmFja0Z1bmN0aW9uOiBGdW5jdGlvbiwgY2xvc2VDYWxsYmFja0Z1bmN0aW9uPzogRnVuY3Rpb24sIGJ1dHRvbk1hdW5hbFRleHQ/OiBzdHJpbmcpIHtcbiAgICAvLyAgICAgaWYgKCFjbG9zZUNhbGxiYWNrRnVuY3Rpb24pIHtcbiAgICAvLyAgICAgICAgIGNsb3NlQ2FsbGJhY2tGdW5jdGlvbiA9IGZ1bmN0aW9uICgpIHsgY29uc29sZS5sb2coJ2Nsb3NlIHNjYW4gbW9kYWwnKTsgfTtcbiAgICAvLyAgICAgfVxuICAgIC8vICAgICBpZiAoIWJ1dHRvbk1hdW5hbFRleHQpIHtcbiAgICAvLyAgICAgICAgIGJ1dHRvbk1hdW5hbFRleHQgPSAnTmjhuq1wIG3DoyBiYXJjb2RlJztcbiAgICAvLyAgICAgfVxuICAgIC8vICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYnV0dG9uTWF1bmFsVGV4dCcsIGJ1dHRvbk1hdW5hbFRleHQpO1xuICAgIC8vICAgICBiYXJjb2Rlc2Nhbm5lci5oYXNDYW1lcmFQZXJtaXNzaW9uKClcbiAgICAvLyAgICAgICAgIC50aGVuKChwZXJtaXR0ZWQpID0+IHtcbiAgICAvLyAgICAgICAgICAgICBpZiAocGVybWl0dGVkKSB7XG4gICAgLy8gICAgICAgICAgICAgICAgIHBhZ2Uuc2hvd01vZGFsKCdzaGFyZWQvY29tcG9uZW50cy9zY2FuLW1vZGFsL3NjYW4tbW9kYWwnLCBjYWxsQmFja0Z1bmN0aW9uLCBjbG9zZUNhbGxiYWNrRnVuY3Rpb24sICghIWFwcC5pb3MpKTtcbiAgICAvLyAgICAgICAgICAgICB9XG4gICAgLy8gICAgICAgICAgICAgZWxzZSB7XG4gICAgLy8gICAgICAgICAgICAgICAgIGJhcmNvZGVzY2FubmVyLnJlcXVlc3RDYW1lcmFQZXJtaXNzaW9uKClcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBwYWdlLnNob3dNb2RhbCgnc2hhcmVkL2NvbXBvbmVudHMvc2Nhbi1tb2RhbC9zY2FuLW1vZGFsJywgY2FsbEJhY2tGdW5jdGlvbiwgY2xvc2VDYWxsYmFja0Z1bmN0aW9uLCAoISFhcHAuaW9zKSk7XG5cbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJUaMO0bmcgQsOhb1wiLFxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIlZ1aSBsw7JuZyBjaG8gcGjDqXAg4bupbmcgZOG7pW5nIHRydXkgY+G6rXAgQ2FtZXJhIMSR4buDIHPhu60gZOG7pW5nIHTDrW5oIG7Eg25nIHF1w6l0IGJhcmNvZGUuXCIsXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJUcuG7nyBs4bqhaVwiXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgLy8gICAgICAgICAgICAgICAgICAgICB9KVxuICAgIC8vICAgICAgICAgICAgIH1cbiAgICAvLyAgICAgICAgIH0pXG4gICAgLy8gICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgIC8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgLy8gICAgICAgICB9KVxuICAgIC8vIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgYXNzaWduKG9iaikge1xuICAgICAgICB2YXIgbmV3T2JqOiBhbnkgPSB7fTtcbiAgICAgICAgZm9yICh2YXIgaSBpbiBvYmopIHtcbiAgICAgICAgICAgIG5ld09ialtpXSA9IG9ialtpXTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5ld09iajtcbiAgICB9XG59XG5cbiJdfQ==