import { ApplicationConfig, provideBrowserGlobalErrorListeners, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { LucideAngularModule, DollarSign, Users, ShoppingCart, TrendingUp, LayoutDashboard, BarChart3, Settings, Bell, MessageSquare, FileText, ChevronLeft, ChevronRight, LogOut, User, Sun, Moon, Languages, ChevronDown, Plus, Download, Upload, RefreshCw, ShoppingBag, CreditCard, AlertCircle, Sparkles, ArrowLeft, Menu, X } from 'lucide-angular';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideCharts(withDefaultRegisterables()),
    importProvidersFrom(LucideAngularModule.pick({
      DollarSign, Users, ShoppingCart, TrendingUp, LayoutDashboard, BarChart3, Settings, Bell, MessageSquare, FileText, ChevronLeft, ChevronRight, LogOut, User, Sun, Moon, Languages, ChevronDown, Plus, Download, Upload, RefreshCw, ShoppingBag, CreditCard, AlertCircle, Sparkles, ArrowLeft, Menu, X
    }))
  ]
};
