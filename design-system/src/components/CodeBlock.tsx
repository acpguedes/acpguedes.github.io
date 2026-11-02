import { useEffect, useRef, useState } from "react";

export interface CodeBlockProps {
  code: string;
  /** Shown in the header, for example "python". */
  language?: string;
}

/** Code block with a language label and copy button. Long lines scroll inside the block, never the page. */
export function CodeBlock({ code, language = "code" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const pre = preRef.current;
    if (pre && pre.scrollWidth > pre.clientWidth) pre.tabIndex = 0;
  }, [code]);

  const copy = () => {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  };

  return (
    <div className={`language-${language} highlighter-rouge`}>
      <div className="code-head">
        <span className="code-lang">{language}</span>
        <button type="button" className="code-copy" onClick={copy}>
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre ref={preRef}>
        <code>{code}</code>
      </pre>
    </div>
  );
}
