---
layout: default
title: "AI for refinery operations"
description: "I'm Aureliano Guedes. I build predictive models for refinery teams and tools that help engineers search technical documents."
permalink: /
---

<section class="intro">
  <h1>AI for refinery operations</h1>
  <p>I’m Aureliano Guedes. I build predictive models for refinery teams and tools that help engineers search technical documents.</p>
</section>

<section>
  <h2>Latest articles</h2>
  {%- if site.posts.size > 0 %}
  <ol class="post-list">
    {%- for post in site.posts limit: 3 %}
    <li>
      <h3><a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a></h3>
      <p class="post-date">{% include post-date.html date=post.date %}</p>
      {%- if post.description %}
      <p>{{ post.description | strip_html | escape }}</p>
      {%- endif %}
    </li>
    {%- endfor %}
  </ol>
  <p><a href="{{ '/articles/' | relative_url }}">All articles</a></p>
  {%- else %}
  <p>No articles published yet.</p>
  {%- endif %}
</section>
