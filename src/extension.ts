// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

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

export function activate(context: vscode.ExtensionContext) {
  const CC_save: CC = JSON.parse(
    JSON.stringify(
      vscode.workspace.getConfiguration("workbench").get("colorCustomizations")
    )
  );

  let disposables = [];

  disposables.push(
    vscode.commands.registerCommand("which-vscode.which?", () => {
      ChangeColor("#ff0000");

      vscode.window.showInformationMessage("Hello from which-vscode!");
    })
  );

  disposables.push(
    vscode.commands.registerCommand("which-vscode.stopWhich?", () => {
      console.log(CC_save);
      ChangeColor(CC_save["titleBar.activeBackground"]);

      vscode.window.showInformationMessage("Thank you for using which-vscode!");
    })
  );

  disposables.forEach((element) => {
    context.subscriptions.push(element);
  });
}

// this method is called when your extension is deactivated
export function deactivate() {}
