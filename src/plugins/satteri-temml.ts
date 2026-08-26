import { defineMdastPlugin } from 'satteri';
import temml, { type Options } from 'temml';

/** Renders Sätteri's math nodes to MathML with Temml.
 *
 * Sätteri parses `$…$` and `$$…$$` but renders nothing, so without this plugin
 * math reaches the page as raw TeX. Requires `features: { math: true }`.
 *
 * Runs on mdast rather than hast: Astro's Sätteri processor puts its syntax
 * highlighter ahead of user hast plugins, and that highlighter would otherwise
 * claim display math as a plaintext code block first.
 */
export const satteriTemml = (options: Options = {}) => {
  const render = (value: string, displayMode: boolean) => ({
    // An `html` node passes through verbatim. A `raw` string would be re-parsed
    // as Markdown, wrapping display math in a stray paragraph.
    type: 'html' as const,
    value: temml.renderToString(value, {
      ...options,
      displayMode,
      throwOnError: false,
      annotate: true,
    }),
  });

  return defineMdastPlugin({
    name: 'temml',
    math: (node) => render(node.value, true),
    inlineMath: (node) => render(node.value, false),
  });
};
