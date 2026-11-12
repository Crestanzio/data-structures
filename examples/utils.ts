interface ListLike<T> {
  length: number;
  find(index: number): T | undefined;
}

const ANSI_COLORS = {
  number:    '\x1b[33m', // Yellow
  string:    '\x1b[32m', // Green
  boolean:   '\x1b[35m', // Magenta
  null:      '\x1b[90m', // Gray
  undefined: '\x1b[90m', // Gray
  reset:     '\x1b[0m',
} as const;

// Color and format resolver using dynamic object lookup
const formaters: Record<string, (value: any) => string> = {
  number: (value: number)   => `${ANSI_COLORS.number}${value}${ANSI_COLORS.reset}`,
  string: (value: string)   => `${ANSI_COLORS.string}${value}${ANSI_COLORS.reset}`,
  boolean: (value: boolean) => `${ANSI_COLORS.boolean}${value}${ANSI_COLORS.reset}`,
  undefined: ()             => `${ANSI_COLORS.undefined}undefined${ANSI_COLORS.reset}`,
  null: ()                  => `${ANSI_COLORS.null}null${ANSI_COLORS.reset}`,
}

// Format an entire array into a single line while preserving syntax colors
export function inlineArr <T>(array: T[]): string {
  const items = array.map(item => {
    const key = item === null ? 'null' : item === undefined ? 'undefined' : typeof item;
    const formatter = formaters[key];
    
    return formatter ? formatter(item) : String(item);
  });

  return `[ ${items.join(', ')} ]`;
}

export function listToArray<T>(list: ListLike<T>): T[] {
  return Array.from({ length: list.length }, (_, index) => list.find(index)!);
}

export function inlineList<T>(array: T[], type: 'single' | 'double' | 'circular'): string {
  const items = array.map(item => {
    const key = item === null ? 'null' : item === undefined ? 'undefined' : typeof item;
    const formatter = formaters[key];
    
    return formatter ? formatter(item) : String(item);
  });

  const nullFmt = formaters['null']!(null);

  if (items.length === 0) return nullFmt;

  switch (type) {
    case 'single': return items.join(' -> ') + ' -> ' + nullFmt;
    case 'double': return nullFmt + ' <-> ' + items.join(' <-> ') + ' <-> ' + nullFmt;
    case 'circular': return items.join(' -> ') + ' -> (head)';
  }
}