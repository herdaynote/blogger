const latestPosts = document.querySelector('aside:last-child')
fetch('https://www.herdaynote.com/feeds/posts/default?max-results=5&alt=json')
  .then((e) => e.json())
  .then((e) => {
    e.feed.entry.forEach((e, t) => {
      const s = document.createElement('a')
      ;(s.href = e.link[2].href),
        (s.innerHTML = `${t + 1}. ${e.title.$t}`),
        latestPosts.append(s)
    })
  })
