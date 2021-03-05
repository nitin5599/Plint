import { Component, OnInit } from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {animate, state, style, transition, trigger} from '@angular/animations';


declare const $: any;
declare interface RouteInfo {
    path: String;
    title: String;
    icon: String;
    class: String;
    children?: RouteInfo[];
   
}


export const ROUTES: RouteInfo[] = [
    { path: '/user-profile', title: 'Add User',  icon:'person', class: '' },
    { path: '/userslist', title: 'Users List',  icon:'list', class: '' },
    { path: '/managerslist', title: 'Managers List',  icon:'list', class: '' },
    { path: '/usertrips', title: 'Manage Trips',  icon:'loyalty', class: '' },
    { path: '/log', title: 'Transaction Log',  icon:'receipt_long', class: '' },
    // { path: '/attendence', title: 'Attendence',  icon:'note_add', class: '' },
    { path: '/all_companies', title: 'All Companies',  icon:'dashboard', class: '' },
    { path: '/comp_meet', title: 'Company & Meeting',  icon:'meeting_room', class: '',
    children: [
      {path: '/view_meet', title: 'View Meeting',  icon:'meeting_room', class: ''},
      {path: '/view_comp', title: 'View All Companies',  icon:'meeting_room', class: ''},
    ]
  
    },

  ];
  const TREE_DATA: RouteInfo[] = [
    {
      path: '/comp_meet', title: 'Company & Meeting',  icon:'meeting_room', class: '',
      children: [
        {path: '/view_meet', title: 'View Meeting',  icon:'meeting_room', class: ''},
        {path: '/view_comp', title: 'View Company',  icon:'meeting_room', class: ''},
      ]
    }

   ]

  interface ExampleFlatNode {
    expandable: boolean;
    name: string;
    level: number;
  }

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  private _transformer = (node: RouteInfo, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.title,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

    treeFlattener = new MatTreeFlattener(
      this._transformer, node => node.level, node => node.expandable, node => node.children);

      dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
 
  constructor() { }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.dataSource.data = ROUTES;
    
  }

  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

}
