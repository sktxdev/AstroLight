import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Permission {
  permissionId: string;
  permissionName: string;
  description: string;
}

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class PermissionsComponent implements OnInit {

  permissions: Permission[] = [
    { permissionId: 'P001', permissionName: 'Create Users', description: 'Ability to create new user accounts in the system' },
    { permissionId: 'P002', permissionName: 'Edit Users', description: 'Modify existing user account information and settings' },
    { permissionId: 'P003', permissionName: 'Delete Users', description: 'Remove user accounts from the system permanently' },
    { permissionId: 'P004', permissionName: 'View Users', description: 'Access user account details and information' },
    { permissionId: 'P005', permissionName: 'Manage Roles', description: 'Create, edit, and assign roles to users' },
    { permissionId: 'P006', permissionName: 'View Reports', description: 'Access system reports and analytics data' },
    { permissionId: 'P007', permissionName: 'Export Data', description: 'Export system data to external formats' },
    { permissionId: 'P008', permissionName: 'Import Data', description: 'Import external data into the system' },
    { permissionId: 'P009', permissionName: 'Manage Settings', description: 'Configure system settings and preferences' },
    { permissionId: 'P010', permissionName: 'View Logs', description: 'Access system audit logs and activity records' },
    { permissionId: 'P011', permissionName: 'Backup System', description: 'Initiate system backup and recovery operations' },
    { permissionId: 'P012', permissionName: 'Send Notifications', description: 'Send system notifications to users' },
    { permissionId: 'P013', permissionName: 'Moderate Content', description: 'Review and moderate user-generated content' },
    { permissionId: 'P014', permissionName: 'Access API', description: 'Make API calls and access system endpoints' },
    { permissionId: 'P015', permissionName: 'Manage Events', description: 'Create, edit, and manage system events' },
    { permissionId: 'P016', permissionName: 'View Dashboard', description: 'Access main dashboard and overview screens' },
    { permissionId: 'P017', permissionName: 'Manage Permissions', description: 'Assign and modify user permissions' },
    { permissionId: 'P018', permissionName: 'Execute Scripts', description: 'Run administrative scripts and commands' },
    { permissionId: 'P019', permissionName: 'Manage Database', description: 'Direct database access and management' },
    { permissionId: 'P020', permissionName: 'System Administration', description: 'Full system administrative access' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
