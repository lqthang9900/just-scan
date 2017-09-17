"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("data/observable");
var env_config_1 = require("../../shared/env-config");
var tools_1 = require("../../shared/tools");
var SignUpViewModel = (function (_super) {
    __extends(SignUpViewModel, _super);
    function SignUpViewModel() {
        var _this = _super.call(this) || this;
        _this.signUpConfig = {
            userName: {
                label: "Tài khoản",
                type: "id",
                id: "userName",
                errors: {
                    required: {
                        error: false,
                        message: env_config_1.Config.ERROR_MESSAGE.USERNAME_REQUIRED
                    },
                    format: {
                        error: false,
                        message: env_config_1.Config.ERROR_MESSAGE.USERNAME_FORMAT
                    }
                },
                messageError: " ",
                error: false,
                placeHolder: "Tài khoản",
                value: ""
            },
            password: {
                label: "Mật khẩu",
                type: "password",
                id: "password",
                errors: {
                    required: {
                        error: false,
                        message: env_config_1.Config.ERROR_MESSAGE.PASSWORD_REQUIRED
                    },
                    format: {
                        error: false,
                        message: env_config_1.Config.ERROR_MESSAGE.PASSWORD_FORMAT
                    }
                },
                messageError: " ",
                error: false,
                placeHolder: "Mật khẩu",
                value: ""
            },
            rePassword: {
                label: "Xác nhận mật khẩu",
                type: "rePassword",
                id: "rePassword",
                errors: {
                    required: {
                        error: false,
                        message: env_config_1.Config.ERROR_MESSAGE.REPASSWORD_REQUIRED
                    },
                    match: {
                        error: false,
                        message: env_config_1.Config.ERROR_MESSAGE.REPASSWORD_NOMATCH,
                    }
                },
                messageError: "",
                placeHolder: "Xác nhận mật khẩu",
                value: "",
                matchField: 'password'
            },
            phoneNumber: {
                label: "Số điện thoại",
                type: "phone",
                id: "phoneNumberSignUp",
                errors: {
                    required: {
                        error: false,
                        message: env_config_1.Config.ERROR_MESSAGE.PHONENUMBER_REQUIRED
                    },
                    format: {
                        error: false,
                        message: env_config_1.Config.ERROR_MESSAGE.PHONENUMBER_FORMAT
                    }
                },
                messageError: "",
                placeHolder: "Nhập số điện thoại",
                value: ""
            },
            name: {
                label: "Họ tên",
                type: "name",
                id: "name",
                errors: {
                    required: {
                        error: false,
                        message: env_config_1.Config.ERROR_MESSAGE.NAME_REQUIRED
                    },
                    format: {
                        error: false,
                        message: env_config_1.Config.ERROR_MESSAGE.NAME_FORMAT
                    }
                },
                messageError: "",
                placeHolder: "Họ tên",
                value: ""
            },
        };
        return _this;
    }
    SignUpViewModel.prototype.checkInput = function (args) {
        tools_1.verifyInput(args.object.id, this, this.signUpConfig, 'signUpConfig');
    };
    SignUpViewModel.prototype.goBack = function () {
        tools_1.Utils.goBack();
    };
    return SignUpViewModel;
}(observable_1.Observable));
exports.SignUpViewModel = SignUpViewModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbi11cC5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNpZ24tdXAubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw4Q0FBMkM7QUFDM0Msc0RBQWlEO0FBQ2pELDRDQUF3RDtBQUV4RDtJQUFxQyxtQ0FBVTtJQUU5QztRQUFBLFlBQ0MsaUJBQU8sU0FnR1A7UUEvRkEsS0FBSSxDQUFDLFlBQVksR0FBRztZQUNuQixRQUFRLEVBQUU7Z0JBQ1QsS0FBSyxFQUFFLFdBQVc7Z0JBQ2xCLElBQUksRUFBRSxJQUFJO2dCQUNWLEVBQUUsRUFBRSxVQUFVO2dCQUNkLE1BQU0sRUFBRTtvQkFDUCxRQUFRLEVBQUU7d0JBQ1QsS0FBSyxFQUFFLEtBQUs7d0JBQ1osT0FBTyxFQUFFLG1CQUFNLENBQUMsYUFBYSxDQUFDLGlCQUFpQjtxQkFDL0M7b0JBQ0QsTUFBTSxFQUFFO3dCQUNQLEtBQUssRUFBRSxLQUFLO3dCQUNaLE9BQU8sRUFBRSxtQkFBTSxDQUFDLGFBQWEsQ0FBQyxlQUFlO3FCQUM3QztpQkFDRDtnQkFDRCxZQUFZLEVBQUUsR0FBRztnQkFDakIsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osV0FBVyxFQUFFLFdBQVc7Z0JBQ3hCLEtBQUssRUFBRSxFQUFFO2FBQ1Q7WUFDRCxRQUFRLEVBQUU7Z0JBQ1QsS0FBSyxFQUFFLFVBQVU7Z0JBQ2pCLElBQUksRUFBRSxVQUFVO2dCQUNoQixFQUFFLEVBQUUsVUFBVTtnQkFDZCxNQUFNLEVBQUU7b0JBQ1AsUUFBUSxFQUFFO3dCQUNULEtBQUssRUFBRSxLQUFLO3dCQUNaLE9BQU8sRUFBRSxtQkFBTSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUI7cUJBQy9DO29CQUNELE1BQU0sRUFBRTt3QkFDUCxLQUFLLEVBQUUsS0FBSzt3QkFDWixPQUFPLEVBQUUsbUJBQU0sQ0FBQyxhQUFhLENBQUMsZUFBZTtxQkFDN0M7aUJBQ0Q7Z0JBQ0QsWUFBWSxFQUFFLEdBQUc7Z0JBQ2pCLEtBQUssRUFBRSxLQUFLO2dCQUNaLFdBQVcsRUFBRSxVQUFVO2dCQUN2QixLQUFLLEVBQUUsRUFBRTthQUNUO1lBQ0QsVUFBVSxFQUFFO2dCQUNYLEtBQUssRUFBRSxtQkFBbUI7Z0JBQzFCLElBQUksRUFBRSxZQUFZO2dCQUNsQixFQUFFLEVBQUUsWUFBWTtnQkFDaEIsTUFBTSxFQUFFO29CQUNQLFFBQVEsRUFBRTt3QkFDVCxLQUFLLEVBQUUsS0FBSzt3QkFDWixPQUFPLEVBQUUsbUJBQU0sQ0FBQyxhQUFhLENBQUMsbUJBQW1CO3FCQUNqRDtvQkFDRCxLQUFLLEVBQUU7d0JBQ04sS0FBSyxFQUFFLEtBQUs7d0JBQ1osT0FBTyxFQUFFLG1CQUFNLENBQUMsYUFBYSxDQUFDLGtCQUFrQjtxQkFDaEQ7aUJBQ0Q7Z0JBQ0QsWUFBWSxFQUFFLEVBQUU7Z0JBQ2hCLFdBQVcsRUFBRSxtQkFBbUI7Z0JBQ2hDLEtBQUssRUFBRSxFQUFFO2dCQUNULFVBQVUsRUFBRSxVQUFVO2FBQ3RCO1lBQ0QsV0FBVyxFQUFFO2dCQUNaLEtBQUssRUFBRSxlQUFlO2dCQUN0QixJQUFJLEVBQUUsT0FBTztnQkFDYixFQUFFLEVBQUUsbUJBQW1CO2dCQUN2QixNQUFNLEVBQUU7b0JBQ1AsUUFBUSxFQUFFO3dCQUNULEtBQUssRUFBRSxLQUFLO3dCQUNaLE9BQU8sRUFBRSxtQkFBTSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0I7cUJBQ2xEO29CQUNELE1BQU0sRUFBRTt3QkFDUCxLQUFLLEVBQUUsS0FBSzt3QkFDWixPQUFPLEVBQUUsbUJBQU0sQ0FBQyxhQUFhLENBQUMsa0JBQWtCO3FCQUNoRDtpQkFDRDtnQkFDRCxZQUFZLEVBQUUsRUFBRTtnQkFDaEIsV0FBVyxFQUFFLG9CQUFvQjtnQkFDakMsS0FBSyxFQUFFLEVBQUU7YUFDVDtZQUNELElBQUksRUFBRTtnQkFDTCxLQUFLLEVBQUUsUUFBUTtnQkFDZixJQUFJLEVBQUUsTUFBTTtnQkFDWixFQUFFLEVBQUUsTUFBTTtnQkFDVixNQUFNLEVBQUU7b0JBQ1AsUUFBUSxFQUFFO3dCQUNULEtBQUssRUFBRSxLQUFLO3dCQUNaLE9BQU8sRUFBRSxtQkFBTSxDQUFDLGFBQWEsQ0FBQyxhQUFhO3FCQUMzQztvQkFDRCxNQUFNLEVBQUU7d0JBQ1AsS0FBSyxFQUFFLEtBQUs7d0JBQ1osT0FBTyxFQUFFLG1CQUFNLENBQUMsYUFBYSxDQUFDLFdBQVc7cUJBQ3pDO2lCQUNEO2dCQUNELFlBQVksRUFBRSxFQUFFO2dCQUNoQixXQUFXLEVBQUUsUUFBUTtnQkFDckIsS0FBSyxFQUFFLEVBQUU7YUFDVDtTQUNELENBQUE7O0lBQ0YsQ0FBQztJQUVELG9DQUFVLEdBQVYsVUFBVyxJQUFJO1FBQ2QsbUJBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxjQUFjLENBQUMsQ0FBQztJQUN0RSxDQUFDO0lBRUQsZ0NBQU0sR0FBTjtRQUNDLGFBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBQ0Ysc0JBQUM7QUFBRCxDQUFDLEFBNUdELENBQXFDLHVCQUFVLEdBNEc5QztBQTVHWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAnZGF0YS9vYnNlcnZhYmxlJztcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJy4uLy4uL3NoYXJlZC9lbnYtY29uZmlnJztcbmltcG9ydCB7IHZlcmlmeUlucHV0LCBVdGlscyB9IGZyb20gJy4uLy4uL3NoYXJlZC90b29scyc7XG5cbmV4cG9ydCBjbGFzcyBTaWduVXBWaWV3TW9kZWwgZXh0ZW5kcyBPYnNlcnZhYmxlIHtcblx0cHJpdmF0ZSBzaWduVXBDb25maWc6IGFueTtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLnNpZ25VcENvbmZpZyA9IHtcblx0XHRcdHVzZXJOYW1lOiB7XG5cdFx0XHRcdGxhYmVsOiBcIlTDoGkga2hv4bqjblwiLFxuXHRcdFx0XHR0eXBlOiBcImlkXCIsXG5cdFx0XHRcdGlkOiBcInVzZXJOYW1lXCIsXG5cdFx0XHRcdGVycm9yczoge1xuXHRcdFx0XHRcdHJlcXVpcmVkOiB7XG5cdFx0XHRcdFx0XHRlcnJvcjogZmFsc2UsXG5cdFx0XHRcdFx0XHRtZXNzYWdlOiBDb25maWcuRVJST1JfTUVTU0FHRS5VU0VSTkFNRV9SRVFVSVJFRFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0Zm9ybWF0OiB7XG5cdFx0XHRcdFx0XHRlcnJvcjogZmFsc2UsXG5cdFx0XHRcdFx0XHRtZXNzYWdlOiBDb25maWcuRVJST1JfTUVTU0FHRS5VU0VSTkFNRV9GT1JNQVRcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdG1lc3NhZ2VFcnJvcjogXCIgXCIsXG5cdFx0XHRcdGVycm9yOiBmYWxzZSxcblx0XHRcdFx0cGxhY2VIb2xkZXI6IFwiVMOgaSBraG/huqNuXCIsXG5cdFx0XHRcdHZhbHVlOiBcIlwiXG5cdFx0XHR9LCBcblx0XHRcdHBhc3N3b3JkOiB7XG5cdFx0XHRcdGxhYmVsOiBcIk3huq10IGto4bqpdVwiLFxuXHRcdFx0XHR0eXBlOiBcInBhc3N3b3JkXCIsXG5cdFx0XHRcdGlkOiBcInBhc3N3b3JkXCIsXG5cdFx0XHRcdGVycm9yczoge1xuXHRcdFx0XHRcdHJlcXVpcmVkOiB7XG5cdFx0XHRcdFx0XHRlcnJvcjogZmFsc2UsXG5cdFx0XHRcdFx0XHRtZXNzYWdlOiBDb25maWcuRVJST1JfTUVTU0FHRS5QQVNTV09SRF9SRVFVSVJFRFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0Zm9ybWF0OiB7XG5cdFx0XHRcdFx0XHRlcnJvcjogZmFsc2UsXG5cdFx0XHRcdFx0XHRtZXNzYWdlOiBDb25maWcuRVJST1JfTUVTU0FHRS5QQVNTV09SRF9GT1JNQVRcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdG1lc3NhZ2VFcnJvcjogXCIgXCIsXG5cdFx0XHRcdGVycm9yOiBmYWxzZSxcblx0XHRcdFx0cGxhY2VIb2xkZXI6IFwiTeG6rXQga2jhuql1XCIsXG5cdFx0XHRcdHZhbHVlOiBcIlwiXG5cdFx0XHR9LFxuXHRcdFx0cmVQYXNzd29yZDoge1xuXHRcdFx0XHRsYWJlbDogXCJYw6FjIG5o4bqtbiBt4bqtdCBraOG6qXVcIixcblx0XHRcdFx0dHlwZTogXCJyZVBhc3N3b3JkXCIsXG5cdFx0XHRcdGlkOiBcInJlUGFzc3dvcmRcIixcblx0XHRcdFx0ZXJyb3JzOiB7XG5cdFx0XHRcdFx0cmVxdWlyZWQ6IHtcblx0XHRcdFx0XHRcdGVycm9yOiBmYWxzZSxcblx0XHRcdFx0XHRcdG1lc3NhZ2U6IENvbmZpZy5FUlJPUl9NRVNTQUdFLlJFUEFTU1dPUkRfUkVRVUlSRURcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdG1hdGNoOiB7XG5cdFx0XHRcdFx0XHRlcnJvcjogZmFsc2UsXG5cdFx0XHRcdFx0XHRtZXNzYWdlOiBDb25maWcuRVJST1JfTUVTU0FHRS5SRVBBU1NXT1JEX05PTUFUQ0gsXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRtZXNzYWdlRXJyb3I6IFwiXCIsXG5cdFx0XHRcdHBsYWNlSG9sZGVyOiBcIljDoWMgbmjhuq1uIG3huq10IGto4bqpdVwiLFxuXHRcdFx0XHR2YWx1ZTogXCJcIixcblx0XHRcdFx0bWF0Y2hGaWVsZDogJ3Bhc3N3b3JkJ1xuXHRcdFx0fSxcblx0XHRcdHBob25lTnVtYmVyOiB7XG5cdFx0XHRcdGxhYmVsOiBcIlPhu5EgxJFp4buHbiB0aG/huqFpXCIsXG5cdFx0XHRcdHR5cGU6IFwicGhvbmVcIixcblx0XHRcdFx0aWQ6IFwicGhvbmVOdW1iZXJTaWduVXBcIixcblx0XHRcdFx0ZXJyb3JzOiB7XG5cdFx0XHRcdFx0cmVxdWlyZWQ6IHtcblx0XHRcdFx0XHRcdGVycm9yOiBmYWxzZSxcblx0XHRcdFx0XHRcdG1lc3NhZ2U6IENvbmZpZy5FUlJPUl9NRVNTQUdFLlBIT05FTlVNQkVSX1JFUVVJUkVEXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRmb3JtYXQ6IHtcblx0XHRcdFx0XHRcdGVycm9yOiBmYWxzZSxcblx0XHRcdFx0XHRcdG1lc3NhZ2U6IENvbmZpZy5FUlJPUl9NRVNTQUdFLlBIT05FTlVNQkVSX0ZPUk1BVFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0bWVzc2FnZUVycm9yOiBcIlwiLFxuXHRcdFx0XHRwbGFjZUhvbGRlcjogXCJOaOG6rXAgc+G7kSDEkWnhu4duIHRob+G6oWlcIixcblx0XHRcdFx0dmFsdWU6IFwiXCJcblx0XHRcdH0sXG5cdFx0XHRuYW1lOiB7XG5cdFx0XHRcdGxhYmVsOiBcIkjhu40gdMOqblwiLFxuXHRcdFx0XHR0eXBlOiBcIm5hbWVcIixcblx0XHRcdFx0aWQ6IFwibmFtZVwiLFxuXHRcdFx0XHRlcnJvcnM6IHtcblx0XHRcdFx0XHRyZXF1aXJlZDoge1xuXHRcdFx0XHRcdFx0ZXJyb3I6IGZhbHNlLFxuXHRcdFx0XHRcdFx0bWVzc2FnZTogQ29uZmlnLkVSUk9SX01FU1NBR0UuTkFNRV9SRVFVSVJFRFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0Zm9ybWF0OiB7XG5cdFx0XHRcdFx0XHRlcnJvcjogZmFsc2UsXG5cdFx0XHRcdFx0XHRtZXNzYWdlOiBDb25maWcuRVJST1JfTUVTU0FHRS5OQU1FX0ZPUk1BVFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0bWVzc2FnZUVycm9yOiBcIlwiLFxuXHRcdFx0XHRwbGFjZUhvbGRlcjogXCJI4buNIHTDqm5cIixcblx0XHRcdFx0dmFsdWU6IFwiXCJcblx0XHRcdH0sXG5cdFx0fVxuXHR9XG5cblx0Y2hlY2tJbnB1dChhcmdzKSB7XG5cdFx0dmVyaWZ5SW5wdXQoYXJncy5vYmplY3QuaWQsIHRoaXMsIHRoaXMuc2lnblVwQ29uZmlnLCAnc2lnblVwQ29uZmlnJyk7XG5cdH1cblxuXHRnb0JhY2soKSB7XG5cdFx0VXRpbHMuZ29CYWNrKCk7XG5cdH1cbn0iXX0=