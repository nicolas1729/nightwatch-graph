import * as vscode from 'vscode';
import { getConfig } from './config';
import { Disposable } from './utils/disposable';
import { Event } from './utils/event';

/**
 * Manages the Git Graph Status Bar Item, which allows users to open the Git Graph View from the Visual Studio Code Status Bar.
 */
export class StatusBarItem extends Disposable {
	private readonly statusBarItem: vscode.StatusBarItem;
	private isVisible: boolean = false;
	private numRepos: number = 0;

	/**
	 * Creates the Git Graph Status Bar Item.
	 * @param repoManager The Git Graph RepoManager instance.
	 * @param logger The Git Graph Logger instance.
	 */
	constructor() {
		super();

		const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 1);
		statusBarItem.text = 'Nightwatch Graph';
		statusBarItem.tooltip = 'View Nightwatch Graph';
		statusBarItem.command = 'nightwatch-graph.helloWorld';
		this.statusBarItem = statusBarItem;

		this.registerDisposables(
			statusBarItem
		);
	}

	/**
	 * Show or hide the Status Bar Item according to the configured value of `git-graph.showStatusBarItem`, and the number of repositories known to Git Graph.
	 */
	/*private refresh() {
		const shouldBeVisible = getConfig().showStatusBarItem && this.numRepos > 0;
		if (this.isVisible !== shouldBeVisible) {
			if (shouldBeVisible) {
				this.statusBarItem.show();
			} else {
				this.statusBarItem.hide();
			}
			this.isVisible = shouldBeVisible;
		}
	}*/
}
