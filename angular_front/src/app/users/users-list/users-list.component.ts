import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
@Component({
	selector: 'app-users-list',
	templateUrl: './users-list.component.html',
	styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
	users: any = [];
	searchByName: String = " ";
	searchByEmail: String = " ";
	dataSource: any;
	createdFrom: any;
	createdTo: any;
	@ViewChild(MatSort, { static: true }) sort!: MatSort;
	@ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
	constructor(private userService: UserService, private router: Router) { }

	ngOnInit(): void {
		this.loadUsers();
	}

	displayedColumns: string[] = ['username', 'email', 'phone', 'dob', 'address', 'createdAt', 'updatedAt', 'Modification'];

	/*
		* return userService 
	*/
	async loadUsers() {

		return await this.userService.getAllUsers().subscribe((data: any) => {
			this.users = data
			this.dataSource = new MatTableDataSource(this.users);
			this.dataSource.paginator = this.paginator;
			this.dataSource.sort = this.sort;
		})
	}

	async applyFilter() {
		let result;
		if (this.createdFrom != null && this.createdTo != null) {
			return await this.userService.getUserByDate(this.createdFrom.toLocaleDateString('en-CA'), this.createdTo.toLocaleDateString('en-CA')).subscribe((data: any) => {
				this.users = data
				result = this.users.filter((e: any) => {
					return e.username.trim().toLowerCase().includes(this.searchByName.trim().toLowerCase()) && e.email.trim().toLowerCase().includes(this.searchByEmail.trim().toLowerCase());
				});

				this.dataSource = new MatTableDataSource(result);
				this.dataSource.paginator = this.paginator;

			})

		}
		return;
	}

	onDelete(id: any, profile_id: any) {
		if (window.confirm('Are you sure, you want to delete?')) {
			this.userService.deleteImage(profile_id).subscribe((data) => {
				this.userService.deleteUser(id).subscribe((data) => {
					this.loadUsers();
				});
			})

		}
	}

	onUpdate(id: any) {
		this.router.navigate(['user/update'], { queryParams: { userId: id } });
	}

	downloadCV() {
		let data, filename, link, result;

		if (this.createdFrom != null && this.createdTo != null) {
			this.userService.getUserByDate(this.createdFrom.toLocaleDateString('en-CA'), this.createdTo.toLocaleDateString('en-CA')).subscribe((data: any) => {
				this.users = data
				result = this.users.filter((e: any) => {
					return e.username.trim().toLowerCase().includes(this.searchByName.trim().toLowerCase()) && e.email.trim().toLowerCase().includes(this.searchByEmail.trim().toLowerCase());
				});


				let csv = this.convertArrayOfObjectsToCSV({
					data: result
				});
				if (csv == null) return;

				filename = 'export.csv';

				if (!csv.match(/^data:text\/csv/i)) {
					csv = 'data:text/csv;charset=utf-8,' + csv;
				}
				data = encodeURI(csv);
				console.log(data)
				link = document.createElement('a'); 0
				link.setAttribute('href', data);
				link.setAttribute('download', filename);
				link.click();

			})

		}
	}

	convertArrayOfObjectsToCSV(args: any) {
		let data = args.data || null;
		if (data == null || !data.length) {
			return null;
		}

		const csvString = [
			[
				"username",
				"email",
				"phone",
				"dob",
				"address"

			],
			...data.map((item: any) => [
				`"${item.username}"`,
				`"${item.email}"`,
				`"${item.phone}"`,
				`"${item.dob}"`,
				`"${item.address}"`,
			])
		]
			.map(e => e.join(","))
			.join("\n");
		return csvString
	}


}
