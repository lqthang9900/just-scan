import app = require("application");
import frames = require("ui/frame");
import * as Toast from 'nativescript-toast';
import { Page } from "ui/page";
// import { Config } from '../env-config';
import * as utils from "utils/utils";
import * as Connectivity from "connectivity";
import dialogs = require("ui/dialogs");
// import { BarcodeScanner } from 'nativescript-barcodescanner';
var frame = require('ui/frame');
const pageCommon = require("ui/page/page-common").PageBase;
var LoadingIndicator = require("nativescript-loading-indicator").LoadingIndicator;
var page = new Page();
declare var android: any;
var loader = new LoadingIndicator();
// var barcodescanner = new BarcodeScanner();
var oldMissingSize = 0;
var optionsIndicator = {
    message: 'Đang tải...'
};
export class Utils {

    public static hideScrollViewBar(scrollView: any) {
        if (app.android) {
            scrollView.android.setVerticalScrollBarEnabled(false);
        }
        else {
            scrollView.ios.showsVerticalScrollIndicator = false;
        }
    }

    public static trackAndroidKeyboard() {
        if (!frame.topmost()) { setTimeout( Utils.trackAndroidKeyboard, 100); return; }
        if (!frame.topmost().currentPage) { setTimeout( Utils.trackAndroidKeyboard, 100); return; }

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
                    notifyKeyboard(true,  Math.round(missingSize / density - softButtonHeight)); // exchange Pixel to DP and minius softButtonHeight
                } else {
                    notifyKeyboard(false,  Math.round(missingSize / density - softButtonHeight));
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
    }


    public static numberToFormatedString(num: any) {
        var str = num.toString();
        var result: string = '';
        var count = -1;
        for (let i = str.length - 1; i > -1; i--) {
            count++;
            if (count != 0 && count % 3 == 0) {
                result = '.'.concat(result);
            }
            result = str[i].concat(result);
        }
        return result;
    }

    public static getSoftButtonHeight() {
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
    }

    public static clearConfig(config) {
        for (var field of config) {
            if (field.errors) {
                for (var error of field.errors) {
                    error.error = false;
                }
            }
            if (field.value) field.value = '';
            if (field.messageError) field.messageError = '';
        }
    }

    public static checkInternetConnection() {
        if (Connectivity.getConnectionType() == Connectivity.connectionType.none) {
            dialogs.alert({
                title: "Không thể kết nối",
                message: 'Không thể kết nối Internet',
                okButtonText: "OK"
            });
            return false;
        }
        return true;
    }

    public static hideKeyboard(txtArray?) {
        if (app.android) {
            try {
                let activity = app.android.foregroundActivity;
                let Context = app.android.currentContext;
                let inputManager = Context.getSystemService(android.content.Context.INPUT_METHOD_SERVICE);
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
    }
    
    public static navigate(path: string, clearHistory?: boolean, data?: any) {
        if (path) {
            try {
                frames.topmost().navigate({
                    moduleName: path,
                    context: data || '',
                    animated: true,
                    clearHistory: clearHistory || false
                })
            }
            catch (ex) {
                console.log(ex);
            }
        }
    }

    public static goBack(BackstackEntry?) {
        try {
            if (BackstackEntry)
                frames.topmost().goBack(BackstackEntry);
            else
                frames.topmost().goBack();
        } catch (ex) {
            console.log(ex);
        }
    }

    public static showModal(page: any, path: string, closeModalCallBack: Function, fullsreen: boolean, context?: any, ) {
        if (path && page) {
            try {
                page.showModal(path, context || {}, closeModalCallBack, fullsreen);
            } catch (ex) {
                console.log("Error showModal Utils: " + ex);
            }
        } else {
            console.log("Error showModal Utils");
        }
    }
    public static toastAlert(message) {
        Toast.makeText(message, "short").show();
    }
    public static showLoadingIndicator() {
        loader.show(optionsIndicator);
    }
    public static hideLoadingIndicator() {
        loader.hide();
    }

    public static scanBarCode(page: any, callBackFunction: Function, closeCallbackFunction?: Function, buttonMaunalText?: string) {
        if (!closeCallbackFunction) {
            closeCallbackFunction = function () { console.log('close scan modal'); };
        }
        if (!buttonMaunalText) {
            buttonMaunalText = 'Nhập mã barcode';
        }
        localStorage.setItem('buttonMaunalText', buttonMaunalText);
        barcodescanner.hasCameraPermission()
            .then((permitted) => {
                if (permitted) {
                    page.showModal('shared/components/scan-modal/scan-modal', callBackFunction, closeCallbackFunction, (!!app.ios));
                }
                else {
                    barcodescanner.requestCameraPermission()
                        .then(() => {
                            page.showModal('shared/components/scan-modal/scan-modal', callBackFunction, closeCallbackFunction, (!!app.ios));

                        })
                        .catch((err) => {
                            dialogs.alert({
                                title: "Thông Báo",
                                message: "Vui lòng cho phép ứng dụng truy cập Camera để sử dụng tính năng quét barcode.",
                                okButtonText: "Trở lại"
                            });
                        })
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    public static assign(obj) {
        var newObj: any = {};
        for (var i in obj) {
            newObj[i] = obj[i];
        };
        return newObj;
    }
}

