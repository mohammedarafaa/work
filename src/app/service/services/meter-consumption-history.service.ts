import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { HttpService } from '@service/shared/http.service';
import { MeterConsumptionHistoryDTO } from '@models/meter-consumption-history.dto';

@Injectable({
  providedIn: 'root',
})
export class MeterConsumptionHistoryService {
  constructor(public http: HttpService) {}

  getConsumptionHistoryByMeterId(meterId: string): Observable<MeterConsumptionHistoryDTO> {
    return this.http._getCall<MeterConsumptionHistoryDTO>(
      `${environment.apiUrl}/meter-consumption-history/${meterId}`
    );
  }

  getConsumptionHistoryByPeriod(meterId: string, period: 'Daily' | 'Weekly' | 'Monthly' | 'Yearly'): Observable<MeterConsumptionHistoryDTO> {
    return this.http._getCall<MeterConsumptionHistoryDTO>(
      `${environment.apiUrl}/meter-consumption-history/${meterId}?period=${period}`
    );
  }

  getConsumptionHistoryByDateRange(
    meterId: string,
    startDate: string,
    endDate: string
  ): Observable<MeterConsumptionHistoryDTO> {
    return this.http._getCall<MeterConsumptionHistoryDTO>(
      `${environment.apiUrl}/meter-consumption-history/${meterId}/range?startDate=${startDate}&endDate=${endDate}`
    );
  }

  exportConsumptionHistory(meterId: string, period: string): Observable<any> {
    return this.http._getCall<any>(
      `${environment.apiUrl}/meter-consumption-history/${meterId}/export?period=${period}`
    );
  }
} 