import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Paginator } from 'primeng/paginator';

@Component({
  selector: 'app-paginator',
  standalone: false,
  templateUrl: './paginator.component.html',
})

export class AppPaginatorComponent {
  @Input() first: number = 0;
  @Input() currentPage: number = 1;
  @Input() rows: number = 20;
  @Input() totalRecords: number = 20;
  @Input() alwaysShow: boolean = true;
  @Input() isReset: boolean = false;
  @Input() resetEvent: any = null;
  @Input() dropdownAppendTo: string = '';
  @Output() onPageChange = new EventEmitter();

  @ViewChild('paginator', { static: false }) paginator!: Paginator;

  constructor() { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isReset']) {
      if (changes['isReset'].currentValue && changes['isReset'].currentValue !== changes['isReset'].previousValue) {
        this.isReset = changes['isReset'].currentValue;
        if (this.isReset && this.paginator) {
          if (this.resetEvent) this.paginator.changePageToFirst(this.resetEvent);
          if (!this.resetEvent) {
            setTimeout(() => {
              this.paginator.changePage(0);
            }, 0);
          }
        }
      }
    }
  }

  paginate(event: any) {
    this.currentPage = event.page + 1;
    this.onPageChange.emit(event);
  }
}
