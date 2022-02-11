const menuIcon = document.querySelector('#menu svg')
const menuNavigation = document.querySelector('header nav')
const menuAnchors = document.querySelectorAll('header nav a')
const searchIcon = document.querySelector('#search svg')
const searchBar = document.querySelector('header form')
const headerTitle = document.querySelector('header h1')
const progressBar = document.querySelector('#progress-bar')

document.addEventListener('DOMContentLoaded', () => {
  let menuCategory = window.location.pathname.split('/')[3]

  menuAnchors.forEach((menuAnchor) => {
    if (menuAnchor.text.trim() == menuCategory) {
      menuAnchor.classList.add('menu-active')
    }
  })
})

const handleIntersection = (entries) => {
  entries.map((entry) => {
    if (entry.isIntersecting) {
      entry.target.src = entry.target.dataset.src
      entry.target.removeAttribute('data-src')
      observer.unobserve(entry.target)
    }
  })
}

const observer = new IntersectionObserver(handleIntersection, {
  rootMargin: '0px 0px 0px 0px',
})

const showAds = () => {
  const adsGoogle = document.querySelectorAll('.adsbygoogle')

  adsGoogle.forEach((ads) => {
    ;(adsbygoogle = window.adsbygoogle || []).push({})
  })
}

setTimeout(() => {
  const adsScript = document.createElement('script')

  adsScript.src =
    'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
  adsScript.setAttribute('async', 'async')
  adsScript.onload = () => {
    showAds()
  }

  document.head.appendChild(adsScript)
}, 3000)

setInterval(() => {
  parent.location.reload(true)
}, 900000)

document.addEventListener('scroll', () => {
  let lazyImages = document.querySelectorAll('img[data-src]')
  let lazyIframes = document.querySelectorAll('iframe[data-src')
  let scrolled =
    (document.documentElement.scrollTop /
      (document.documentElement.scrollHeight -
        document.documentElement.clientHeight)) *
    100

  lazyImages.forEach((lazyImage) => observer.observe(lazyImage))
  lazyIframes.forEach((lazyIframe) => observer.observe(lazyIframe))
  progressBar.style.width = scrolled + '%'
})

const toggleMenu = () => {
  menuIcon.classList.toggle('icon-active')

  document.body.classList.toggle('unscroll')
  progressBar.classList.toggle('hide')
  menuNavigation.classList.toggle('show-navigation')
}

menuIcon.addEventListener('click', () => {
  toggleMenu()
})

searchIcon.addEventListener('click', () => {
  searchIcon.classList.toggle('icon-active')

  headerTitle.classList.toggle('hide')
  searchBar.classList.toggle('hide')
})

const scrollToTop = () => {
  document.body.scrollIntoView({
    behavior: 'smooth',
  })
}

const getContentFromUrl = (url) => {
  return fetch(url)
    .then((response) => {
      return response.text()
    })
    .then((html) => {
      return new DOMParser().parseFromString(html, 'text/html')
    })
}

const changeUrl = (url) => {
  const newObject = {
    Title: 'herdaynote',
    Url: url,
  }
  history.pushState(newObject, newObject.Title, newObject.Url)
}

const morePost = async (url) => {
  document.querySelector('#pagination').innerHTML =
    '<div id="loading">Memuat artikel <span>.</span><span>.</span><span>.</span></div>'

  changeUrl(url)

  const newHTML = await getContentFromUrl(url)
  const articles = newHTML.querySelectorAll('article')

  articles.forEach((article) => {
    document.querySelector('#multi-post').append(article)
  })
  document.querySelector('#pagination').innerHTML =
    newHTML.querySelector('#pagination').innerHTML
}
