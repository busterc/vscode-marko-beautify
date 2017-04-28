var vscode = require('vscode');
var markoPrettyPrint = require('marko-prettyprint').prettyPrintSource;
var assign = require('object-assign');

exports.activate = function activate(context) {
  var output = Output();
  var showOutput = function (message) {
    output(message, true)
  };

  output('"Marko Beautify" is now active!');

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
        vscode.window.showErrorMessage("Marko Beautify encountered an error, see OUTPUT for details.");
        return showOutput(error.toString());
      };

      return editor.edit(e => e.replace(range, pretty)).catch(error => {
        console.log(error);
        vscode.window.showErrorMessage("Marko Beautify encountered an error, see OUTPUT for details.");
        return showOutput(error.toString());
      });
    }
  }));
};

exports.deactivate = function () { };

function Output() {
  var output = vscode.window.createOutputChannel('Marko Beautify');

  return function (message, show) {
    output.clear();
    output.append(message);
    if (show) {
      output.show();
    }
  };
}
