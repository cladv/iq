import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule, MatToolbarModule, MatIconModule, MatInputModule, MatProgressSpinnerModule, MatCardModule, MatSidenavModule, MatSnackBarModule } from '@angular/material';

import { MatCheckboxModule, MatGridListModule } from '@angular/material';
import { MatListModule, MatMenuModule } from '@angular/material';

import {
  MatTableModule, 
  MatFormFieldModule, 
  MatSortModule, 
  MatDialogModule 
} from '@angular/material';

import { MatSnackBar } from '@angular/material';

@NgModule({
    imports: [BrowserAnimationsModule,
              MatButtonModule, 
              MatToolbarModule, 
              MatIconModule, 
              MatInputModule, 
              MatProgressSpinnerModule, 
              MatCardModule,
              MatCheckboxModule,
              MatGridListModule,
              MatListModule,
              MatSidenavModule, 
              MatMenuModule,
              MatSnackBarModule,
              MatTableModule, 
              MatFormFieldModule, 
              MatSortModule, 
              MatDialogModule 
            ],
    exports: [BrowserAnimationsModule,
              MatButtonModule, 
              MatToolbarModule, 
              MatIconModule, 
              MatInputModule, 
              MatProgressSpinnerModule, 
              MatCardModule,
              MatButtonModule, 
              MatCheckboxModule,
              MatGridListModule,
              MatListModule,
              MatSidenavModule,
              MatMenuModule,
              MatSnackBarModule,
              MatTableModule, 
              MatFormFieldModule, 
              MatSortModule, 
              MatDialogModule 
            ]
})

export class MaterialModule { }
