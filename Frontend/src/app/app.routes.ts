import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { JournalsComponent } from './components/journals/journals.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { CreateEntryComponent } from './components/dashboard/create-entry/create-entry.component';
import { EditEntryComponent } from './components/dashboard/edit-entry/edit-entry.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'about', component: AboutComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'journal', component: JournalsComponent, canActivate: [authGuard] },
    { path: 'dashboard', component: DashboardComponent, children: [
        { path: 'dashboard/journals', component: JournalsComponent },
        { path: 'dashboard/create-new', component: CreateEntryComponent },
        { path: 'dashboard/edit', component: EditEntryComponent },
        { path: '', redirectTo: 'my-journal', pathMatch: 'full' },
      ], canActivate: [authGuard] },
   

    { path: 'dashboard', component: DashboardComponent, 
    },

 { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirect to login by default
 { path: 'dashboard/journals', component: JournalsComponent, canActivate: [authGuard] }
];
