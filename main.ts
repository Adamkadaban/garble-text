import "./css/image-blur.css";
import "./css/ungarble-on-hover.css";
import { App, Plugin } from 'obsidian';
import { DEFAULT_SETTINGS, GarbleTextSettings, GarbleTextSettingsTab } from './settings';

export default class GarbleText extends Plugin {
	private isGarbled: boolean = false;


	settings: GarbleTextSettings;

	async onload() {
		console.log('loading Garble Text plugin');

		await this.loadSettings();
		this.addSettingTab(new GarbleTextSettingsTab(this.app, this));
		this.addCommand({
			id: "toggle-garble-text",
			name: "Toggle Garble Text",
			callback: () => {
				if (this.isGarbled) this.ungarble();
				else this.garble();

				this.isGarbled = !this.isGarbled;
			}
		});

		if (!this.settings.noGarbleOnHover) {
			const link = document.createElement("link");
			link.rel = "stylesheet";
			link.type = "text/css";
			link.href = "./css/ungarble-on-hover.css";
			document.head.appendChild(link);
		}

		//TODO: garble with regex
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}



	onunload() {
		this.isGarbled = false;
		this.ungarble();
		const link = document.getElementById(this.ungarbleCssId);
		if (link) {
			link.remove();
		}
		console.log('Garble Text unloaded');
	}

	garble() {
		this.app.garbleText();
	}

	ungarble() {
		this.app.dom.appContainerEl.removeClass('is-text-garbled');
	}
}
