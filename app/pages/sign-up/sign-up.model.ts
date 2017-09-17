import {Observable} from 'data/observable';
import { Config } from '../../shared/env-config';
import { verifyInput, Utils } from '../../shared/tools';

export class SignUpViewModel extends Observable {
	private signUpConfig: any;
	constructor() {
		super();
		this.signUpConfig = {
			userName: {
				label: "Tài khoản",
				type: "id",
				id: "userName",
				errors: {
					required: {
						error: false,
						message: Config.ERROR_MESSAGE.USERNAME_REQUIRED
					},
					format: {
						error: false,
						message: Config.ERROR_MESSAGE.USERNAME_FORMAT
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
						message: Config.ERROR_MESSAGE.PASSWORD_REQUIRED
					},
					format: {
						error: false,
						message: Config.ERROR_MESSAGE.PASSWORD_FORMAT
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
						message: Config.ERROR_MESSAGE.REPASSWORD_REQUIRED
					},
					match: {
						error: false,
						message: Config.ERROR_MESSAGE.REPASSWORD_NOMATCH,
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
						message: Config.ERROR_MESSAGE.PHONENUMBER_REQUIRED
					},
					format: {
						error: false,
						message: Config.ERROR_MESSAGE.PHONENUMBER_FORMAT
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
						message: Config.ERROR_MESSAGE.NAME_REQUIRED
					},
					format: {
						error: false,
						message: Config.ERROR_MESSAGE.NAME_FORMAT
					}
				},
				messageError: "",
				placeHolder: "Họ tên",
				value: ""
			},
		}
	}

	checkInput(args) {
		verifyInput(args.object.id, this, this.signUpConfig, 'signUpConfig');
	}

	goBack() {
		Utils.goBack();
	}
}