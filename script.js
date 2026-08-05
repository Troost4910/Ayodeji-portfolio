// ===== Project data for the lightbox =====
const PROJECTS = {
  debrand: {
    title: "De Brand Image Studio",
    tags: ["Hand-coded", "Branding studio"],
    desc: "A founder-led creative studio site — storytelling-first layout with a warm, editorial feel, built entirely by hand (no Webflow).",
    img: "assets/work-debrand.jpg",
    link: "https://bejewelled-nasturtium-03df9e.netlify.app/"
  },
  beyond925: {
    title: "Beyond925",
    tags: ["Hand-coded", "Community / fitness"],
    desc: "A London run club & Pilates community site — bold type, high-energy imagery, and a membership section built to convert casual visitors into members.",
    img: "assets/work-beyond925.jpg",
    link: "https://celebrated-pothos-d60b4e.netlify.app/"
  },
  lumea: {
    title: "Lumea Skin",
    tags: ["Webflow", "E-commerce"],
    desc: "A skincare e-commerce concept — product showcase, CMS-driven collections, and a full purchase-path layout built natively in Webflow.",
    img: "assets/work-lumea.jpg",
    link: "https://ecommerce-d93d57.webflow.io/"
  },
  jemsocial: {
    title: "Jem Social — Case Study",
    tags: ["Webflow", "CMS", "Programmatic SEO"],
    desc: "Built out 100 programmatic SEO pages inside Webflow's CMS for Jem Social — a structured collection system designed to scale content without manual page-building.",
    img: null,
    link: "work/jem-social.html"
  },
  bokt: {
    title: "Bokt",
    tags: ["Webflow", "Client project", "Lead-gen SaaS"],
    desc: "A 24/7 call-answering and Google ranking system for home service businesses — pricing tiers, ROI math, and a trade-specific features breakdown built to convert local business owners.",
    img: "assets/work-bokt.jpg",
    link: "https://bokt-updated-site.webflow.io/"
  },
  savora: {
    title: "Savora Kitchen",
    tags: ["Webflow", "Client project", "Hospitality"],
    desc: "A fine-dining restaurant site — featured dishes, gallery, and reservation-focused layout built to match the warmth of the dining experience itself.",
    img: "assets/work-savora.jpg",
    link: "https://restaurant-landing-page-74592c.webflow.io/"
  },
  opsidesk: {
    title: "Opsidesk",
    tags: ["Webflow", "Client project", "Healthcare ops"],
    desc: "A Spanish-language messaging and scheduling tool for private clinics — built around how appointment requests actually move from first message to confirmed visit.",
    img: "assets/work-opsidesk.jpg",
    link: "https://assignment-debd23.webflow.io/"
  },
  flowsync: {
    title: "FlowSync",
    tags: ["Webflow", "Client project", "SaaS"],
    desc: "A SaaS marketing site with a full feature breakdown, integrations grid, and tiered pricing — built to walk a team-lead buyer from problem to sign-up.",
    img: "assets/work-flowsync.jpg",
    link: "https://saas-website-4e71d8.webflow.io/"
  }
};

// ===== Lightbox =====
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lightbox-img');
const lbTitle = document.getElementById('lightbox-title');
const lbDesc = document.getElementById('lightbox-desc');
const lbMeta = document.getElementById('lightbox-meta');
const lbLink = document.getElementById('lightbox-link');

document.querySelectorAll('.work-card').forEach(card => {
  card.addEventListener('click', () => {
    const key = card.getAttribute('data-project');
    const p = PROJECTS[key];
    if (!p) return;

    lbTitle.textContent = p.title;
    lbDesc.textContent = p.desc;
    lbMeta.innerHTML = p.tags.map(t => `<span class="work-tag">${t}</span>`).join('');
    lbLink.href = p.link;
    lbLink.textContent = key === 'jemsocial' ? 'Read the full case study →' : 'View live site →';

    if (p.img) {
      lbImg.style.display = 'block';
      lbImg.innerHTML = `<img src="${p.img}" alt="${p.title}">`;
    } else {
      lbImg.style.display = 'none';
      lbImg.innerHTML = '';
    }

    lightbox.classList.add('open');
  });
});

document.getElementById('lightbox-close').addEventListener('click', () => {
  lightbox.classList.remove('open');
});
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) lightbox.classList.remove('open');
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') lightbox.classList.remove('open');
});

// ===== FAQ accordion =====
document.querySelectorAll('.faq-item').forEach(item => {
  const q = item.querySelector('.faq-q');
  const a = item.querySelector('.faq-a');
  q.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(other => {
      other.classList.remove('open');
      other.querySelector('.faq-a').style.maxHeight = null;
    });
    if (!isOpen) {
      item.classList.add('open');
      a.style.maxHeight = a.scrollHeight + 'px';
    }
  });
});

// ===== Scroll reveal =====
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => io.observe(el));

// ===== Contact form (Formspree) =====
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.style.display = 'block';
    status.textContent = 'Sending...';
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        status.textContent = "Thanks — your message is in. I'll reply soon.";
        form.reset();
      } else {
        status.textContent = "Something went wrong — please email me directly instead.";
      }
    } catch (err) {
      status.textContent = "Something went wrong — please email me directly instead.";
    }
  });
}
