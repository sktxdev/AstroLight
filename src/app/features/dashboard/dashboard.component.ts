// src/app/features/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KpiPanelComponent, KpiData } from './kpi-panel/kpi-panel.component';

export interface ProductPerformance {
  id: string;
  productName: string;
  salesVolume: number;
  revenue: number;
  expenses: number;
  profit: number;
  notes: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, KpiPanelComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  kpiData: KpiData[] = [];
  productData: ProductPerformance[] = [];

  ngOnInit(): void {
    this.loadKpiData();
    this.loadProductData();
  }

  private loadKpiData(): void {
    this.kpiData = [
      {
        title: 'Sales (USD)',
        value: '125,430',
        unit: '',
        trend: { value: 12.5, isPositive: true }
      },
      {
        title: 'Average Uptime',
        value: '99.9',
        unit: '%',
        trend: { value: 0.2, isPositive: true }
      },
      {
        title: 'Outages',
        value: '3',
        unit: 'this month',
        trend: { value: -2, isPositive: true } // Fewer outages is good
      },
      {
        title: 'Backlog of Orders',
        value: '847',
        unit: 'orders',
        trend: { value: -15.3, isPositive: true } // Lower backlog is good
      },
      {
        title: 'Prepaid Orders',
        value: '1,234',
        unit: 'orders',
        trend: { value: 8.7, isPositive: true }
      },
      {
        title: 'Revenue',
        value: '456,789',
        unit: 'USD',
        trend: { value: 5.2, isPositive: true }
      },
      {
        title: 'Customer Satisfaction',
        value: '4.8',
        unit: '/5.0',
        trend: { value: 0.1, isPositive: true }
      },
      {
        title: 'New Users',
        value: '2,341',
        unit: 'this week',
        trend: { value: 18.4, isPositive: true }
      }
    ];
  }

  private loadProductData(): void {
    const products = [
      'Widget A', 'Gadget B', 'Tool C', 'Device D', 'Appliance E',
      'Component F', 'Module G', 'System H', 'Part I', 'Assembly J',
      'Unit K', 'Item L', 'Product M', 'Solution N', 'Service O',
      'Device P', 'Hardware Q', 'Software R', 'Accessory S', 'Kit T'
    ];

    const notesList = [
      'High demand in Q1', 'Seasonal peak expected', 'New release upcoming',
      'Supply chain delay', 'Competitor analysis needed', 'Customer feedback positive',
      'Inventory low', 'Promotion running', 'Price increase planned', 'End of lifecycle',
      'High margin item', 'Bundled offer', 'Export order pending', 'Customization requested',
      'Stockout risk', 'Marketing campaign started', 'Vendor contract renewal',
      'Quality audit passed', 'Return rate low', 'Pre-order available'
    ];

    this.productData = products.map((name, index) => {
      const salesVolume = Math.floor(Math.random() * 5000) + 500;
      const revenue = Math.floor(Math.random() * 500000) + 50000;
      const expenses = Math.floor(revenue * (0.3 + Math.random() * 0.4));
      const profit = revenue - expenses;

      return {
        id: `P${String(index + 1).padStart(3, '0')}`,
        productName: name,
        salesVolume,
        revenue,
        expenses,
        profit,
        notes: notesList[index]
      };
    });
  }
}