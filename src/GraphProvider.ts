import * as path from 'path';
import * as fs from 'fs';
import * as vscode from 'vscode';
import { Disposable, toDisposable } from './utils/disposable';

export class GraphProvider extends Disposable implements vscode.TextDocumentContentProvider {

    private readonly context: vscode.ExtensionContext;
    private globalState: vscode.Memento & { setKeysForSync(keys: readonly string[]): void; };
    private workspaceState: vscode.Memento;
    private readonly globalStoragePath: string;
    private extensionPath: string;
    panelWindow: vscode.WebviewPanel;
    private listFile:{fileName:string, dateCreation:Date, size:number}[] = [];
	private htmlListFile = '<table>';

    constructor(context: vscode.ExtensionContext) {
		super();
		this.context = context;
        this.globalState = context.globalState;
		this.workspaceState = context.workspaceState;
		this.globalStoragePath = context.globalStorageUri.path;
        this.extensionPath = context.extensionPath;
		this.panelWindow = vscode.window.createWebviewPanel('nightwatch-graph', 'Nightwatch Graph', vscode.ViewColumn.One, {
			enableScripts: true,
		});

		
        if(!vscode.window.activeTextEditor){
            return ;//vscode.window.showErrorMessage('Unable to Open File').then(() => { }, () => { });
        }
        const documentUri = vscode.window.activeTextEditor?.document.uri;
		let repoUri = documentUri.path.slice(1);
		const pathRepoUri = repoUri.split('/');
		pathRepoUri.pop();
		repoUri=pathRepoUri.join('/');
        try {
			const files = fs.readdirSync(repoUri, 'utf8');
			for (let fileName of files) {
				const fileAttributes = fs.statSync(repoUri+'/'+fileName);
				const size = fileAttributes.size;
				const dateCreation = fileAttributes.birthtime;
				if(size > 0){
					this.listFile.push({ fileName, dateCreation, size });
				}
			}
		} catch (err) {
		console.error(err);
		}

		this.listFile.forEach((file)=>{
			this.htmlListFile += "<tr>";
			this.htmlListFile += "<td>";
			this.htmlListFile += file.fileName;
			this.htmlListFile += "</td>";
			this.htmlListFile += "<td>";
			this.htmlListFile += file.dateCreation;
			this.htmlListFile += "</td>";
			this.htmlListFile += "</tr>";
		});

		this.htmlListFile += '</table>';


        this.panelWindow.iconPath = vscode.Uri.file('/resources/cmd-icon-dark.svg');
        this.panelWindow.webview.html = this.getHtmlForWebview();

        this.registerDisposables(
            this.panelWindow
        );
	}

    onDidChangeEventEmitter(arg0: vscode.Disposable, onDidChangeEventEmitter: any, arg2: vscode.Disposable) {
        throw new Error('Method not implemented.');
    }


    public provideTextDocumentContent(): string | Thenable<string> {

		return "Welcome !!! "+ this.globalState.get + ' - ' + this.workspaceState.get + ' - ' + this.globalStoragePath;
	}

    public getHtmlForWebview() {

		let body = `<body>
				<div class="container" style="margin-top: 60px;">
					<gradient-theme data=${this.htmlListFile}>
				</div>
			</body>`;

		return `<!DOCTYPE html>
		<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src; img-src data:;">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<link rel="stylesheet" type="text/css" href="${this.getMediaUri('out.min.css')}">
				<link rel="stylesheet" type="text/css" href="/resources/gradient/gradient.css">
				<script src="app.js" async defer type="module"></script>
				<title>Nightwatch Graph</title>
                </head>
                ${body}
                </html>`;
            }
            
            //<style>body{${colorVars}} ${colorParams}</style>
	public getMediaUri(file: string) {
		return this.panelWindow.webview.asWebviewUri(this.getUri('media', file));
	}

	private getUri(...pathComps: string[]) {
		return vscode.Uri.file(path.join(this.extensionPath, ...pathComps));
	}
}
