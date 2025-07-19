import React from "react";
import {
  FaAws,
  FaGithub,
  FaGoogle,
  FaYoutube,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaReddit,
  FaDiscord,
  FaHubspot,
  FaSlack,
  FaSpotify,
  FaAmazon,
  FaApple,
  FaMicrosoft,
  FaDropbox,
  FaTrello,
  FaPaypal,
  FaStripe,
  FaShopify,
  FaWordpress,
  FaWikipediaW,
  FaMedium,
  FaStackOverflow,
  FaCodepen,
  FaFigma,
  FaSkype,
  FaWhatsapp,
  FaTelegram,
  FaVimeo,
  FaTwitch,
  FaTiktok,
  FaPinterest,
  FaSnapchat,
  FaUber,
  FaAirbnb,
  FaEtsy,
  FaEbay,
} from "react-icons/fa";

import {
  SiGmail,
  SiZoom,
  SiNotion,
  SiAirtable,
  SiAsana,
  SiClickup,
  SiJira,
  SiConfluence,
  SiCanva,
  SiAdobe,
  SiDribbble,
  SiBehance,
  SiUnsplash,
  SiPexels,
  SiVercel,
  SiNetlify,
  SiHeroku,
  SiDigitalocean,
  SiGooglecloud,
  SiFirebase,
  SiSupabase,
  SiPlanetscale,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiStrapi,
  SiSanity,
  SiContentful,
  SiMailchimp,
  SiSendgrid,
  SiTwilio,
  SiIntercom,
  SiZendesk,
  SiSalesforce,
  SiGoogleanalytics,
  SiMixpanel,
  SiNetflix,
} from "react-icons/si";

import {
  IoGlobeOutline,
  IoMailOutline,
  IoShieldCheckmarkOutline,
  IoBagOutline,
  IoNewspaperOutline,
  IoSchoolOutline,
  IoGameControllerOutline,
  IoMusicalNotesOutline,
  IoFilmOutline,
  IoCameraOutline,
  IoFitnessOutline,
  IoRestaurantOutline,
  IoCarOutline,
  IoHomeOutline,
  IoAirplaneOutline,
  IoMedicalOutline,
} from "react-icons/io5";

import {
  MdDashboard,
  MdAnalytics,
  MdSecurity,
  MdCloudQueue,
  MdDeveloperMode,
} from "react-icons/md";
import { PiMicrosoftOutlookLogoFill } from "react-icons/pi";
import { VscAzure } from "react-icons/vsc";
import { FaHotjar, FaXTwitter } from "react-icons/fa6";
import { GiAmplitude } from "react-icons/gi";

// Type definitions
type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

interface IconProps extends React.SVGProps<SVGSVGElement> {
  url: string;
  size?: number;
  className?: string;
}

// Icon mapping by domain
const DOMAIN_ICON_MAP: Record<string, IconComponent> = {
  // Social Media
  "github.com": FaGithub,
  "google.com": FaGoogle,
  "youtube.com": FaYoutube,
  "youtu.be": FaYoutube,
  "twitter.com": FaXTwitter,
  "x.com": FaXTwitter,
  "facebook.com": FaFacebook,
  "instagram.com": FaInstagram,
  "linkedin.com": FaLinkedin,
  "reddit.com": FaReddit,
  "discord.com": FaDiscord,
  "discord.gg": FaDiscord,
  "tiktok.com": FaTiktok,
  "pinterest.com": FaPinterest,
  "snapchat.com": FaSnapchat,

  // Email & Communication
  "gmail.com": SiGmail,
  "mail.google.com": SiGmail,
  "outlook.com": PiMicrosoftOutlookLogoFill,
  "outlook.live.com": PiMicrosoftOutlookLogoFill,
  "office.com": FaMicrosoft,
  "zoom.us": SiZoom,
  "slack.com": FaSlack,
  "skype.com": FaSkype,
  "whatsapp.com": FaWhatsapp,
  "telegram.org": FaTelegram,
  "web.whatsapp.com": FaWhatsapp,

  // Productivity & Work
  "notion.so": SiNotion,
  "airtable.com": SiAirtable,
  "asana.com": SiAsana,
  "clickup.com": SiClickup,
  "atlassian.com": SiJira,
  "jira.atlassian.com": SiJira,
  "confluence.atlassian.com": SiConfluence,
  "trello.com": FaTrello,
  "dropbox.com": FaDropbox,

  // Design & Creative
  "figma.com": FaFigma,
  "canva.com": SiCanva,
  "adobe.com": SiAdobe,
  "dribbble.com": SiDribbble,
  "behance.net": SiBehance,
  "unsplash.com": SiUnsplash,
  "pexels.com": SiPexels,
  "codepen.io": FaCodepen,

  // Streaming & Entertainment
  "netflix.com": SiNetflix,
  "spotify.com": FaSpotify,
  "twitch.tv": FaTwitch,
  "vimeo.com": FaVimeo,

  // E-commerce & Shopping
  "amazon.com": FaAmazon,
  "ebay.com": FaEbay,
  "etsy.com": FaEtsy,
  "shopify.com": FaShopify,
  "stripe.com": FaStripe,
  "paypal.com": FaPaypal,

  // Tech Companies
  "apple.com": FaApple,
  "microsoft.com": FaMicrosoft,
  "vercel.com": SiVercel,
  "netlify.com": SiNetlify,
  "heroku.com": SiHeroku,
  "digitalocean.com": SiDigitalocean,
  "aws.amazon.com": FaAws,
  "console.aws.amazon.com": FaAws,
  "cloud.google.com": SiGooglecloud,
  "azure.microsoft.com": VscAzure,
  "firebase.google.com": SiFirebase,
  "supabase.com": SiSupabase,

  // Databases
  "mongodb.com": SiMongodb,
  "postgresql.org": SiPostgresql,
  "redis.io": SiRedis,
  "planetscale.com": SiPlanetscale,

  // CMS & Content
  "wordpress.com": FaWordpress,
  "wordpress.org": FaWordpress,
  "strapi.io": SiStrapi,
  "sanity.io": SiSanity,
  "contentful.com": SiContentful,
  "medium.com": FaMedium,
  "wikipedia.org": FaWikipediaW,

  // Developer Tools
  "stackoverflow.com": FaStackOverflow,
  "stackexchange.com": FaStackOverflow,

  // Marketing & Analytics
  "mailchimp.com": SiMailchimp,
  "sendgrid.com": SiSendgrid,
  "twilio.com": SiTwilio,
  "intercom.com": SiIntercom,
  "zendesk.com": SiZendesk,
  "hubspot.com": FaHubspot,
  "salesforce.com": SiSalesforce,
  "analytics.google.com": SiGoogleanalytics,
  "hotjar.com": FaHotjar,
  "mixpanel.com": SiMixpanel,
  "amplitude.com": GiAmplitude,

  // Travel & Services
  "uber.com": FaUber,
  "airbnb.com": FaAirbnb,
} as const;

// Category-based fallbacks for unknown domains
const CATEGORY_ICON_MAP: Record<string, IconComponent> = {
  // Common TLDs and patterns
  ".edu": IoSchoolOutline,
  ".gov": IoShieldCheckmarkOutline,
  ".org": IoGlobeOutline,
  ".news": IoNewspaperOutline,
  ".store": IoBagOutline,
  ".shop": IoBagOutline,
  ".blog": IoNewspaperOutline,

  // Content patterns
  mail: IoMailOutline,
  email: IoMailOutline,
  shop: IoBagOutline,
  store: IoBagOutline,
  news: IoNewspaperOutline,
  blog: IoNewspaperOutline,
  game: IoGameControllerOutline,
  music: IoMusicalNotesOutline,
  video: IoFilmOutline,
  photo: IoCameraOutline,
  fitness: IoFitnessOutline,
  health: IoMedicalOutline,
  food: IoRestaurantOutline,
  travel: IoAirplaneOutline,
  car: IoCarOutline,
  home: IoHomeOutline,
  dashboard: MdDashboard,
  analytics: MdAnalytics,
  security: MdSecurity,
  cloud: MdCloudQueue,
  api: MdDeveloperMode,
  dev: MdDeveloperMode,
} as const;

/**
 * Get domain from URL
 */
const getDomainFromUrl = (url: string): string => {
  try {
    return new URL(url).hostname.replace("www.", "").toLowerCase();
  } catch {
    return url.toLowerCase();
  }
};

/**
 * Get icon component for a given URL
 */
export const getIconForUrl = (
  url: string | null | undefined
): IconComponent => {
  if (!url) return IoGlobeOutline;

  const domain = getDomainFromUrl(url);

  // Direct domain match
  if (DOMAIN_ICON_MAP[domain]) {
    return DOMAIN_ICON_MAP[domain];
  }

  // Check for subdomain matches (e.g., docs.github.com -> github.com)
  const mainDomain = domain.split(".").slice(-2).join(".");
  if (DOMAIN_ICON_MAP[mainDomain]) {
    return DOMAIN_ICON_MAP[mainDomain];
  }

  // Category-based matching
  for (const [pattern, IconComponent] of Object.entries(CATEGORY_ICON_MAP)) {
    if (domain.includes(pattern) || url.toLowerCase().includes(pattern)) {
      return IconComponent;
    }
  }

  // Default fallback
  return IoGlobeOutline;
};

/**
 * Get icon as React component
 */
export const IconComponent: React.FC<IconProps> = ({
  url,
  size = 20,
  className = "",
  ...props
}) => {
  const IconToRender = getIconForUrl(url);

  return React.createElement(IconToRender, {
    width: size,
    height: size,
    className,
    ...props,
  });
};

/**
 * Get icon name/identifier for storage
 */
export const getIconIdentifier = (url: string | null | undefined): string => {
  const IconComponentToUse = getIconForUrl(url);
  return IconComponentToUse.displayName || IconComponentToUse.name || "globe";
};

/**
 * Check if a domain has a specific icon mapping
 */
export const hasCustomIcon = (url: string | null | undefined): boolean => {
  if (!url) return false;

  const domain = getDomainFromUrl(url);
  const mainDomain = domain.split(".").slice(-2).join(".");
  return !!(DOMAIN_ICON_MAP[domain] || DOMAIN_ICON_MAP[mainDomain]);
};

/**
 * Get all available domain mappings (for debugging/admin)
 */
export const getAvailableDomains = (): string[] => {
  return Object.keys(DOMAIN_ICON_MAP).sort();
};

export default IconComponent;
