/**
 * A deliberately small syntax highlighter for the handful of languages the
 * docs use. It only needs to tell strings, comments, keywords, numbers and
 * flags apart, so a single left-to-right regex pass is enough and keeps the
 * bundle free of a highlighting dependency.
 */

export type HighlightLanguage = "bash" | "javascript" | "python" | "json" | "http" | "text";

export interface Token {
  text: string;
  kind?: "string" | "comment" | "keyword" | "number" | "key" | "flag" | "literal" | "fn";
}

const KEYWORDS: Record<HighlightLanguage, Set<string>> = {
  javascript: new Set([
    "const", "let", "var", "await", "async", "function", "return", "if", "else",
    "while", "for", "of", "new", "throw", "import", "from", "export", "try", "catch",
    "break", "continue", "do", "typeof",
  ]),
  python: new Set([
    "import", "from", "def", "return", "if", "elif", "else", "while", "for", "in",
    "not", "and", "or", "raise", "try", "except", "with", "as", "break", "continue",
    "print", "class", "is", "lambda",
  ]),
  bash: new Set(["curl", "export", "echo"]),
  json: new Set(),
  http: new Set(["GET", "POST", "DELETE", "PUT", "PATCH"]),
  text: new Set(),
};

const LITERALS = new Set(["true", "false", "null", "undefined", "True", "False", "None"]);

function patternFor(language: HighlightLanguage): RegExp | null {
  switch (language) {
    case "javascript":
      return /(\/\/[^\n]*)|("(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'|`(?:\\.|[^`\\])*`)|(\b\d+(?:\.\d+)?\b)|([A-Za-z_$][\w$]*)/g;
    case "python":
      return /(#[^\n]*)|(f?"(?:\\.|[^"\\\n])*"|f?'(?:\\.|[^'\\\n])*')|(\b\d+(?:\.\d+)?\b)|([A-Za-z_][\w]*)/g;
    case "bash":
      return /(#[^\n]*)|("(?:\\.|[^"\\])*"|'[^']*')|(\s--?[A-Za-z][\w-]*)|([A-Za-z_][\w]*)/g;
    case "json":
      return /("(?:\\.|[^"\\\n])*")|(-?\b\d+(?:\.\d+)?\b)|(\btrue\b|\bfalse\b|\bnull\b)/g;
    case "http":
      return /(^[A-Z]+(?= ))|(^[A-Za-z-]+(?=:))/gm;
    default:
      return null;
  }
}

export function tokenize(code: string, language: HighlightLanguage): Token[] {
  const pattern = patternFor(language);
  if (!pattern) return [{ text: code }];
  const tokens: Token[] = [];
  let last = 0;
  for (const match of code.matchAll(pattern)) {
    const index = match.index ?? 0;
    if (index > last) tokens.push({ text: code.slice(last, index) });
    const text = match[0];
    tokens.push({ text, kind: classify(match, language, code, index + text.length) });
    last = index + text.length;
  }
  if (last < code.length) tokens.push({ text: code.slice(last) });
  return tokens;
}

function classify(
  match: RegExpMatchArray,
  language: HighlightLanguage,
  code: string,
  end: number,
): Token["kind"] {
  const text = match[0];
  if (language === "json") {
    if (match[1]) return /^\s*:/.test(code.slice(end, end + 4)) ? "key" : "string";
    if (match[2]) return "number";
    return "literal";
  }
  if (language === "http") return match[1] ? "keyword" : "key";
  if (match[1]) return "comment";
  if (match[2]) return "string";
  if (match[3]) return language === "bash" ? "flag" : "number";
  if (LITERALS.has(text)) return "literal";
  if (KEYWORDS[language].has(text)) return "keyword";
  if (language !== "bash" && code[end] === "(") return "fn";
  return undefined;
}
