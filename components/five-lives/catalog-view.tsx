'use client';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowUpRight, Bookmark } from 'lucide-react';
import { categories } from '@/lib/catalog';
export function CatalogView() {
  const [filter, setFilter] = useState('all');
  return (
    <>
      <div className="filter-row" aria-label="Filter experiences">
        <button
          className={filter === 'all' ? 'selected' : ''}
          onClick={() => setFilter('all')}
          aria-pressed={filter === 'all'}
        >
          All possibilities
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setFilter(c.id)}
            className={filter === c.id ? 'selected' : ''}
            aria-pressed={filter === c.id}
          >
            {c.name}
          </button>
        ))}
      </div>
      <p className="catalog-note" role="status">
        {filter === 'all'
          ? 'All five categories'
          : categories.find((c) => c.id === filter)?.name}{' '}
        · Experiences in development. No dates are open for booking yet.
      </p>
      <div className="offering-grid">
        {categories
          .filter((c) => filter === 'all' || filter === c.id)
          .flatMap((c) =>
            c.options.map((o) => (
              <Link
                className="offering-card"
                key={o.id}
                href={`/experiences/${o.id}`}
              >
                <div className="offering-top">
                  <span className="tag" style={{ background: c.color }}>
                    {c.name}
                  </span>
                  <ArrowUpRight size={19} />
                </div>
                <h2>{o.title}</h2>
                <p>{o.detail}</p>
                <div className="artifact-line">
                  <Bookmark size={17} />
                  <span>{o.artifact}</span>
                </div>
                <span className="availability">
                  In development · Explore this possibility
                </span>
              </Link>
            )),
          )}
      </div>
    </>
  );
}
