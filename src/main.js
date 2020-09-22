import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		application:  {
			displayName: 'Time Tracker',
			name: 'time-tracker',
			url: 'time-tracker.serret.dev'
		}
	}
});

export default app;