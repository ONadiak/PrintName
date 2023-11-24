import * as vscode from 'vscode';
import * as sinon from 'sinon';
import { activate } from '../../extension';
import { errorMessage } from '../../constants/messageConstants';

describe('Extension Activation', () => {
  let sandbox: sinon.SinonSandbox;
  let fakeContext: vscode.ExtensionContext;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    fakeContext = ({
      subscriptions: [],
    }) as unknown as vscode.ExtensionContext;
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should show information message if valid names are provided', async () => {
    const showInputBoxStub = sandbox.stub(vscode.window, 'showInputBox');
    showInputBoxStub.onFirstCall().resolves('Ostap');
    showInputBoxStub.onSecondCall().resolves('Nadiak');
    const showInformationMessageSpy = sandbox.spy(vscode.window, 'showInformationMessage');

    await activate(fakeContext);

    sinon.assert.calledTwice(showInputBoxStub);
    sinon.assert.calledWith(showInformationMessageSpy, 'Hello Ostap Nadiak');
  });

  it('should show error message if invalid names are provided', async () => {
    const showInputBoxStub = sandbox.stub(vscode.window, 'showInputBox');
    showInputBoxStub.onFirstCall().resolves('Ostap@');
    showInputBoxStub.onSecondCall().resolves('Nadiak');
    const showErrorMessageSpy = sandbox.spy(vscode.window, 'showErrorMessage');

    await activate(fakeContext);

    sinon.assert.calledTwice(showInputBoxStub);
    sinon.assert.calledWith(showErrorMessageSpy, errorMessage);
  });
});