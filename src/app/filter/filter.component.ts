import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {ClearCompleted} from '../store/actions';
import {TodoState} from '../store/state';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html'
})
export class FilterComponent implements OnInit, OnDestroy {

  countTodos: number;
  showFooter: boolean;
  @Select(TodoState.getTodos) todos$;
  @Select(TodoState.getFilter) currentFilter$;
  // @Select(TodoState.getTest('yo')) curren$;
  subs;

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.subs = this.todos$.subscribe(todos => {
      this.countTodos = todos.filter(t => !t.completed).length;
      this.showFooter = todos.length > 0;
    });
  }

  clearCompleted() {
    this.store.dispatch(new ClearCompleted());
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
