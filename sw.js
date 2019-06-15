let cache_name = "mcache";
let url_tobe_load = [];
this.addEventListener('install', (a) => {
  a.waitUntil(
    caches.open('mcache')
    .then((c) => {
      c.addAll(url_tobe_load)
    })
  )
})

this.addEventListener('fetch', (b) => {
  b.respondWith(
    caches.open('mcache')
    .then((d) => {
      return d.match(b.request)
        .then((res) => {
          return res || fetch(b.request)
            .then((res) => {
              d.put(b.request, res.clone())
              return res;
            })
        })
    })
  )
})
