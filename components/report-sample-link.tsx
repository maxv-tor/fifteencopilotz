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
Reports will open in a new window. 
    <a
      href="/competitor-products-brief/1513ee36-4ab4-4d3f-a824-abdd54987902"
      onClick={handleClick}
      className="font-semibold text-primary underline-offset-4 hover:underline"
    >
	Click here to see a Sample Report #1&nbsp;
	</a>| &nbsp;
    <a
     href="/competitor-products-brief/10c80d5a-a099-46da-8665-7bd9c7ec7e2a"
     onClick={handleClick}
     className="font-semibold text-primary underline-offset-4 hover:underline"
    >
	&nbsp; Sample Report #2&nbsp;
	</a>|&nbsp;
    <a
     href="/competitor-products-brief/5c21b18f-6c11-469f-b209-48961471efdd"
     onClick={handleClick}
     className="font-semibold text-primary underline-offset-4 hover:underline"
    >
	&nbsp; Sample Report #3&nbsp;
	</a>|&nbsp;
   <a
     href="/competitor-products-brief/42848913-ecad-4078-8a4d-119909d82aee"
     onClick={handleClick}
     className="font-semibold text-primary underline-offset-4 hover:underline"
    >
	&nbsp; Sample Report #4&nbsp;
	</a>|&nbsp;
  );
}
