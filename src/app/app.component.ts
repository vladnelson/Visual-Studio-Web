import { NestedTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource } from '@angular/material/tree';
import { readDir, readTextFile } from '@tauri-apps/api/fs';
import { NgxEditorModel } from 'ngx-monaco-editor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  editorOptions = { theme: 'vs-dark', language: 'javascript' };

  title = 'TauriApp';
  listPath: Array<Node>
  options = {
    theme: 'vs-dark'
  };
  code: string = '';


  constructor() {

    var pathTop = "C:\\Users\\didim\\Documents\\INTECH";

    //var pathTop = "C:\\Users\\didim\\Documents\\INTECH\\ProgrammationFonctionnelle\\test1\\cjohansen-no\\infrastructure";
    this.listPath = this.populateNode(pathTop);
    console.log(this.listPath);

  }
  hasChild = (_: number, node: Node) => !!node.children && node.children.length > 0;

  populateNode(directory: string): any {

    var childrens: Array<Node> = new Array<Node>();
    readDir(directory).then(d => {
      d.forEach(c => {
        if (c.children) {
          childrens.push({ name: c.name!!, path: c.path, haveChildren: true })
        } else {
          childrens.push({ name: c.name!!, path: c.path, haveChildren: false })
        }

      })
    });
    return childrens;
  }

  openFile(node: Node) {

    if (!node.haveChildren) {
      readTextFile(node.path).then(d => {

        this.code = d;
      });


    } else if (node.children == null || node.children == undefined) {
      readDir(node.path).then(d => {
        node.children = new Array<Node>();
        d.forEach(c => {
          if (c.children) {
            node.children?.push({ name: c.name!!, path: c.path, haveChildren: true })
          } else {
            node.children?.push({ name: c.name!!, path: c.path, haveChildren: false })
          }

        })
      });

    } else  {
      node.children = undefined;
      console.log(node);
    }

  }



}


interface Node {
  name: string;
  path: string;
  children?: Array<Node>;
  haveChildren: boolean;
}