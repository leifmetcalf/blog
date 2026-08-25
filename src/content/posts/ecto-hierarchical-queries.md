---
title: 'Ecto hierarchical queries beyond `preload`'
pubDate: 2025-01-31
---

The usual way to get a tree of nested structs from an Ecto query is with `preload`. The `preload` option lets you load associations for an Ecto schema, either by issuing a separate query:

```elixir
Repo.all from p in Post, preload: [:comments]
```
or by restructuring the result of an explicitly written join tree:
``` elixir
Repo.all from p in Post,
  join: c in assoc(p, :comments),
  where: c.published_at > p.updated_at,
  preload: [comments: c]
```
This works when the nested structs are already associations in the schema, but what if we want to load ad-hoc fields, or if we don't want to use a schema at all?

## Manually rearranging the result in Elixir

For example, suppose users can react to comments, so each `Comment` has a number of `Reaction` children. How would we return a list of all posts, as well as the most recent comment for each post, as well as all the reactions for each comment? I.e. we want to somehow return:
```elixir
[
  %{
    post: %Post{},
    last_comment: %Comment{
      reactions: [
        %Reaction{},
        ...
      ]
    }
  },
  ...
]
```
The SQL is straightforward:
```sql
select ...
from posts p
left lateral join (
  select ...
  from comments c
  where c.post_id = p.id
  order by c.inserted_at desc
  limit 1
) lc on true
left join reactions r on r.comment_id = lc.id
```
One option is to translate the SQL directly into Ecto query syntax:
```elixir
Repo.all from p in Posts,
  as: :post,
  left_lateral_join: lc in subquery(
    from c in Comment,
    where: c.post_id == parent_as(:post).id,
    order_by: [:desc, c.inserted_at],
    limit: 1),
  on: true,
  left_join: reaction in assoc(lc, :reactions),
  select: %{post: p, last_comment: lc, reaction: r}
)
```
This returns a flat list of rows, so we need to manually restructure the result into a list of nested structs:
```elixir
# Input:
# [
#   %{post: %Post{}, last_comment: %Comment{}, reaction: %Reaction{}},
#   ...
# ]
#
# Output:
# [
#   %{post: %Post{}, last_comment: %Comment{reactions: [%Reaction{}, ...]}}
# ]

def restructure(rows) do
  # Elixir code goes here
end
```
This is a fair bit of work, but workable and very flexible.

## Using JSON

We can save some work by returning a tree-like object from the database with `json_agg`:

## Add association and preload

Cannot be done dynamically. Why?

## Return json and cast
