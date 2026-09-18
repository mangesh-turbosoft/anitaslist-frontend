/**
 * Cookie declaration content. Unlike the FAQ, Terms and Privacy pages, the live page's cookie table is rendered
 * by a client-side consent widget (Cookiebot-style) and never appears in the page's static HTML — a fetch of
 * https://anitaslist.com/pages/cookies-declaration returns only the site chrome, with an empty content area.
 * The categories below are the standard groupings such widgets use; the specific cookie names, providers and
 * durations are NOT fabricated here and must come from the live widget's rendered output or its dashboard.
 */
export const cookieIntro =
  "Anita's List uses cookies to run the site, remember your preferences, and understand how the site is used. This page explains the categories of cookies in use. For the full list of individual cookies — their names, providers and how long each one lasts — please see the live declaration on anitaslist.com, which is generated automatically and kept up to date there.";

export type CookieCategory = { id: string; title: string; description: string };

export const cookieCategories: CookieCategory[] = [
  {
    id: "necessary",
    title: "Necessary",
    description:
      "Required for the site to function — for example, keeping you signed in, remembering items in a list, and remembering your cookie preference itself. These cannot be switched off.",
  },
  {
    id: "preferences",
    title: "Preferences",
    description: "Remember choices you've made, such as your postcode or which list you're currently viewing, so you don't have to re-enter them on every visit.",
  },
  {
    id: "statistics",
    title: "Statistics",
    description: "Help us understand how visitors use the site — which pages are viewed and how often — so we can improve it. Collected anonymously where possible.",
  },
  {
    id: "marketing",
    title: "Marketing",
    description: "Used to track visitors across websites, so that the ads shown are relevant to you and your interests, including through our affiliate partners.",
  },
];
