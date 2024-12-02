import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepositoriesViewComponent } from './views/repositories-view/repositories-view.component';

const routes: Routes = [
	{ path: '', redirectTo: 'repositories', pathMatch: 'full' },
	{ path: 'repositories', component: RepositoriesViewComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
