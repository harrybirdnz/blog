import posthog from "posthog-js";
import { browser } from "$app/environment";
import { onMount } from "svelte";
import { PUBLIC_POSTHOG_API_KEY } from "$env/static/public";

export const load = async () => {
  if (browser) {
    posthog.init(PUBLIC_POSTHOG_API_KEY, {
      api_host: "https://eu.i.posthog.com",
      defaults: "2025-05-24",
      person_profiles: "identified_only", // or 'always' to create profiles for anonymous users as well
    });
  }

  return;
};
