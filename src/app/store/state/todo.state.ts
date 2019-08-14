import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Todo } from '../models';
import { AddTodo, ToggleTodo, ClearCompleted, CompletedAll, DeleteTodo, UpdateTodo, SetFilter } from '../actions';


export class TodoStateModel {
  filter: string;
  todos: Todo[];
}

@State<TodoStateModel>({
  name: 'todos',
  defaults: {
    filter: 'SHOW_ALL',
    todos: []
  }
})

export class TodoState {

  @Selector()
  static getTodos(state: TodoStateModel) {
    return state.todos;
  }

  @Selector()
  static getFilter(state: TodoStateModel) {
    return state.filter;
  }

  @Selector()
  static getVisibleTodos(state: TodoStateModel) {
    if (state.filter === 'show-all') {
      return state.todos;
    } else if (state.filter === 'show-completed') {
      return state.todos.filter(t => t.completed);
    } else if (state.filter === 'show-active') {
      return state.todos.filter(t => !t.completed);
    }
  }

  @Selector()
  static getStateCompleted(state: TodoStateModel) {
    return state.todos.every(todo => todo.completed);
  }

  @Action(AddTodo)
  add({getState, patchState}: StateContext<TodoStateModel>, {payload}: AddTodo) {
    patchState({
      todos: [...getState().todos, {id: Math.random(), text: payload, completed: false}]
    });
  }

  @Action(ToggleTodo)
  toggle({getState, patchState}: StateContext<TodoStateModel>, {payload}: ToggleTodo) {
    patchState({
      todos: getState().todos.map(td => {
        if (td.id === payload) {
          td.completed = !td.completed;
        }
        return td;
      })
    });
  }

  @Action(DeleteTodo)
  delete({getState, patchState}: StateContext<TodoStateModel>, {payload}: DeleteTodo) {
    patchState({
      todos: getState().todos.filter(td => td.id !== payload)
    });
  }

  @Action(UpdateTodo)
  update({getState, patchState}: StateContext<TodoStateModel>, {payload}: UpdateTodo) {
    patchState({
      todos: getState().todos.map(td => {
        if (td.id === payload.id) {
          td.text = payload.text;
        }
        return td;
      })
    });
  }

  @Action(ClearCompleted)
  clear({getState, patchState}: StateContext<TodoStateModel>) {
    patchState({
      todos: getState().todos.filter(td => !td.completed)
    });
  }

  @Action(CompletedAll)
  complete({getState, patchState}: StateContext<TodoStateModel>) {
    patchState({
      todos: getState().todos.map(td => {
        td.completed = true;
        return td;
      })
    });
  }

  @Action(SetFilter)
  filter({patchState}: StateContext<TodoStateModel>, {payload}: SetFilter) {
    patchState({
      filter: payload
    });
  }
}
