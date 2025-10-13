'use client';

import { Fragment, MouseEvent } from 'react';

const reports: Array<{ label: string; href: string }> = [
  {
    label: 'Sample Report #1',
    href: '/competitor-products-brief/1513ee36-4ab4-4d3f-a824-abdd54987902',
  },
  {
    label: 'Sample Report #2',
    href: '/competitor-products-brief/10c80d5a-a099-46da-8665-7bd9c7ec7e2a',
  },
  {
    label: 'Sample Report #3',
    href: '/competitor-products-brief/5c21b18f-6c11-469f-b209-48961471efdd',
  },
  {
    label: 'Sample Report #4',
    href: '/competitor-products-brief/42848913-ecad-4078-8a4d-119909d82aee',
  },
];

export function ReportSampleLink() {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return; // Allow default browser behavior for opening in new tabs/windows
    }

    event.preventDefault();

    const url = event.currentTarget.href;

    window.open(
      url,
      '_blank',
      'noopener,noreferrer,width=1200,height=800'
    );
  };

  return (
    <p className="text-sm">
      Reports will open in a new window.{' '}
      {reports.map((report, index) => (
        <Fragment key={report.href}>
          <a
            href={report.href}
            onClick={handleClick}
            className="font-semibold text-primary underline-offset-4 hover:underline"
          >
            {report.label}
          </a>
          {index < reports.length - 1 && ' | '}
        </Fragment>
      ))}
    </p>
  );
}
