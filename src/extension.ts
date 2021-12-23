// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import path = require('path');
import * as vscode from 'vscode';
import { GraphProvider } from './GraphProvider';
import { StatusBarItem } from './statusBarItem';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.info('Congratulations, your extension "nightwatch-graph" is now active!');

	const graphProvider = new GraphProvider(context);
	const statusBarItem = new StatusBarItem();
	
	/*let panel = vscode.window.createWebviewPanel('nightwatch-graph', 'nightwatch graph', vscode.ViewColumn.One, {enableScripts: true});
	panel.iconPath = vscode.Uri.file('/resources/cmd-icon-dark.svg');
	panel.webview.html = graphProvider.getHtmlForWebview();*/

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('nightwatch-graph.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Welcome to nightwatch-graph!');
		//panel;
		graphProvider;
	});

	context.subscriptions.push(
		disposable,
		statusBarItem
	);




	function getHtmlForWebview() {

		let body = `<body>
			<div id="view" tabindex="-1">
				<div id="controls">
					<span id="repoControl"><span class="unselectable">Repo: </span><div id="repoDropdown" class="dropdown"></div></span>
					<span id="branchControl"><span class="unselectable">Branches:( : </span><div id="branchDropdown" class="dropdown"></div></span>
					<label id="showRemoteBranchesControl"><input type="checkbox" id="showRemoteBranchesCheckbox" tabindex="-1"><span class="customCheckbox"></span>Show Remote Branches</label>
					<div id="findBtn" title="Find"></div>
					<div id="terminalBtn" title="Open a Terminal for this Repository"></div>
					<div id="settingsBtn" title="Repository Settings"></div>
					<div id="fetchBtn"></div>
					<div id="refreshBtn"></div>
				</div>
				<div id="content">
					<div id="commitGraph"></div>
					<div id="commitTable"></div>
				</div>
				<div id="footer"></div>
			</div>
			<div id="scrollShadow"></div>
			</body>`;

		return `<!DOCTYPE html>
		<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Git Graph</title>
			</head>
			${body}
		</html>`;
	}


}


// this method is called when your extension is deactivated
export function deactivate() {}
