import { Component, Input, computed, input } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20",
                destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                outline: "border border-border bg-transparent hover:bg-secondary hover:text-foreground",
                secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                ghost: "hover:bg-secondary hover:text-foreground",
                link: "text-primary underline-offset-4 hover:underline",
                gold: "bg-gradient-to-r from-primary to-accent text-primary-foreground hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5",
                glass: "bg-foreground/5 backdrop-blur-md border border-foreground/10 text-foreground hover:bg-foreground/10 hover:border-primary/30",
            },
            size: {
                default: "h-10 px-5 py-2",
                sm: "h-9 rounded-md px-4",
                lg: "h-12 rounded-lg px-8 text-base",
                xl: "h-14 rounded-xl px-10 text-lg",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;

@Component({
    selector: 'button[appButton], a[appButton]',
    standalone: true,
    imports: [],
    template: '<ng-content />',
    host: {
        '[class]': 'classes()'
    }
})
export class ButtonComponent {
    readonly variant = input<ButtonVariants['variant']>('default');
    readonly size = input<ButtonVariants['size']>('default');
    readonly class = input<string>('');

    readonly classes = computed(() => {
        return cn(buttonVariants({ variant: this.variant(), size: this.size(), className: this.class() }));
    });
}
