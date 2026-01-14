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
import { LoginComponent } from './pages/login/login.component';
import { UserManagementComponent } from './pages/admin/user-management/user-management.component';
import { RoleManagementComponent } from './pages/admin/role-management/role-management.component';
import { CatalogHomeComponent } from './pages/catalog/home/catalog-home.component';
import { ProviderDetailComponent } from './pages/catalog/provider-detail/provider-detail.component';
import { ProviderManagementComponent } from './pages/admin/catalog/provider-management/provider-management.component';
import { ServiceManagementComponent } from './pages/admin/catalog/service-management/service-management.component';
import { ProductManagementComponent } from './pages/admin/catalog/product-management/product-management.component';
import { ContentManagementComponent } from './pages/admin/content-management/content-management.component';
import { authGuard, adminGuard } from './guards/auth.guard';

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
            { path: 'catalog', component: CatalogHomeComponent },
            { path: 'catalog/:id', component: ProviderDetailComponent },
        ]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'admin',
        component: AdminLayoutComponent,
        canActivate: [authGuard],
        children: [
            { path: '', component: AdminComponent },
            { path: 'users', component: UserManagementComponent, canActivate: [adminGuard] },
            { path: 'roles', component: RoleManagementComponent, canActivate: [adminGuard] },
            { path: 'catalog/providers', component: ProviderManagementComponent, canActivate: [adminGuard] },
            { path: 'catalog/services', component: ServiceManagementComponent, canActivate: [adminGuard] },
            { path: 'catalog/products', component: ProductManagementComponent, canActivate: [adminGuard] },
            { path: 'content', component: ContentManagementComponent, canActivate: [adminGuard] }
        ]
    },
    { path: '**', component: NotFoundComponent }
];
