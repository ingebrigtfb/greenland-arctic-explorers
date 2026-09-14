import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-metadata";

const DISALLOW = ["/admin", "/api", "/booking/confirmation"];

/**
 * Answer-engine and training crawlers, named explicitly.
 *
 * A `User-agent: *` block already permits these, but several operators document
 * per-agent rules and some publishers block them by default — naming each one
 * with an explicit Allow removes any ambiguity about whether GAX content may be
 * retrieved and cited.
 */
const AI_AGENTS = [
  "GPTBot", // OpenAI, training
  "OAI-SearchBot", // OpenAI, ChatGPT search results
  "ChatGPT-User", // OpenAI, user-initiated browsing
  "ClaudeBot", // Anthropic, training
  "Claude-User", // Anthropic, user-initiated browsing
  "Claude-SearchBot", // Anthropic, search indexing
  "PerplexityBot", // Perplexity, indexing
  "Perplexity-User", // Perplexity, user-initiated browsing
  "Google-Extended", // Google, Gemini grounding
  "CCBot", // Common Crawl
  "Applebot-Extended", // Apple Intelligence
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: DISALLOW },
      ...AI_AGENTS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: DISALLOW,
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
