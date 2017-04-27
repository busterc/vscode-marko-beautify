var vscode = require('vscode');
var markoPrettyPrint = require('marko-prettyprint').prettyPrintSource;
var assign = require('object-assign');

exports.activate = function activate(context) {
  console.log('"marko-beautify" is now active!');

  context.subscriptions.push(vscode.languages.registerDocumentFormattingEditProvider('marko', {
    provideDocumentFormattingEdits: doc => {
      var editor = vscode.window.activeTextEditor;
      if (!editor || !editor.document) {
        return;
      }

      var range = doc.validateRange(new vscode.Range(0, 0, Number.MAX_VALUE, Number.MAX_VALUE));
      var ugly = doc.getText();
      var pretty;
      var prettyOptions = {
        filename: doc.fileName
      };
      var config = vscode.workspace.getConfiguration("marko.beautify");
      prettyOptions = assign(prettyOptions, config);

      try {
        pretty = markoPrettyPrint(ugly, prettyOptions);
      } catch (error) {
        console.error(error);
        return vscode.window.showErrorMessage(error.message);
      };

      return editor.edit(e => e.replace(range, pretty)).catch(error => {
        console.log(error);
        return vscode.window.showErrorMessage(error.message);
      });
    }
  }));
};

exports.deactivate = function () { };
