import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { SignInViewModel } from './sign-in.model';

export function navigatingTo(args: EventData) {
	let page = <Page>args.object;
	page.bindingContext = new SignInViewModel();
}