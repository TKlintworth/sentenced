// A store to keep track of the visible words in the sentence
import { writable } from 'svelte/store';

export const sentenceStore = writable([]);