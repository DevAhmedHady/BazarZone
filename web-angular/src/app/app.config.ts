import { ApplicationConfig, provideBrowserGlobalErrorListeners, importProvidersFrom } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { definePreset } from '@primeng/themes';
import Lara from '@primeng/themes/lara';

const BazarZonePreset = definePreset(Lara, {
  primitive: {
    amber: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
      950: '#451a03'
    }
  },
  semantic: {
    primary: {
      50: '{amber.50}',
      100: '{amber.100}',
      200: '{amber.200}',
      300: '{amber.300}',
      400: '{amber.400}',
      500: '{amber.500}',
      600: '{amber.600}',
      700: '{amber.700}',
      800: '{amber.800}',
      900: '{amber.900}',
      950: '{amber.950}'
    },
    colorScheme: {
      light: {
        surface: {
          0: '#ffffff',
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712'
        }
      },
      dark: {
        surface: {
          0: '#ffffff',
          50: '#1a1d23',
          100: '#20242b',
          200: '#2b313b',
          300: '#3d4554',
          400: '#525d70',
          500: '#68758b',
          600: '#848fa5',
          700: '#a3abc0',
          800: '#c2c8d8',
          900: '#e1e4ed',
          950: '#f0f2f7'
        }
      }
    }
  }
});

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
        preset: BazarZonePreset,
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
