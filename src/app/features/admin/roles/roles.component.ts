import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Role {
  roleId: string;
  roleName: string;
  description: string;
}

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class RolesComponent {
  roles: Role[] = [
    { roleId: 'R001', roleName: 'Administrator', description: 'Full system access and management capabilities' },
    { roleId: 'R002', roleName: 'Manager', description: 'Department level management and oversight' },
    { roleId: 'R003', roleName: 'User', description: 'Standard user access with basic permissions' },
    { roleId: 'R004', roleName: 'Editor', description: 'Content creation and editing permissions' },
    { roleId: 'R005', roleName: 'Viewer', description: 'Read-only access to system content' },
    { roleId: 'R006', roleName: 'Moderator', description: 'Community and content moderation capabilities' },
    { roleId: 'R007', roleName: 'Analyst', description: 'Data analysis and reporting access' },
    { roleId: 'R008', roleName: 'Support', description: 'Customer support and help desk functions' },
    { roleId: 'R009', roleName: 'Developer', description: 'Software development and system configuration' },
    { roleId: 'R010', roleName: 'Supervisor', description: 'Team supervision and workflow management' },
    { roleId: 'R011', roleName: 'Guest', description: 'Limited temporary access for external users' },
    { roleId: 'R012', roleName: 'Auditor', description: 'System audit and compliance verification' },
    { roleId: 'R013', roleName: 'Coordinator', description: 'Cross-functional coordination and planning' },
    { roleId: 'R014', roleName: 'Specialist', description: 'Domain-specific expertise and consultation' },
    { roleId: 'R015', roleName: 'Trainer', description: 'Training delivery and educational content' },
    { roleId: 'R016', roleName: 'Consultant', description: 'Advisory services and strategic guidance' },
    { roleId: 'R017', roleName: 'Operator', description: 'System operation and routine maintenance' },
    { roleId: 'R018', roleName: 'Reviewer', description: 'Content review and quality assurance' },
    { roleId: 'R019', roleName: 'Publisher', description: 'Content publication and distribution' },
    { roleId: 'R020', roleName: 'Contributor', description: 'Limited content contribution permissions' }
  ];
}
