import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { UserService } from '../Services/user';
import {
  ColDef,
  AllCommunityModule,
  ModuleRegistry,
  GridReadyEvent,
  GridApi,
} from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-aggrid',
  imports: [AgGridModule],
  templateUrl: './aggrid.html',
  styleUrl: './aggrid.css',
})
export class AGGrid implements OnInit {
  private userSrv = inject(UserService);

  columnDefs: ColDef[] = [];
  rowData: any[] = [];
  gridApi!: GridApi;

  ngOnInit(): void {}


  // initialise the data first and try to view the grid. no rows to dispaly
  // becasue the api is async.. data binded with empty before. use on gridready 

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    this.userSrv.getUsersList().subscribe(
      (data) => {
        var temp = data;

        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          delete element['_id'];
        }

        this.columnDefs = Object.keys(data[0])
          .filter((key) => typeof data[0][key] !== 'object')
          .map((key) => ({
            field: key,
          }));

        console.log(this.columnDefs);

        this.rowData = [...data];

        this.rowData = [...this.rowData];

        console.log(this.rowData);

        this.gridApi.setGridOption('columnDefs', this.columnDefs);
        this.gridApi.setGridOption('rowData', this.rowData);
      },
      (err) => {},
      () => {
        
      },
    );
  }
}
