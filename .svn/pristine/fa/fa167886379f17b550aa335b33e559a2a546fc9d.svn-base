import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from '@model/auth/auth.model';
import { MeterSummeryDTo } from '@model/meter.model';
import { DataTable, DataTableResponse, paging_$Searching } from '@model/Utils/Pagination';
import { DashboardService } from '@service/services/dashboard.service';
import { LoaderService } from '@service/shared/loader.service';
import { NotificationService } from '@service/shared/notifcation.service';

@Component({
  selector: 'app-meter-summary',
  templateUrl: './meter-summary.component.html',
  styleUrls: ['./meter-summary.component.scss']
})
export class MeterSummaryComponent {
  type!: string;
  meterSummeryData!: MeterSummeryDTo;
  isLoading: boolean = false;
  listOfColumns: string[] = ['meterId', 'meterSerial', 'type', 'location', 'credit', 'consumption', 'Action'];
  filterParam!: URLSearchParams;
  paging = new paging_$Searching();
  constructor(
    private route: ActivatedRoute,
    private dashboardService: DashboardService,
    private router:Router,
    public loaderService: LoaderService,
    private notificationService: NotificationService
  ) {
    this.route.params.subscribe(params => {
      console.log(params);
      
      if(params['type']){
        this.type = params['type'];
        this.getMeterSummary(this.type);
      }else{
        this.router.navigateByUrl('/Error/404');
      }
    });
  }
  ngOnInit(): void {

    this.pageChange();

  }
  pageChange() {
    this.loaderService.setSpinner(true);
    this.isLoading = true;
    this.getMeterSummary(this.type);
  }
  getMeterSummary(type:string){
    this.dashboardService.getAllMeterByTypePaging(type,this.paging , this.filterParam).subscribe({
      next: (value: ApiResponse<MeterSummeryDTo>) => {
        console.log(value);
        
        if (value.status == 200) {
          this.meterSummeryData = value.data!;
          // this.meterSummeryData.
          console.log(this.meterSummeryData);
        } else  {
          this.notificationService.WaringNotification('get_meter_summery_error');
          this.isLoading = false;
        }
      },
      error: (err) => {
        this.notificationService.ErrorNotification(
          'get_meter_summery_error'
        );
        
        this.loaderService.setSpinner(false);
        this.isLoading = false;
      },
      complete: () => {
        this.loaderService.setSpinner(false);
        this.isLoading = false;
      },
    });
  }
    // Add these properties to your component class
    currentSortColumn: string = '';
    isSortAscending: boolean = true;
    // Add this method to handle sorting
    onSort(column: string) {
      if (this.currentSortColumn === column) {
        // If clicking the same column, toggle the sort direction
        this.isSortAscending = !this.isSortAscending;
      } else {
        // If clicking a new column, default to ascending
        this.currentSortColumn = column;
        this.isSortAscending = true;
      }
  
      // Update the paging object with sort information
      this.paging.sort = this.currentSortColumn;
      this.paging.sortDirection = this.isSortAscending ? 'asc' : 'desc';
  
      // Reset to first page when changing sort
      this.paging.page = 1;
  
      // Trigger data reload
      this.pageChange();
    }
  
    // Add this method to get sort icon
    getSortIcon(column: string): string {
      if (this.currentSortColumn !== column) {
        return 'fa-sort'; // Default sort icon when not sorted
      }
      return this.isSortAscending ? 'fa-sort-up' : 'fa-sort-down';
    }
  get Math() {
    return Math;
  }
}
