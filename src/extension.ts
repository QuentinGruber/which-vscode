// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
const randomColor = require("randomcolor"); // import the script

function changeColor(newColor: string | null) {
  vscode.workspace
    .getConfiguration("workbench")
    .update(
      "colorCustomizations",
      { ["titleBar.activeBackground"]: newColor },
      false
    );
}

function createStatusBarItem() {
  const statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right
  );
  statusBarItem.text = "Which?";
  statusBarItem.tooltip = "Which?";
  statusBarItem.command = "which-vscode.which?";
  statusBarItem.show();
  return statusBarItem;
}

function toogleAction(statusBarItem: any) {
  if (statusBarItem.command === "which-vscode.which?") {
    statusBarItem.text = "Stop?";
    statusBarItem.command = "which-vscode.stopWhich?";
  } else {
    statusBarItem.text = "Which?";
    statusBarItem.command = "which-vscode.which?";
  }
}

export function activate(context: vscode.ExtensionContext) {
  const statusBarItem = createStatusBarItem();

  context.subscriptions.push(statusBarItem);
  context.subscriptions.push(
    vscode.commands.registerCommand("which-vscode.which?", () => {
      changeColor(randomColor());
      toogleAction(statusBarItem);
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("which-vscode.stopWhich?", () => {
      changeColor(null);
      toogleAction(statusBarItem);
    })
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
