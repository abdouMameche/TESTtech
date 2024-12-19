import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { trigger, style, animate, transition } from '@angular/animations';


//import { AddUserFormComponent } from '../add-user-form/add-user-form.component';




@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule, MatDialogModule, ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('formAnimation', [
      transition(':enter', [
        style({ transform: 'scale(0.9)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'scale(1)', opacity: 1 })),
      ]),
      transition(':leave', [
        animate('400ms ease-in', style({ transform: 'scale(0.9)', opacity: 0 })),
      ]),
    ]),
  ],

})
export class DashboardComponent {
  constructor(private dialog: MatDialog) {}
  showConfirmationModal: boolean = false;
  confirmationMessage: string = '';
  currentAction: Function | null = null;
  userName: string = 'John Doe';
  welcomeText: string = 'Welcome to your Dashboard';
  searchQuery: string = '';
  confirmationIcon: string = '';
  users = [
    { userName: 'User 1', password: '********', role: 'Admin' },
    { userName: 'User 2', password: '********', role: 'User' },
    { userName: 'User 3', password: '********', role: 'User' },
    { userName: 'User 4', password: '********', role: 'Admin' },
    { userName: 'User 5', password: '********', role: 'Admin' },
    { userName: 'User 6', password: '********', role: 'User' },
    { userName: 'User 7', password: '********', role: 'User' },
    { userName: 'User 8', password: '********', role: 'Admin' },
    { userName: 'User 9', password: '********', role: 'User' }
  ];
  
  roles: string[] = ['ROLE_USER', 'ROLE_SUPERUSER', 'ROLE_ADMIN', 'ROLE_NEW'];
  showAddUserForm: boolean = false;
  newUser = { userName: '', password: '', role: this.roles[0] };
  isDropdownOpen = false;

  toggleLanguageDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  changeLanguage(language: string) {
    console.log('Language changed to:', language);
    // Add logic to change the language
    this.isDropdownOpen = false;
  }

  onSearch() {
    console.log('Search query:', this.searchQuery);
  }

  editUser(user: any) {
    this.selectedUser = user; // Store the user being edited
    this.editUserForm = { ...user }; // Populate the form with user data
    this.showEditUserForm = true; // Show the edit user form
  }


  addNewUser() {
    this.showAddUserForm = true;
  }

  handleAddUser(user: any) {
    console.log('User added:', user);
    this.users.push({ ...user, password: '********' });
    this.showAddUserForm = false;
  }
  
// Variables for managing the edit user modal
showEditUserForm: boolean = false;
editUserForm = { userName: '', password: '', role: '' };
selectedUser: any = null;

// Edit user handler (opens the modal)


// Confirm and update user data
confirmUpdateUser() {
  if (this.selectedUser) {
    // Update the selected user's data
    this.selectedUser.userName = this.editUserForm.userName;
    this.selectedUser.password = this.editUserForm.password;
    this.selectedUser.role = this.editUserForm.role;

    console.log('User updated:', this.selectedUser);
    this.cancelEditUser(); // Close the modal after saving
  }
}

// Cancel editing user
cancelEditUser() {
  this.showEditUserForm = false;
  this.editUserForm = { userName: '', password: '', role: '' }; // Reset the form
  this.selectedUser = null;
}

 




  confirmDeleteUser(user: any): void {
    this.confirmationMessage = `Are you sure you want to delete the user with username ${user.userName}?`;
    this.confirmationIcon = 'delete'; // Material icon for deletion
    this.currentAction = () => this.deleteUser(user); // Assign the delete action to the modal
    this.showConfirmationModal = true; // Show the confirmation modal
  }
  

  deleteUser(user: any) {
    console.log('Deleted user:', user);
    this.users = this.users.filter(u => u !== user);
  }

  confirmSubmitUserForm() {
    this.confirmationMessage = `Are you sure you want to add a new user with username ${this.newUser.userName}?`;
    this.confirmationIcon = 'Adding New User'; // Material icon for add user
    this.currentAction = () => this.submitUserForm();
    this.showConfirmationModal = true;
  }

  submitUserForm() {
    console.log('New User Submitted:', this.newUser);
    this.users.push({ ...this.newUser, password: '********' });
    this.cancelAddUser();
  }

  cancelAddUser() {
    this.showAddUserForm = false;
    this.newUser = { userName: '', password: '', role: this.roles[0] };
  }

  confirmLogout() {
    this.confirmationMessage = 'Are you sure you want to log out?';
    this.confirmationIcon = 'logout'; // Material icon for logout
    this.currentAction = () => this.disconnect();
    this.showConfirmationModal = true;
  }

  disconnect() {
    console.log("User logged out");
  }

  confirmAction(confirm: boolean) {
    if (confirm && this.currentAction) {
      this.currentAction();
    }
    this.showConfirmationModal = false;
    this.currentAction = null;
  }
}
