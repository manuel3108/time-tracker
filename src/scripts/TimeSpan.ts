import { DateTime } from 'luxon'

export default class TimeSpan {
	public from: string;
	public to: string;

	constructor() {
		this.from = '';
		this.to = '';
	}

	public static fromNow(): TimeSpan {
		let ts = new TimeSpan();
		let now = DateTime.local();
		ts.from = now.toFormat('HH:mm');

		return ts;
	}
}