---
title: 'Sydney cycling weekly index'
pubDate: 2026-09-23
---

![](https://i.snap.as/rChuHboR.png)

## Methodology

Data is from TfNSW: https://www.transport.nsw.gov.au/projects/programs/walking-and-cycling-program/walking-and-cycling-counts

There is one dot per week. The index value at time $t$ is

$$
f(t)\coloneqq \operatorname{median}_i x_i(t)/s_i,
$$

where $x_i(t)$ is the $i$th counter's log(total) for week $t$ and $s_i$ is the 'size' of the
$i$th counter. We choose $s_i$ so that

$$
\operatorname{mean}_t x_i(t)/s_i = \operatorname{mean}_t f(t).
$$

Then, we adjust for seasonal effects by fitting the sum of a linear spline and a 365-day-period sine wave and subtracting
only the sine wave from the raw index. Finally we exponentiate to get back out of log-space.
