'use client';

import { MouseEvent } from 'react';

export function ReportSampleLink() {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.open(
      '/competitor-products-brief/report-sample-html.html',
      '_blank',
      'noopener,noreferrer,width=1200,height=800'
    );
  };

  return (
    <a
      href="/competitor-products-brief/report-sample-html.html"
      onClick={handleClick}
      className="font-semibold text-primary underline-offset-4 hover:underline"
    >
      Report Sample
    </a>
  );
}
