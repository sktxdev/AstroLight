import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

export interface User {
  userId: string;
  username: string;
  firstName: string;
  lastName: string;
  description: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class UsersComponent implements OnInit {
  title: string = 'Users';

  users: User[] = [
    { userId: 'U001', username: 'john.doe', firstName: 'John', lastName: 'Doe', description: 'Senior Software Engineer with expertise in full-stack development' },
    { userId: 'U002', username: 'jane.smith', firstName: 'Jane', lastName: 'Smith', description: 'Project Manager overseeing multiple development teams' },
    { userId: 'U003', username: 'mike.wilson', firstName: 'Mike', lastName: 'Wilson', description: 'DevOps Engineer specializing in cloud infrastructure' },
    { userId: 'U004', username: 'sarah.johnson', firstName: 'Sarah', lastName: 'Johnson', description: 'UX/UI Designer focused on user-centered design principles' },
    { userId: 'U005', username: 'david.brown', firstName: 'David', lastName: 'Brown', description: 'Quality Assurance Lead ensuring product reliability' },
    { userId: 'U006', username: 'lisa.garcia', firstName: 'Lisa', lastName: 'Garcia', description: 'Business Analyst bridging technical and business requirements' },
    { userId: 'U007', username: 'chris.miller', firstName: 'Chris', lastName: 'Miller', description: 'Database Administrator managing data architecture' },
    { userId: 'U008', username: 'emily.davis', firstName: 'Emily', lastName: 'Davis', description: 'Marketing Specialist driving user engagement strategies' },
    { userId: 'U009', username: 'ryan.taylor', firstName: 'Ryan', lastName: 'Taylor', description: 'Security Engineer implementing cybersecurity measures' },
    { userId: 'U010', username: 'amanda.wilson', firstName: 'Amanda', lastName: 'Wilson', description: 'Product Owner defining feature requirements and roadmap' },
    { userId: 'U011', username: 'kevin.moore', firstName: 'Kevin', lastName: 'Moore', description: 'Technical Writer creating documentation and user guides' },
    { userId: 'U012', username: 'nicole.anderson', firstName: 'Nicole', lastName: 'Anderson', description: 'Data Scientist analyzing user behavior and trends' },
    { userId: 'U013', username: 'jason.thomas', firstName: 'Jason', lastName: 'Thomas', description: 'System Administrator maintaining server infrastructure' },
    { userId: 'U014', username: 'rachel.white', firstName: 'Rachel', lastName: 'White', description: 'Customer Success Manager ensuring client satisfaction' },
    { userId: 'U015', username: 'mark.harris', firstName: 'Mark', lastName: 'Harris', description: 'Frontend Developer specializing in React and Angular' },
    { userId: 'U016', username: 'stephanie.clark', firstName: 'Stephanie', lastName: 'Clark', description: 'HR Coordinator managing recruitment and onboarding' },
    { userId: 'U017', username: 'daniel.lewis', firstName: 'Daniel', lastName: 'Lewis', description: 'Mobile App Developer creating iOS and Android applications' },
    { userId: 'U018', username: 'jessica.lee', firstName: 'Jessica', lastName: 'Lee', description: 'Content Manager overseeing digital marketing campaigns' },
    { userId: 'U019', username: 'alex.robinson', firstName: 'Alex', lastName: 'Robinson', description: 'Backend Developer building scalable API services' },
    { userId: 'U020', username: 'megan.walker', firstName: 'Megan', lastName: 'Walker', description: 'Finance Analyst managing budgets and financial planning' }
  ];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.url.subscribe(urlSegments => {
      if (urlSegments.length > 1) {
        // Get the last segment of the route
        const lastSegment = urlSegments[urlSegments.length - 1].path;
        // Convert kebab-case or snake_case to Title Case
        this.title = lastSegment
          .split(/[-_]/)
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      }
    });
  }

}
