import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material';

import { AuthService } from '../core/auth.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements AfterViewInit {

  displayedColumns = ['name', 'desc', 'edit'];
  dataSource: MatTableDataSource<any>; 

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(public authService: AuthService, 
              private afs: AngularFirestore, 
              public dialog: MatDialog, 
              public snackBar: MatSnackBar){
   }

  ngAfterViewInit() {
      this.afs.collection<any>('menu').valueChanges().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;      
    })
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue; 
  }

  addOne(formData) {
    const menu = {
      name: formData.value.name,
      desc: formData.value.desc
    }
    this.afs.collection('menu').add(menu).then(ref => {
      console.log('Added document with ID: ', ref.id);
      this.openSnackBar();
      formData.reset();
  });
    
  }

   openDialog(data): void {
    const dialogRef = this.dialog.open(MenuComponent, {
      width: '350px',
      data: data
    });
  } 
  
  openSnackBar() {
    this.snackBar.open ('Menu Creado Exitosamente', '', {
      duration: 1000
    });
  }

  trackByUid(index, item) {
    return item.uid
  }

}