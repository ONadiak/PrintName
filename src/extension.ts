import * as vscode from 'vscode';
import { checkForSymbols } from './functions/helperFunctions';
import { errorMessage } from './constants/messageConstants';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('printName.helloWorld', async () => {
		const firstName = await vscode.window.showInputBox({
			placeHolder: "Enter your first name"
		});

		const secondName = await vscode.window.showInputBox({
			placeHolder: "Enter your last name"
		});

		if (firstName && secondName && checkForSymbols(firstName, secondName) ){
			vscode.window.showInformationMessage(`Hello ${firstName} ${secondName}`);
		}
		else{
			vscode.window.showErrorMessage(errorMessage);
		}
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
