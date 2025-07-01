import { Component } from '@angular/core';
import { ApiResponse } from '@model/auth/auth.model';
import { MeterSummery, MeterSummeryDTo } from '@model/meter.model';
import { paging_$Searching } from '@model/Utils/Pagination';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from '@service/auth/authentication.service';
import { DashboardService } from '@service/services/dashboard.service';
import { LoaderService } from '@service/shared/loader.service';
import { NotificationService } from '@service/shared/notifcation.service';

@Component({
  selector: 'app-meters',
  templateUrl: './meters.component.html',
  styleUrls: ['./meters.component.scss']
})
export class MetersComponent {
  paging:paging_$Searching = new paging_$Searching();
  filterParam!: URLSearchParams;
  meterList!:MeterSummeryDTo;
  isLoading = true;
  constructor(
    private authService: AuthenticationService,
    private notificationService: NotificationService,
    public translate: TranslateService,
    private dashboardService: DashboardService,
    public loaderService: LoaderService,
  ) {}
  ngOnInit(): void {
    this.pageChange();
  }
  pageChange() {
    // this.loaderService.setSpinner(false);
    // this.isLoading = false;
    this.loaderService.setSpinner(true);
    this.isLoading = true;
    this.getAllMeterSummery();
  }
  getAllMeterSummery() {
    this.dashboardService.getAllMeterFilter(this.paging , this.filterParam ).subscribe({
      next: (response: ApiResponse<MeterSummeryDTo>) => {
        if(response.status ===200){
          this.meterList = response.data!

        }
       else {
        this.notificationService.WaringNotification(this.translate.instant(`Get_Meter_Error`));
      }
      },
      error: (err) => {
        this.notificationService.ErrorNotification(this.translate.instant(`${err.message}`));

      },
      complete: () => {
        this.isLoading = false;
        this.loaderService.setSpinner(false);
      },
  });
  }
  get Math() {
    return Math;
  }
}
