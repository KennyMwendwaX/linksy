// Fractional ordering utility
export function fractionalOrder(before?: string, after?: string): string {
  if (!before && !after) {
    return "n"; // Middle character
  }

  if (!before) {
    return generateBefore(after!);
  }

  if (!after) {
    return generateAfter(before);
  }

  return generateBetween(before, after);
}

function generateBefore(after: string): string {
  const firstChar = after.charAt(0);
  if (firstChar > "a") {
    return String.fromCharCode(firstChar.charCodeAt(0) - 1);
  }
  return "a" + "n";
}

function generateAfter(before: string): string {
  const lastChar = before.charAt(before.length - 1);
  if (lastChar < "z") {
    return (
      before.slice(0, -1) + String.fromCharCode(lastChar.charCodeAt(0) + 1)
    );
  }
  return before + "n";
}

function generateBetween(before: string, after: string): string {
  const maxLen = Math.max(before.length, after.length);
  const beforePadded = before.padEnd(maxLen, "a");
  const afterPadded = after.padEnd(maxLen, "z");

  for (let i = 0; i < maxLen; i++) {
    const beforeChar = beforePadded.charCodeAt(i);
    const afterChar = afterPadded.charCodeAt(i);

    if (afterChar - beforeChar > 1) {
      const midChar = Math.floor((beforeChar + afterChar) / 2);
      return beforePadded.slice(0, i) + String.fromCharCode(midChar);
    }
  }

  return before + "n";
}
