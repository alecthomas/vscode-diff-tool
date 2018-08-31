'use strict';
import * as vscode from 'vscode';
import * as cp from 'child_process';
import * as path from 'path'

export function activate(context: vscode.ExtensionContext) {
    let diffToolFile = vscode.commands.registerTextEditorCommand('extension.diffToolFile', (editor) => {
        let cwd = path.dirname(editor.document.fileName);
        cp.exec('git difftool ' + editor.document.fileName, { cwd: cwd }, (err, stdout, stderr) => {
            if (err) {
                console.log('error: ' + err);
            }
        });
    });

    let diffToolAll = vscode.commands.registerTextEditorCommand('extension.diffToolAll', (editor) => {
        let cwd = path.dirname(editor.document.fileName);
        cp.exec('git difftool', { cwd: cwd }, (err, stdout, stderr) => {
            if (err) {
                console.log('error: ' + err);
            }
        });
    });

    context.subscriptions.push(diffToolFile, diffToolAll);
}

export function deactivate() {
}