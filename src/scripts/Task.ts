import TimeSpan from './TimeSpan';

export default class Task {
	public name: string;
	public timespans: TimeSpan[];

	constructor() {
		this.timespans = new Array<TimeSpan>();
	}
}