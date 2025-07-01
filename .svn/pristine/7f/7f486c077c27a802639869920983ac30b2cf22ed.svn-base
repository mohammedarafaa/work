import { Component } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { ApiResponse, AuthToken } from '@model/auth/auth.model';
import { MeterSummery, MeterSummeryDTo } from '@model/meter.model';
import { paging_$Searching } from '@model/Utils/Pagination';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from '@service/auth/authentication.service';
import { DashboardService } from '@service/services/dashboard.service';
import { LoaderService } from '@service/shared/loader.service';
import { NotificationService } from '@service/shared/notifcation.service';
import { SharedService } from '@service/shared/Shared.service';
import * as Highcharts from 'highcharts';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.scss']
})
export class CustomerDashboardComponent {
  Highcharts: typeof Highcharts = Highcharts;
  consumptionTrendsChartOptions: Highcharts.Options = {
    chart: { type: 'line' },
    title: { text: this.translate.instant(`chart_title`) },
    xAxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] },
    yAxis: { title: { text: this.translate.instant(`consumption_unit`) } },
    series: [
      { name: this.translate.instant(`Electricity`), type: 'line', data: [100, 150, 200, 250, 300, 350] },
      { name: this.translate.instant(`Water`), type: 'line', data: [50, 75, 100, 125, 150, 175] },
      { name: this.translate.instant(`Gas`), type: 'line', data: [30, 50, 70, 90, 110, 130] },
    ],
  };
now= new Date();
  currentUser!: AuthToken | null;
  paging:paging_$Searching = new paging_$Searching();
  filterParam!: URLSearchParams;
  meterList!:MeterSummeryDTo;
  isLoading = true;
  projectList: BehaviorSubject<any> = new BehaviorSubject([]);
  propertyList: BehaviorSubject<any> = new BehaviorSubject([]);
  unitsList: BehaviorSubject<any> = new BehaviorSubject([]);
meterTypes = ['GAS', 'WATER', 'ELCTRICTY'];
form: FormGroup = this.fb.group({});

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private notificationService: NotificationService,
    public translate: TranslateService,
    private dashboardService: DashboardService,
    public loaderService: LoaderService,
    private _sharedService: SharedService,
  ) {
    this.createForm();
    this.currentUser = this.authService.getAuthUser();

  }
  ngOnInit(): void {
    this.pageChange();
    this.getProjectData();
  }
  createForm() {
    this.form = this.fb.group({
      meterType: [null],
      propertyId: [null],
      compoundId: [null],
      
    });
    // this.form.
    this.onChanges();
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  onChanges(): void {
    this.form.valueChanges.subscribe(val => {
      console.log(val);
      if(val.compoundId){
        this.getPropertyData(val.compoundId)
      }
      const temp = Object.entries(this.form.value)
      .filter(([_, value]) => value !== undefined && value !== null && value !== "")
      .map(([key, value]) => [key, value]);
    console.log(temp);

    this.filterParam = new URLSearchParams(temp as string[][]);
      this.pageChange()
    });
  }
  pageChange() {
    // this.loaderService.setSpinner(false);
    // this.isLoading = false;
    this.loaderService.setSpinner(true);
    this.isLoading = true;
    this.getAllMeterSummery();
  }
  getProjectData() {
    this._sharedService.getAllProject().subscribe({
      next: (list: any) => {
        if (list.status === 200) {
          this.projectList.next(list.data);
         
        } else {
          this.notificationService.WaringNotification(this.translate.instant(`Get_Status_Warning`));
        }

      },
      error: (err) => {
        this.notificationService.WaringNotification(this.translate.instant(`Get_Status_Error`));
      },

    });
  }
  getPropertyData(compoundId:string) {
    this._sharedService.getAllPropertyByCompoundId(compoundId).subscribe({
      next: (list: any) => {
        if (list.status === 200) {
          this.propertyList.next(list.data);
          
        } else {
          this.notificationService.WaringNotification(this.translate.instant(`Get_Status_Warning`));
        }

      },
      error: (err) => {
        this.notificationService.WaringNotification(this.translate.instant(`Get_Status_Error`));
      },

    });
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

