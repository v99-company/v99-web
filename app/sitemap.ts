// app/sitemap.ts
import { MetadataRoute } from 'next'

interface APIResponse {
  status: string;
  count: number;
  ids: number[];
}

async function getDynamicPaths() {
  try {
    const response = await fetch('https://v99.in/api/ids');
    if (!response.ok) {
      throw new Error('Failed to fetch IDs');
    }
    const result = await response.json();
    
    // Extract IDs from your API response structure
    if (result.data && result.data.status === 'success') {
      return result.data.ids;
    }
    return [];
  } catch (error) {
    console.error('Error fetching dynamic paths:', error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://v99.in'

  // Static routes from your navbar
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ] as MetadataRoute.Sitemap

  try {
    // Get dynamic paths from your API
    const dynamicPaths = await getDynamicPaths()
    
    // Create sitemap entries for dynamic routes
    const dynamicRoutes = dynamicPaths.map((id: string) => ({
      url: `${baseUrl}/${id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    })) as MetadataRoute.Sitemap

    // Combine static and dynamic routes
    return [...staticRoutes, ...dynamicRoutes]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    // Return only static routes if dynamic route generation fails
    return staticRoutes
  }
}