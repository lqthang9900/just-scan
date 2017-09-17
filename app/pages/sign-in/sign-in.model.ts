import { Observable } from 'data/observable';
import { Config } from '../../shared/env-config';
import { verifyInput, Utils } from '../../shared/tools';

export class SignInViewModel extends Observable {
	private signInConfig: any;
	constructor() {
		super();
		this.signInConfig = {
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
		}
	}

	checkInput(args) {
		verifyInput(args.object.id, this, this.signInConfig, 'signInConfig');
	}

	signIn(args) {
		console.log('id: ' + this.signInConfig.id.value);
		console.log('password: ' + this.signInConfig.password.value);
	}

	signUp(args) {
		Utils.navigate('pages/sign-up/sign-up');
	}
}