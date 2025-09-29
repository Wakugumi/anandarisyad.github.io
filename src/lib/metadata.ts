// Server-side metadata fetching utility
// This can be used in production with proper CORS handling

export interface MetadataResult {
  url: string;
  title?: string;
  description?: string;
  image?: string;
  siteName?: string;
  favicon?: string;
  type?: string;
}

export class LinkPreviewService {
  private static cache = new Map<string, MetadataResult>();
  
  static async fetchMetadata(url: string): Promise<MetadataResult> {
    // Check cache first
    if (this.cache.has(url)) {
      return this.cache.get(url)!;
    }

    try {
      
      const result = await this.mockFetchMetadata(url);
      
      // Cache the result
      this.cache.set(url, result);
      
      return result;
    } catch (error) {
      console.error('Failed to fetch metadata for:', url, error);
      return this.getFallbackMetadata(url);
    }
  }

  private static async mockFetchMetadata(url: string): Promise<MetadataResult> {
    const domain = new URL(url).hostname;
    
    // Enhanced predefined metadata for common sites
    // Faster and more reliable than live fetching
    // Expand this list as needed
    const sitePresets: Record<string, Partial<MetadataResult>> = {
      'github.com': {
        siteName: 'GitHub',
        favicon: 'https://github.com/favicon.ico',
        type: 'repository'
      },
      'linkedin.com': {
        siteName: 'LinkedIn', 
        favicon: 'https://static.licdn.com/favicon.ico',
        type: 'profile'
      },
      'youtube.com': {
        siteName: 'YouTube',
        favicon: 'https://youtube.com/favicon.ico',
        type: 'video'
      },
      'vercel.app': {
        siteName: 'Vercel',
        favicon: 'https://vercel.com/favicon.ico',
        type: 'demo'
      },
      'netlify.app': {
        siteName: 'Netlify',
        favicon: 'https://netlify.com/favicon.ico',
        type: 'demo'
      },
      'herokuapp.com': {
        siteName: 'Heroku',
        favicon: 'https://heroku.com/favicon.ico',
        type: 'demo'
      },
      'codesandbox.io': {
        siteName: 'CodeSandbox',
        favicon: 'https://codesandbox.io/favicon.ico',
        type: 'sandbox'
      },
      'codepen.io': {
        siteName: 'CodePen',
        favicon: 'https://codepen.io/favicon.ico',
        type: 'demo'
      }
    };

    const preset = sitePresets[domain] || {};
    
    // Simulate API delay, just for coolness
    await new Promise(resolve => setTimeout(resolve, 100));

    return {
      url,
      title: preset.siteName || this.extractTitleFromUrl(url),
      description: this.getDescriptionByType(preset.type || 'website'),
      siteName: preset.siteName || domain,
      favicon: preset.favicon || `https://www.google.com/s2/favicons?domain=${domain}&sz=32`,
      type: preset.type || 'website',
      ...preset
    };
  }

  private static extractTitleFromUrl(url: string): string {
    try {
      const urlObj = new URL(url);
      const path = urlObj.pathname;
      
      if (path.includes('/')) {
        const segments = path.split('/').filter(Boolean);
        if (segments.length > 0) {
          return segments[segments.length - 1]
            .replace(/[-_]/g, ' ')
            .replace(/\b\w/g, l => l.toUpperCase());
        }
      }
      
      return urlObj.hostname.replace('www.', '');
    } catch {
      return 'External Link';
    }
  }

  private static getDescriptionByType(type: string): string {
    const descriptions: Record<string, string> = {
      repository: 'Source code repository with documentation and examples',
      profile: 'Professional profile and work experience',
      video: 'Video content and tutorials',
      demo: 'Live demonstration of the project in action',
      sandbox: 'Interactive code playground and examples',
      website: 'External website with additional information'
    };
    
    return descriptions[type] || 'Visit link for more information';
  }

  private static getFallbackMetadata(url: string): MetadataResult {
    const domain = new URL(url).hostname.replace('www.', '');
    
    return {
      url,
      title: domain,
      description: `Visit ${domain} for more information`,
      siteName: domain,
      favicon: `https://www.google.com/s2/favicons?domain=${domain}&sz=32`
    };
  }

  static async preloadMetadata(urls: string[]): Promise<void> {
    const promises = urls.map(url => this.fetchMetadata(url));
    await Promise.allSettled(promises);
  }

  // Clear cache if needed
  static clearCache(): void {
    this.cache.clear();
  }
}

export class ProductionLinkPreviewService {
  private static readonly API_KEY = process.env.LINK_PREVIEW_API_KEY;
  private static readonly API_URL = 'https://api.linkpreview.net';

  static async fetchMetadata(url: string): Promise<MetadataResult> {
    if (!this.API_KEY) {
      console.warn('No Link Preview API key provided, using fallback');
      return LinkPreviewService.fetchMetadata(url);
    }

    try {
      const response = await fetch(`${this.API_URL}/?key=${this.API_KEY}&q=${encodeURIComponent(url)}`);
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      
      return {
        url,
        title: data.title,
        description: data.description,
        image: data.image,
        siteName: data.site_name || new URL(url).hostname,
        favicon: data.favicon
      };
    } catch (error) {
      console.error('Production API failed, using fallback:', error);
      return LinkPreviewService.fetchMetadata(url);
    }
  }
}

export const MetadataService = process.env.NODE_ENV === 'production' 
  ? ProductionLinkPreviewService 
  : LinkPreviewService;