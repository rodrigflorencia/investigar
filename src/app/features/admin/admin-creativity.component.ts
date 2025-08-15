import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

import { CreativityRepo } from '../creativity/models/creativity.repo';
import { CreativeUser } from '../creativity/models/creativity.models';
import { ReplaceNullWithTextPipe } from 'src/app/shared/pipes/replace-null.pipe';
import { HeaderAdminComponent } from 'src/app/layout/header-admin/header-admin.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
    selector: 'app-admin-creativity-page',
    standalone: true,
    imports: [
        CommonModule,
        SharedModule,
        ReplaceNullWithTextPipe,
        HeaderAdminComponent,
        MatPaginatorModule,
    ],
    templateUrl: './admin-creativity.component.html',
    styleUrls: ['./admin.page.scss'],
})
export class AdminCreativityPage implements OnInit {
    private readonly creativityRepo = inject(CreativityRepo);

    creativesUsers: CreativeUser[] = [];
    totalUsers = 0;
    pageSize = 10;
    loading$ = new BehaviorSubject<boolean>(true);

    // For template compatibility
    testsDataSource = {
        loading$: this.loading$
    };
    totalTestsCounter = {
        count: 0
    };

    displayedColumns: string[] = [
        'nameLastName', 'age', 'city', 'educationLevel', 'educationStatus',
        'school', 'degree', 'year', 'grade', 'course', 'object', 'proposal',
        'dateStart', 'dateEnd',
    ];

    @ViewChild(MatPaginator) paginator: MatPaginator;

    async ngOnInit(): Promise<void> {
        await this.loadUsers();
        this.loading$.next(false);

        const counterDoc = await this.creativityRepo.getCreativityMetadataCounter();
        if (counterDoc.exists()) {
            this.totalUsers = counterDoc.data()['count'];
            this.totalTestsCounter.count = this.totalUsers;
        }
    }

    async loadUsers() {
        this.loading$.next(true);
        try {
            const usersSnapshot = await this.creativityRepo.getAllUsersData();
            this.creativesUsers = usersSnapshot.docs.map(doc => doc.data());
            this.totalTestsCounter.count = this.creativesUsers.length;
        } finally {
            this.loading$.next(false);
        }
    }

    // Alias for template compatibility
    getData() {
        return this.exportData();
    }

    async exportData() {
        const usersToExport = this.creativesUsers;
        const exportData = usersToExport.map(user => ({
            ...user,
            dateStart: user.dateStart ? user.dateStart.toDate() : '',
            dateEnd: user.dateEnd ? user.dateEnd.toDate() : '',
            proposal: Array.isArray(user.proposal) ? user.proposal.join('; ') : user.proposal
        }));

        // CsvExporter.exportToCsv(exportData, this.displayedColumns, 'dataUsersCreatives.csv');
    }
}
