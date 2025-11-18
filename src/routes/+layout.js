import posthog from "posthog-js";
import { browser } from "$app/environment";
import { onMount } from "svelte";

export const load = async () => {
  if (browser) {
    posthog.init("phc_G9D50T5R9NiLHXIOkfzp3GqB8YkOVdR554ad2xIkgQm", {
      api_host: "https://eu.i.posthog.com",
      defaults: "2025-05-24",
      person_profiles: "identified_only", // or 'always' to create profiles for anonymous users as well
    });
  }

  return;
};
