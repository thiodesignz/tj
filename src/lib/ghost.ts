const GHOST_URL = process.env.GHOST_URL || "";
const GHOST_KEY = process.env.GHOST_CONTENT_API_KEY || "";

interface GhostPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  html: string | null;
  feature_image: string | null;
  published_at: string;
  reading_time: number;
  primary_tag: { name: string; slug: string } | null;
  primary_author: {
    name: string;
    profile_image: string | null;
  } | null;
}

interface GhostResponse {
  posts: GhostPost[];
  meta?: { pagination: { total: number; pages: number } };
}

async function ghostFetch(
  endpoint: string,
  params: Record<string, string> = {}
): Promise<GhostResponse> {
  const url = new URL(`${GHOST_URL}/ghost/api/content/${endpoint}/`);
  url.searchParams.set("key", GHOST_KEY);
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v);
  }

  const res = await fetch(url.toString(), { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`Ghost API error: ${res.status}`);
  return res.json();
}

export async function getPosts(limit = 20): Promise<GhostPost[]> {
  if (!GHOST_URL || !GHOST_KEY) return [];
  const data = await ghostFetch("posts", {
    limit: String(limit),
    include: "tags,authors",
    fields:
      "id,title,slug,excerpt,feature_image,published_at,reading_time",
  });
  return data.posts;
}

export async function getPostBySlug(
  slug: string
): Promise<GhostPost | null> {
  if (!GHOST_URL || !GHOST_KEY) return null;
  const data = await ghostFetch("posts/slug/" + slug, {
    include: "tags,authors",
  });
  return data.posts[0] || null;
}

export type { GhostPost };
