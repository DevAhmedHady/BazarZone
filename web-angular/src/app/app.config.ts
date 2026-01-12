import { ApplicationConfig, provideBrowserGlobalErrorListeners, importProvidersFrom } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Lara from '@primeng/themes/lara';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { LucideAngularModule, DollarSign, Users, ShoppingCart, TrendingUp, LayoutDashboard, BarChart3, Settings, Bell, MessageSquare, FileText, ChevronLeft, ChevronRight, ChevronUp, ChevronDown, ChevronsLeft, ChevronsRight, LogOut, User, Sun, Moon, Languages, Plus, Download, Upload, RefreshCw, ShoppingBag, CreditCard, AlertCircle, Sparkles, ArrowLeft, Menu, X, Lock, Shield, Eye, EyeOff, Trash2, Edit, Search, Key, CheckCircle, XCircle, Pencil, Mail, Check } from 'lucide-angular';
import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withInMemoryScrolling({
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
    })),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Lara,
        options: {
          darkModeSelector: '.dark-mode'
        }
      }
    }),
    provideCharts(withDefaultRegisterables()),
    importProvidersFrom(LucideAngularModule.pick({
      DollarSign, Users, ShoppingCart, TrendingUp, LayoutDashboard, BarChart3, Settings, Bell, MessageSquare, FileText, ChevronLeft, ChevronRight, ChevronUp, ChevronDown, ChevronsLeft, ChevronsRight, LogOut, User, Sun, Moon, Languages, Plus, Download, Upload, RefreshCw, ShoppingBag, CreditCard, AlertCircle, Sparkles, ArrowLeft, Menu, X, Lock, Shield, Eye, EyeOff, Trash2, Edit, Search, Key, CheckCircle, XCircle, Pencil, Mail, Check
    }))
  ]
};
