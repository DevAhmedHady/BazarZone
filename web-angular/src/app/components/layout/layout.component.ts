import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { VisitorSubscriptionComponent } from '../visitor-subscription/visitor-subscription.component';

@Component({
    selector: 'app-layout',
    standalone: true,
    imports: [RouterOutlet, NavbarComponent, FooterComponent, VisitorSubscriptionComponent],
    templateUrl: './layout.component.html',
})
export class LayoutComponent { }
