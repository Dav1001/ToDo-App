import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { FilterComponent } from './filter/filter.component';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {NgxsModule} from '@ngxs/store';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import { TodoListComponent } from './todo-list/todo-list.component';
import {TodoState} from './store/state/todo.state';
import { TodoComponent } from './todo/todo.component';

const routes: Routes = [
  // basic routes
  {path: '', component: TodoListComponent, pathMatch: 'full'},
  {path: ':filter', component: TodoListComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    AddTodoComponent,
    FilterComponent,
    TodoListComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    NgxsModule.forRoot([TodoState]),
    NgxsReduxDevtoolsPluginModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
