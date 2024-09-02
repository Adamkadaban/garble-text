export interface GarbleTextSettings {
	noGarbleOnHover: boolean;
}

export const DEFAULT_SETTINGS: GarbleTextSettings = {
	noGarbleOnHover = false,
}

export class GarbleTextSettingsTab extends PluginSettingTab {
	plugin: GarbleText;

	constructor(app: App, plugin: GarbleText) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		let { containerEl } = this;

		constainerEl.empty();

		containerEl.createEl('h2', { text: 'Garble Text Plugin' });

		new Setting(containerEl)
			.setName('Do not garble text on hover')
			.setDesc('If this is turned on, text will no longer be revealed when hovered over with a mouse.')
			.addToggle(cb => {
				cb.setValue(this.plugin.settings.noGarbleOnHover)
					.onChange(async value => {
						this.plugin.settings.noGarbleOnHover = value;
						await this.plugin.saveSettings();
					})
			});
	}
}