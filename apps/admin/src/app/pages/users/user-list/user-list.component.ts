import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User, UsersService } from '@catalina-coasters/users';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'admin-users-list',
  templateUrl: './user-list.component.html',
  styles: []
})
export class UserListComponent implements OnInit,OnDestroy {
  users: User[] = [];
  endsub$: Subject<any> = new Subject();

  constructor(
    private usersService: UsersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._getUsers();
  }
  ngOnDestroy() {
    this.endsub$.next();
    this.endsub$.complete();
  }

  deleteUser(userId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to Delete this User?',
      header: 'Delete User',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usersService.deleteUser(userId).pipe(takeUntil(this.endsub$))
        .subscribe(
          () => {
            this._getUsers();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'User is deleted!'
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'User is not deleted!'
            });
          }
        );
      }
    });
  }

  getCountryName(countryKey: string) {
    if (countryKey) {
      return this.usersService.getCountry(countryKey);
    }
    else {
      return null;
    }
  }

  updateUser(userid: string) {
    this.router.navigateByUrl(`users/form/${userid}`);
  }

  private _getUsers() {
    this.usersService.getUsers().pipe(takeUntil(this.endsub$))
    .subscribe((users) => {
      this.users = users;
    });
  }
}
