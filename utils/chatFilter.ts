const badWords = [
  // English
  "fuck", "shit", "bitch", "asshole", "dick", "pussy", "cunt", "motherfucker", "whore", "slut",
  "bastard", "crap",
  
  // Portuguese
  "porra", "caralho", "buceta", "puta", "viado", "corno", "merda", "cu", "cacete", "foda",
  "foder", "babaca", "otário", "otario", "escroto", "arrombado", "piranha", "rapariga"
];

export function censorText(text: string): string {
  let censored = text;
  
  badWords.forEach(word => {
    // Regex for word boundary, case-insensitive
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    
    // Replace with asterisks of the same length
    censored = censored.replace(regex, (match) => '*'.repeat(match.length));
  });
  
  return censored;
}
