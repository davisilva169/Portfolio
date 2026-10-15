import { useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

// Bundle math rendering locally so articles do not depend on a CDN at runtime.
export function KTex({ math, block = false, color }) {
  const ref = useRef(null);
  useEffect(() => {
    katex.render(math, ref.current, { throwOnError: false, displayMode: block, trust: false });
  }, [math, block]);
  return <span ref={ref} style={{ display: block ? 'block' : 'inline-block', margin: block ? '0.6rem 0' : '0 1px', color }} />;
}
