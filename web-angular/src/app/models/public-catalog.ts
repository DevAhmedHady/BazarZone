export interface PublicProduct {
    id: string;
    serviceProviderId: string;
    name: string;
    description?: string;
    imageUrl?: string;
    price?: number;
    facebookUrl?: string;
    instagramUrl?: string;
    twitterUrl?: string;
    linkedInUrl?: string;
}

export interface PublicProvider {
    id: string;
    name: string;
    tagline?: string;
    description?: string;
    logoUrl?: string;
    category?: string;
    websiteUrl?: string;
    color: string;
    products: PublicProduct[];
    facebookUrl?: string;
    instagramUrl?: string;
    twitterUrl?: string;
    linkedInUrl?: string;
}
