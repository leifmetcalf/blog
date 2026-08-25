---
title: 'Advent of Code 2024 Day 24'
pubDate: 2025-12-10
---

The interesting function is `repair`, which compares the expression for e.g. `z11` with the objective adder expression for `z11`. If we can't find a node with the objective expression, we recurse into the sub-expressions and try repair those.
```python
import sys
from bidict import bidict

gates = {}
nodes = set()

for line in sys.stdin.read().split('\n\n')[1].splitlines():
    a, op, b, _, c = line.split()
    gates[c] = (op, a, b)
    nodes.update((a, b, c))

nodes = sorted(nodes)
x = [p for p in nodes if p[0] == 'x']
y = [p for p in nodes if p[0] == 'y']
z = [p for p in nodes if p[0] == 'z']

def generate_exprs(gates):
    exprs = bidict()
    def go(p):
        if p in exprs:
            return
        if p in x or p in y:
            exprs[p] = (p,)
        else:
            op, a, b = gates[p]
            go(a)
            go(b)
            exprs[p] = (op, *sorted((exprs[a], exprs[b])))
    for p in nodes:
        go(p)
    return exprs

def objective(n):
    if n == 0:
        return ('XOR', ('x00',), ('y00',))
    else:
        return ('XOR', carry(n - 1), ('XOR', (x[n],), (y[n],)))

def carry(n):
    if n == 0:
        return ('AND', ('x00',), ('y00',))
    else:
        return ('OR', ('AND', carry(n - 1), ('XOR', (x[n],), (y[n],))), ('AND', (x[n],), (y[n],)))

def repair(gates, exprs, p, obj):
    def go(p, obj):
        if exprs[p] == obj:
            return
        if (res := exprs.inv.get(obj)):
            return (p, res)
        else:
            op, a, b = gates[p]
            obj_op, obj_a, obj_b = obj
            if op != obj_op:
                raise Exception
            if go(a, obj_a) is None:
                return go(b, obj_b)
            if go(b, obj_b) is None:
                return go(a, obj_a)
            if go(a, obj_b) is None:
                return go(b, obj_a)
            if go(b, obj_a) is None:
                return go(a, obj_b)
            raise Exception
    return go(p, obj)

swaps = []

for i in range(45):
    exprs = generate_exprs(gates)
    match repair(gates, exprs, z[i], objective(i)):
        case (p, q):
            swaps.extend((p, q))
            gates[p], gates[q] = gates[q], gates[p]

print(','.join(sorted(swaps)))
```
