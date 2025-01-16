import { Routes } from '@angular/router';
import { CartComponent } from './routes/cart/cart.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { MasterLayoutComponent } from './layout/master-layout/master-layout.component';
import { LabDashboardComponent } from './routes/lab-dashboard/lab-dashboard.component';
import { SigninComponent } from './authentication/signin/signin.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { SignupDetailsComponent } from './authentication/signup-details/signup-details.component';
import { OtpSubmitionComponent } from './authentication/otp-submition/otp-submition.component';

export const routes: Routes = [
    { path: 'cart', component: CartComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'signupdetails', component: SignupDetailsComponent },
    { path: 'otp', component: OtpSubmitionComponent },
    {
        path: '',
        component: MasterLayoutComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'lab', component: LabDashboardComponent },
        ]
    }
];
