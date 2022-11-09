import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddpostComponent } from './components/pages/addpost/addpost.component';
import { DetailpostComponent } from './components/pages/detailpost/detailpost.component';
import { EditpostComponent } from './components/pages/editpost/editpost.component';
import { HomeComponent } from './components/pages/home/home.component';
import { SobreComponent } from './components/pages/sobre/sobre.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'home', component: HomeComponent, 
  },
  {
    path: 'about', component: SobreComponent,
  },
  {
    path: 'add', component: AddpostComponent,
  },
  {
    path: 'detail/:id', component: DetailpostComponent
  },
  {
    path: 'editar/:id', component: EditpostComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
