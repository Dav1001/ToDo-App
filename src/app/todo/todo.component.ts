import {Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Todo} from '../store/models';
import {Store} from '@ngxs/store';
import {DeleteTodo, ToggleTodo, UpdateTodo} from '../store/actions';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html'
})
export class TodoComponent implements OnInit {

  @Input() todo: Todo;
  @ViewChild('textInput') textInput: ElementRef;
  textField: FormControl;
  checkField: FormControl;
  editing: boolean;

  constructor(private store: Store) {
    this.textField = new FormControl('', [Validators.required]);
    this.checkField = new FormControl(false);
    this.checkField.valueChanges
      .subscribe(state => {
        this.store.dispatch(new ToggleTodo(this.todo.id));
      });
  }

  ngOnInit() {
    this.textField.setValue(this.todo.text);
    this.checkField.setValue(this.todo.completed, {emitEvent: false});
  }

  updateText() {
    if (this.textField.valid && this.editing) {
      const id = this.todo.id;
      const newText: string = this.textField.value;
      this.store.dispatch(new UpdateTodo({id: id, text: newText.trim()}));
      this.editing = false;
    }
  }

  activeEditMode() {
    this.editing = true;
    setTimeout(() => {
      this.textInput.nativeElement.focus();
    });
  }

  deleteTodo() {
    this.store.dispatch(new DeleteTodo(this.todo.id));
  }

}
