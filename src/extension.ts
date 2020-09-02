// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
const randomColor = require("randomcolor"); // import the script

interface CC {
  "activityBar.background": string;
  "titleBar.activeBackground": string;
  "titleBar.activeForeground": string;
}

function ChangeColor(NewColor: string) {
  vscode.workspace
    .getConfiguration("workbench")
    .update(
      "colorCustomizations",
      { ["titleBar.activeBackground"]: NewColor },
      false
    );
}

function createStatusBarItem() {
  const statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left
  );
  statusBarItem.text = "Which?";
  statusBarItem.tooltip = "Which?";
  statusBarItem.command = "which-vscode.which?";
  statusBarItem.show();
  return statusBarItem;
}

function ToogleAction(statusBarItem: any) {
  if (statusBarItem.command == "which-vscode.which?") {
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
  let CC_save: CC;
  CC_save = JSON.parse(
    JSON.stringify(
      vscode.workspace.getConfiguration("workbench").get("colorCustomizations")
    )
  );

  if (context.workspaceState.get("CC_save")) {
    CC_save = context.workspaceState.get("CC_save") as CC;
  }
  let disposables = [];
  context.workspaceState.update("CC_save", CC_save);
  disposables.push(
    vscode.commands.registerCommand("which-vscode.which?", () => {
      ChangeColor(randomColor());
      ToogleAction(statusBarItem);
    })
  );

  disposables.push(
    vscode.commands.registerCommand("which-vscode.stopWhich?", () => {
      ChangeColor(CC_save["titleBar.activeBackground"] as string);
      ToogleAction(statusBarItem);
    })
  );

  disposables.forEach((element) => {
    context.subscriptions.push(element);
  });
}

// this method is called when your extension is deactivated
export function deactivate() {}
