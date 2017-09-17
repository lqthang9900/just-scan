"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("data/observable");
var env_config_1 = require("../../shared/env-config");
var tools_1 = require("../../shared/tools");
var SignInViewModel = (function (_super) {
    __extends(SignInViewModel, _super);
    function SignInViewModel() {
        var _this = _super.call(this) || this;
        _this.signInConfig = {
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
        };
        return _this;
    }
    SignInViewModel.prototype.checkInput = function (args) {
        tools_1.verifyInput(args.object.id, this, this.signInConfig, 'signInConfig');
    };
    SignInViewModel.prototype.signIn = function (args) {
        console.log('id: ' + this.signInConfig.id.value);
        console.log('password: ' + this.signInConfig.password.value);
    };
    SignInViewModel.prototype.signUp = function (args) {
        tools_1.Utils.navigate('pages/sign-up/sign-up');
    };
    return SignInViewModel;
}(observable_1.Observable));
exports.SignInViewModel = SignInViewModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbi1pbi5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNpZ24taW4ubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw4Q0FBNkM7QUFDN0Msc0RBQWlEO0FBQ2pELDRDQUF3RDtBQUV4RDtJQUFxQyxtQ0FBVTtJQUU5QztRQUFBLFlBQ0MsaUJBQU8sU0F5Q1A7UUF4Q0EsS0FBSSxDQUFDLFlBQVksR0FBRztZQUNuQixRQUFRLEVBQUU7Z0JBQ1QsS0FBSyxFQUFFLFdBQVc7Z0JBQ2xCLElBQUksRUFBRSxJQUFJO2dCQUNWLEVBQUUsRUFBRSxVQUFVO2dCQUNkLE1BQU0sRUFBRTtvQkFDUCxRQUFRLEVBQUU7d0JBQ1QsS0FBSyxFQUFFLEtBQUs7d0JBQ1osT0FBTyxFQUFFLG1CQUFNLENBQUMsYUFBYSxDQUFDLGlCQUFpQjtxQkFDL0M7b0JBQ0QsTUFBTSxFQUFFO3dCQUNQLEtBQUssRUFBRSxLQUFLO3dCQUNaLE9BQU8sRUFBRSxtQkFBTSxDQUFDLGFBQWEsQ0FBQyxlQUFlO3FCQUM3QztpQkFDRDtnQkFDRCxZQUFZLEVBQUUsR0FBRztnQkFDakIsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osV0FBVyxFQUFFLFdBQVc7Z0JBQ3hCLEtBQUssRUFBRSxFQUFFO2FBQ1Q7WUFDRCxRQUFRLEVBQUU7Z0JBQ1QsS0FBSyxFQUFFLFVBQVU7Z0JBQ2pCLElBQUksRUFBRSxVQUFVO2dCQUNoQixFQUFFLEVBQUUsVUFBVTtnQkFDZCxNQUFNLEVBQUU7b0JBQ1AsUUFBUSxFQUFFO3dCQUNULEtBQUssRUFBRSxLQUFLO3dCQUNaLE9BQU8sRUFBRSxtQkFBTSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUI7cUJBQy9DO29CQUNELE1BQU0sRUFBRTt3QkFDUCxLQUFLLEVBQUUsS0FBSzt3QkFDWixPQUFPLEVBQUUsbUJBQU0sQ0FBQyxhQUFhLENBQUMsZUFBZTtxQkFDN0M7aUJBQ0Q7Z0JBQ0QsWUFBWSxFQUFFLEdBQUc7Z0JBQ2pCLEtBQUssRUFBRSxLQUFLO2dCQUNaLFdBQVcsRUFBRSxVQUFVO2dCQUN2QixLQUFLLEVBQUUsRUFBRTthQUNUO1NBQ0QsQ0FBQTs7SUFDRixDQUFDO0lBRUQsb0NBQVUsR0FBVixVQUFXLElBQUk7UUFDZCxtQkFBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFFRCxnQ0FBTSxHQUFOLFVBQU8sSUFBSTtRQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pELE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFRCxnQ0FBTSxHQUFOLFVBQU8sSUFBSTtRQUNWLGFBQUssQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBQ0Ysc0JBQUM7QUFBRCxDQUFDLEFBMURELENBQXFDLHVCQUFVLEdBMEQ5QztBQTFEWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdkYXRhL29ic2VydmFibGUnO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2Vudi1jb25maWcnO1xuaW1wb3J0IHsgdmVyaWZ5SW5wdXQsIFV0aWxzIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3Rvb2xzJztcblxuZXhwb3J0IGNsYXNzIFNpZ25JblZpZXdNb2RlbCBleHRlbmRzIE9ic2VydmFibGUge1xuXHRwcml2YXRlIHNpZ25JbkNvbmZpZzogYW55O1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuc2lnbkluQ29uZmlnID0ge1xuXHRcdFx0dXNlck5hbWU6IHtcblx0XHRcdFx0bGFiZWw6IFwiVMOgaSBraG/huqNuXCIsXG5cdFx0XHRcdHR5cGU6IFwiaWRcIixcblx0XHRcdFx0aWQ6IFwidXNlck5hbWVcIixcblx0XHRcdFx0ZXJyb3JzOiB7XG5cdFx0XHRcdFx0cmVxdWlyZWQ6IHtcblx0XHRcdFx0XHRcdGVycm9yOiBmYWxzZSxcblx0XHRcdFx0XHRcdG1lc3NhZ2U6IENvbmZpZy5FUlJPUl9NRVNTQUdFLlVTRVJOQU1FX1JFUVVJUkVEXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRmb3JtYXQ6IHtcblx0XHRcdFx0XHRcdGVycm9yOiBmYWxzZSxcblx0XHRcdFx0XHRcdG1lc3NhZ2U6IENvbmZpZy5FUlJPUl9NRVNTQUdFLlVTRVJOQU1FX0ZPUk1BVFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0bWVzc2FnZUVycm9yOiBcIiBcIixcblx0XHRcdFx0ZXJyb3I6IGZhbHNlLFxuXHRcdFx0XHRwbGFjZUhvbGRlcjogXCJUw6BpIGtob+G6o25cIixcblx0XHRcdFx0dmFsdWU6IFwiXCJcblx0XHRcdH0sIFxuXHRcdFx0cGFzc3dvcmQ6IHtcblx0XHRcdFx0bGFiZWw6IFwiTeG6rXQga2jhuql1XCIsXG5cdFx0XHRcdHR5cGU6IFwicGFzc3dvcmRcIixcblx0XHRcdFx0aWQ6IFwicGFzc3dvcmRcIixcblx0XHRcdFx0ZXJyb3JzOiB7XG5cdFx0XHRcdFx0cmVxdWlyZWQ6IHtcblx0XHRcdFx0XHRcdGVycm9yOiBmYWxzZSxcblx0XHRcdFx0XHRcdG1lc3NhZ2U6IENvbmZpZy5FUlJPUl9NRVNTQUdFLlBBU1NXT1JEX1JFUVVJUkVEXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRmb3JtYXQ6IHtcblx0XHRcdFx0XHRcdGVycm9yOiBmYWxzZSxcblx0XHRcdFx0XHRcdG1lc3NhZ2U6IENvbmZpZy5FUlJPUl9NRVNTQUdFLlBBU1NXT1JEX0ZPUk1BVFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0bWVzc2FnZUVycm9yOiBcIiBcIixcblx0XHRcdFx0ZXJyb3I6IGZhbHNlLFxuXHRcdFx0XHRwbGFjZUhvbGRlcjogXCJN4bqtdCBraOG6qXVcIixcblx0XHRcdFx0dmFsdWU6IFwiXCJcblx0XHRcdH0sXG5cdFx0fVxuXHR9XG5cblx0Y2hlY2tJbnB1dChhcmdzKSB7XG5cdFx0dmVyaWZ5SW5wdXQoYXJncy5vYmplY3QuaWQsIHRoaXMsIHRoaXMuc2lnbkluQ29uZmlnLCAnc2lnbkluQ29uZmlnJyk7XG5cdH1cblxuXHRzaWduSW4oYXJncykge1xuXHRcdGNvbnNvbGUubG9nKCdpZDogJyArIHRoaXMuc2lnbkluQ29uZmlnLmlkLnZhbHVlKTtcblx0XHRjb25zb2xlLmxvZygncGFzc3dvcmQ6ICcgKyB0aGlzLnNpZ25JbkNvbmZpZy5wYXNzd29yZC52YWx1ZSk7XG5cdH1cblxuXHRzaWduVXAoYXJncykge1xuXHRcdFV0aWxzLm5hdmlnYXRlKCdwYWdlcy9zaWduLXVwL3NpZ24tdXAnKTtcblx0fVxufSJdfQ==