/**
 * Converts a kebab-case Pokémon name (e.g., "mr-mime") into a properly
 * capitalized name with spaces (e.g., "Mr Mime").
 *
 * @param name - The kebab-case name to format (typically from an API or URL slug).
 * @returns A string with each word capitalized and separated by spaces.
 *
 */
export function formatPokemonName(name: string): string {
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}


/**
 * Converts a raw Pokémon stat value into a normalized width percentage
 * for stat bars. Caps at 100%.
 *
 * @param statValue - The raw stat value (e.g. 120).
 * @param maxValue - The maximum possible stat value (theoretical max pokemon stat value is 255).
 * @returns A CSS-friendly width string like "47.1%"
 *
 */
export function getStatBarWidth(statValue: number, maxValue = 255): string {
  const percentage = (statValue / maxValue) * 100;
  return `${Math.min(100, percentage)}%`;
}
