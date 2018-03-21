import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog, MatSnackBar } from '@angular/material';

import { AuthService } from '../core/auth.service';
import { FirestoreDataService } from '../core/firestore-data.service';

import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';

import { Menu } from '../menu/menu';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements AfterViewInit {
  snackMessage;
  displayedColumns = ['name', 'desc', 'edit', 'delete'];
  dataSource: MatTableDataSource<any>; 

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(public authService: AuthService, 
              private afs: AngularFirestore, 
              public dialog: MatDialog, 
              public snackBar: MatSnackBar){
   }

    ngAfterViewInit() {
      this.afs.collection<any>('menu').snapshotChanges().map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data() as Menu;
          return { id: a.payload.doc.id, name: data.name, desc: data.desc };        
        });
      }).subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        console.log(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;      
      })


//      this.afs.collection<any>('menu').valueChanges().subscribe(data => {
//      this.dataSource = new MatTableDataSource(data);
//      console.log(data);
//      this.dataSource.paginator = this.paginator;
//      this.dataSource.sort = this.sort;      
//    })
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
      this.snackMessage = 'Menu creado exitosamente';
      this.openSnackBar();
      formData.reset();
  });  
  }
  deleteOne(data) {
    console.log(data);
    this.afs.doc('menu/'+data.id).delete().then(() => {
      console.log('deleted');
    })
  }

   openDialogEdit(data): void {
    const dialogRef = this.dialog.open(MenuComponent, {
      width: '350px',
      data: { name: data.name, desc: data.desc } });
  }

  openDialogDelete(data): void {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: '350px',
      data: data
      });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(result){
      this.deleteOne(data);
      this.snackMessage = 'Menu Eliminado!';
      this.openSnackBar();
    }
    });
  }
    
  openSnackBar() {
    this.snackBar.open (this.snackMessage, '', {
      duration: 1000
    });
  }

  trackByUid(index, item) {
    return item.uid
  }

}
