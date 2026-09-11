import type { CSSProperties } from 'react';
import { cropStyle } from '@/lib/selves';

/** The same generated human layers used by the homepage, at their native proportions. */
export function LifePortrait({
  index = 0,
  label = 'A little more of you.',
}: {
  index?: number;
  label?: string;
}) {
  return (
    <figure className="interior-portrait" aria-hidden="true">
      <div
        className="interior-person"
        style={cropStyle(index) as CSSProperties}
      >
        <div className="self-sprite" />
      </div>
      <figcaption>{label}</figcaption>
    </figure>
  );
}
