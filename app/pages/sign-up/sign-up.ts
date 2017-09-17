import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { SignUpViewModel } from './sign-up.model';

export function navigatingTo(args: EventData) {
	let page = <Page>args.object;
	page.bindingContext = new SignUpViewModel();
}