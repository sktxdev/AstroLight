// src/app/features/dashboard/kpi-panel/kpi-panel.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface KpiData {
  title: string;
  value: string | number;
  unit?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

@Component({
  selector: 'app-kpi-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kpi-panel.component.html',
  styleUrls: ['./kpi-panel.component.scss']
})

export class KpiPanelComponent {
  @Input() data!: KpiData;
}