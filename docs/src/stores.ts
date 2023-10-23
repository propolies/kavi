import { writable } from "svelte/store";
import type { Sub, Section } from "./types";

export const showSidebar = writable(false)
export const selected = writable<Sub>("Get started")
export const item = writable<Section>("Setup")