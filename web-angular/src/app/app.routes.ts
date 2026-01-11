import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { IndexComponent } from './pages/index/index.component';
import { AdminLayoutComponent } from './components/layout/admin-layout.component';
import { AdminComponent } from './pages/admin/admin.component';
import { BrandBoothComponent } from './pages/brand-booth/brand-booth';
import { ProductDetailComponent } from './pages/product-detail/product-detail';
import { AboutComponent } from './pages/about/about';
import { ContactComponent } from './pages/contact/contact';
import { NotFoundComponent } from './pages/not-found/not-found';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', component: IndexComponent },
            { path: 'brand/:id', component: BrandBoothComponent },
            { path: 'product/:id', component: ProductDetailComponent },
            { path: 'about', component: AboutComponent },
            { path: 'contact', component: ContactComponent },
        ]
    },
    {
        path: 'admin',
        component: AdminLayoutComponent,
        children: [
            { path: '', component: AdminComponent }
        ]
    },
    { path: '**', component: NotFoundComponent }
];
