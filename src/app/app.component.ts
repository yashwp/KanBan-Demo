import {Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {ISubscription} from 'rxjs/Subscription';
import {CommonService} from './shared/services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class AppComponent implements OnInit, OnDestroy {

  isLoadMoreShown = false;
  pageOffset = 1;
  opportunities = [];
  columnTwoItems = [];
  columnThreeItems = [];
  private subscriptions: { [name: string]: ISubscription } = {};

  constructor(private _commonService: CommonService,
              private _cdr: ChangeDetectorRef) {
  }

  markForCheck() {
    setTimeout(() => {
      if (!this._cdr['destroyed']) {
        this._cdr.markForCheck();
        this._cdr.detectChanges();
      }
    });
  }

  ngOnInit() {
    this._commonService.getOpportunities().subscribe((res: any) => {
      if (res) {
        this.pageOffset = res.paging.current_page;
        this.isLoadMoreShown = res.paging.total_pages > 1;
        this.opportunities = [...this.opportunities, ...res.data];
        this.markForCheck();
      }
    });
    this.markForCheck();
  }

  onItemDropColumn2(event: any) {
    const index = this.opportunities.findIndex((i: any) => i.id === event.dragData.id);
    if (index > - 1) {
      event.dragData.title = 'Moved to column 2';
      this._commonService.updateOpportunity(event.dragData.id, event.dragData).subscribe((res: any) => {
        if (res) {
          this.opportunities.splice(index, 1);
          this.columnTwoItems.push(event.dragData);
          this.markForCheck();
        }
      });
    }
    this.markForCheck();
  }

  onItemDropColumn3(event: any) {
    const index = this.opportunities.findIndex((i: any) => i.id === event.dragData.id);
    if (index > - 1) {
      event.dragData.title = 'Moved to column 3';
      this._commonService.updateOpportunity(event.dragData.id, event.dragData).subscribe((res: any) => {
        if (res) {
          this.opportunities.splice(index, 1);
          this.columnThreeItems.push(event.dragData);
          this.markForCheck();
        }
      });
    }
    this.markForCheck();
  }

  loadMore() {
    this._commonService.loadMoreOpportunities(this.pageOffset).subscribe((res: any) => {
      if (res) {
        this.pageOffset = res.paging.current_page;
        this.opportunities = [...this.opportunities, ...res.data];
        this.markForCheck();
      }
    });
    this.markForCheck();
  }

  ngOnDestroy() {
    if (this.subscriptions) {
      for (const [key, value] of Object.entries(this.subscriptions)) {
        if (value) {
          (value as ISubscription).unsubscribe();
        }
      }
    }
  }
}
