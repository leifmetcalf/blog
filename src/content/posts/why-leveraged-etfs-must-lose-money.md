---
title: 'Why leveraged ETFs must lose money'
pubDate: 2026-08-26
---

Let $f(x)$ be the price curve of an asset over time, and suppose we want to create a fund that offers returns twice that of $f$. Precisely, we want our price curve to be

$$
\frac12 f(x)^2
$$

(why the factor of $\frac12$? it will make some later equations easier to read)

Can we achieve this? If $f$ is differentiable, the answer is yes. Let $g(x)$ be the price curve of our fund. We set our position to $f(x)$ so that

$$
g'(x) = f(x)f'(x)
$$

which we can solve to get the desired return profile.

What if $f$ is not differentiable, but rather a Wiener process? We cannot differentiate with respect to time, so instead we look at how $g$ must change with little changes in $f$. If we write $g(x+\epsilon)-g(x)$ as $\Delta g$, we get

$$
\Delta g = f(x)(\Delta f)+\frac12(\Delta f)^2
$$

We can set our position to $f(x)$ to achieve the left term, but what about the term on the right? When $f$ was differentiable this term vanished, but now in fact $\operatorname{E}[(\Delta f)^2] = \epsilon$. So, in order to achieve the right term, our fund must increase in price by $\frac12\epsilon$ every $\epsilon$. Assuming we cannot print money, we must instead allow our 2x leveraged fund to have the return profile

$$
\frac12 f(x)^2-\frac12 x
$$

(why can we substitute $\operatorname{E}[(\Delta f)^2]$ for $(\Delta f)^2$ and ignore the noise component $(\Delta f)^2 - \operatorname{E}[(\Delta f)^2]$? hint: calculate the variance in the accumulated noise)
