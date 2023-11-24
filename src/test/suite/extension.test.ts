import * as vscode from 'vscode';
import * as sinon from 'sinon';
import { errorMessage } from '../../constants/messageConstants';
const { describe, it, beforeEach, afterEach } = require('mocha'); 

describe('Extension Activation', () => {
  let sandbox: sinon.SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    });

  afterEach(() => {
    sandbox.restore();
  });

  it('should show information message if valid names are provided', async () => {
    const showInputBoxStub = sandbox.stub(vscode.window, 'showInputBox');

    showInputBoxStub.onFirstCall().resolves('Ostap');
    showInputBoxStub.onSecondCall().resolves('Nadiak');

    const showInformationMessageSpy = sandbox.spy(vscode.window, 'showInformationMessage');

    await vscode.commands.executeCommand("printName.helloWorld");
    
    sinon.assert.calledTwice(showInputBoxStub);
    sinon.assert.calledWith(showInformationMessageSpy, 'Hello Ostap Nadiak');
  });

  it('should show error message if invalid names are provided', async () => {
    const showInputBoxStub = sandbox.stub(vscode.window, 'showInputBox');

    showInputBoxStub.onFirstCall().resolves('Ostap@');
    showInputBoxStub.onSecondCall().resolves('Nadiak');

    const showErrorMessageSpy = sandbox.spy(vscode.window, 'showErrorMessage');

    await vscode.commands.executeCommand("printName.helloWorld");

    sinon.assert.calledTwice(showInputBoxStub);
    sinon.assert.calledWith(showErrorMessageSpy, errorMessage);
  });

  it('should show error message if names are bigger than 15 symbols', async () => {
    const showInputBoxStub = sandbox.stub(vscode.window, 'showInputBox');
  
    showInputBoxStub.onFirstCall().resolves('OstapBiggerThanAllowed');
    showInputBoxStub.onSecondCall().resolves('Nadiak');
  
    const showErrorMessageSpy = sandbox.spy(vscode.window, 'showErrorMessage');
  
    await vscode.commands.executeCommand("printName.helloWorld");
  
    sinon.assert.calledTwice(showInputBoxStub);
    sinon.assert.calledWith(showErrorMessageSpy, errorMessage);
  });
});