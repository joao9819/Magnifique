(function () {
  "use strict";

  var doc = document;
  var root = doc.documentElement;
  var body = doc.body;
  var data = window.__MAGNIFIQUE__ || {};
  var brand = data.brand || {};
  var services = data.services || [];
  var processSteps = data.process || [];
  var gallery = data.gallery || [];

  function safe(fn, name) {
    try {
      fn();
    } catch (error) {
      if (window.console && console.warn) {
        console.warn("[Magnifique] " + name + " falhou sem quebrar o site.", error);
      }
    }
  }

  function ready(fn) {
    if (doc.readyState === "loading") {
      doc.addEventListener("DOMContentLoaded", fn, { once: true });
    } else {
      fn();
    }
  }

  function qs(selector, scope) {
    return (scope || doc).querySelector(selector);
  }

  function qsa(selector, scope) {
    return Array.prototype.slice.call((scope || doc).querySelectorAll(selector));
  }

  function text(value, fallback) {
    return value == null || value === "" ? fallback || "" : String(value);
  }

  function escapeHtml(value) {
    return text(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function wa(message) {
    var phone = text(brand.whatsapp, "5516994526584").replace(/\D/g, "");
    var msg = text(message, brand.generalMessage || "Olá! Vim pelo site e quero falar com a Magnifique.");
    return "https://wa.me/" + phone + "?text=" + encodeURIComponent(msg);
  }

  function serviceMessage(serviceName) {
    return "Olá! Quero um orçamento de *" + serviceName + "*.";
  }

  function iconSvg(name) {
    var icons = {
      sign:
        '<svg class="line-svg" data-line-art viewBox="0 0 120 120" aria-hidden="true">' +
        '<g data-draw fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M26 92V31"/><path d="M26 31h54l16 14-16 14H26"/><path d="M26 58h42l-12 12 12 12H26"/><path d="M43 45h34"/><path d="M39 70h20"/><circle cx="26" cy="25" r="6"/>' +
        "</g></svg>",
      facade:
        '<svg class="line-svg" data-line-art viewBox="0 0 120 120" aria-hidden="true">' +
        '<g data-draw fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M18 82h84"/><path d="M24 82V43h72v39"/><path d="M31 43l8-14h42l8 14"/><path d="M35 59h50"/><path d="M40 82V63h17v19"/><path d="M68 82V63h19v19"/><path d="M42 34h36"/><path d="M40 54l8-6 8 6 8-6 8 6 8-6 8 6"/>' +
        "</g></svg>",
      sticker:
        '<svg class="line-svg" data-line-art viewBox="0 0 120 120" aria-hidden="true">' +
        '<g data-draw fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M34 86h42a16 16 0 0 0 16-16V34H48a20 20 0 0 0-20 20v26a6 6 0 0 0 6 6Z"/><path d="M76 86c0-18 16-16 16-32"/><path d="M52 51h26"/><path d="M45 64h25"/><circle cx="35" cy="42" r="10"/><path d="M19 42h6"/><path d="M45 42h6"/>' +
        "</g></svg>",
      plotter:
        '<svg class="line-svg" data-line-art viewBox="0 0 120 120" aria-hidden="true">' +
        '<g data-draw fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M20 36h80v31H20z"/><path d="M31 67v25h58V67"/><path d="M34 48h31"/><path d="M74 48h12"/><path d="M41 78h38"/><path d="M45 91l7-13 8 9 8-6 7 10"/><path d="M30 29h60"/><path d="M33 29v7"/><path d="M87 29v7"/>' +
        "</g></svg>",
      print:
        '<svg class="line-svg" data-line-art viewBox="0 0 120 120" aria-hidden="true">' +
        '<g data-draw fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M30 34h50l10 10v42H30z"/><path d="M80 34v12h10"/><path d="M42 54h28"/><path d="M42 66h36"/><path d="M42 78h22"/><path d="M22 44h8v42h50v8H22z"/><path d="M38 26h42"/>' +
        "</g></svg>",
      gift:
        '<svg class="line-svg" data-line-art viewBox="0 0 120 120" aria-hidden="true">' +
        '<g data-draw fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M37 48h50v39H37z"/><path d="M31 38h62v15H31z"/><path d="M62 38v49"/><path d="M48 38c-13-13 2-27 14 0"/><path d="M76 38c13-13-2-27-14 0"/><path d="M29 86h68"/><path d="M41 94h42"/>' +
        "</g></svg>",
      chat:
        '<svg class="line-svg" data-line-art viewBox="0 0 120 120" aria-hidden="true">' +
        '<g data-draw fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M23 31h74v48H48L29 95V79h-6z"/><path d="M41 51h38"/><path d="M41 64h24"/>' +
        "</g></svg>",
      ruler:
        '<svg class="line-svg" data-line-art viewBox="0 0 120 120" aria-hidden="true">' +
        '<g data-draw fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M24 82 75 31l21 21-51 51H24z"/><path d="M70 36l21 21"/><path d="M36 82l13 13"/><path d="M48 58l8 8"/><path d="M58 48l8 8"/><path d="M24 82l21 21"/>' +
        "</g></svg>",
      roll:
        '<svg class="line-svg" data-line-art viewBox="0 0 120 120" aria-hidden="true">' +
        '<g data-draw fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M24 38h72v23H24z"/><path d="M32 61v26h56V61"/><circle cx="42" cy="49" r="5"/><path d="M54 49h29"/><path d="M41 76h38"/><path d="M45 87l7-11 9 8 8-5 7 8"/>' +
        "</g></svg>",
      truck:
        '<svg class="line-svg" data-line-art viewBox="0 0 120 120" aria-hidden="true">' +
        '<g data-draw fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M18 42h53v35H18z"/><path d="M71 54h18l13 14v9H71z"/><path d="M30 77a9 9 0 1 0 18 0"/><path d="M78 77a9 9 0 1 0 18 0"/><path d="M35 42V30h24v12"/><path d="M83 58v10h16"/>' +
        "</g></svg>"
    };

    return icons[name] || icons.sign;
  }

  function applyBrand() {
    var values = {
      name: brand.name,
      display: brand.display,
      tagline: brand.tagline,
      descriptor: brand.descriptor,
      coverage: brand.coverage,
      deliveryNote: brand.deliveryNote,
      whatsappLabel: brand.whatsappLabel,
      instagram: brand.instagram,
      hours: brand.hours,
      established: brand.established,
      sideMark: brand.sideMark
    };

    Object.keys(values).forEach(function (key) {
      qsa("[data-brand='" + key + "']").forEach(function (el) {
        el.textContent = text(values[key], el.textContent);
      });
    });

    qsa("[data-wa-general]").forEach(function (el) {
      el.setAttribute("href", wa(brand.generalMessage));
    });

    qsa("[data-wa-quote]").forEach(function (el) {
      el.setAttribute("href", wa(brand.quoteMessage));
    });

    qsa("[data-instagram-link]").forEach(function (el) {
      el.setAttribute("href", text(brand.instagramUrl, "#"));
      el.textContent = text(brand.instagram, el.textContent);
    });

    qsa("[data-year]").forEach(function (el) {
      el.textContent = String(new Date().getFullYear());
    });
  }

  function mountServices() {
    var target = qs("#servicesTrack");
    if (!target || target.children.length > 0) return;

    target.innerHTML = services
      .map(function (service, index) {
        var items = (service.items || [])
          .map(function (item) {
            return "<li>" + escapeHtml(item) + "</li>";
          })
          .join("");

        return (
          '<article class="service-card reveal" id="' +
          escapeHtml(service.id) +
          '" data-service-card style="--accent:' +
          escapeHtml(service.accent) +
          "; --accent-ink:" +
          escapeHtml(service.ink || "#FFFFFF") +
          '">' +
          '<div class="service-card__number">' +
          String(index + 1).padStart(2, "0") +
          "</div>" +
          '<div class="service-card__icon">' +
          iconSvg(service.icon) +
          "</div>" +
          '<p class="service-card__eyebrow">' +
          escapeHtml(service.category) +
          "</p>" +
          "<h3>" +
          escapeHtml(service.name) +
          "</h3>" +
          '<p class="service-card__lead">' +
          escapeHtml(service.eyebrow) +
          "</p>" +
          '<p class="service-card__summary">' +
          escapeHtml(service.summary) +
          "</p>" +
          "<ul>" +
          items +
          "</ul>" +
          '<a class="service-card__cta" href="' +
          escapeHtml(wa(serviceMessage(service.name))) +
          '" target="_blank" rel="noopener" aria-label="Orçar ' +
          escapeHtml(service.name) +
          ' no WhatsApp">Orçar este serviço <span aria-hidden="true">→</span></a>' +
          "</article>"
        );
      })
      .join("");

    var footer = qs("#footerServices");
    if (footer && footer.children.length === 0) {
      footer.innerHTML = services
        .map(function (service) {
          return '<a href="#' + escapeHtml(service.id) + '">' + escapeHtml(service.name) + "</a>";
        })
        .join("");
    }

    var select = qs("#quoteService");
    if (select && services.length > 0) {
      var current = select.value;
      select.innerHTML =
        '<option value="">Selecione uma categoria</option>' +
        services
          .map(function (service) {
            return '<option value="' + escapeHtml(service.name) + '">' + escapeHtml(service.name) + "</option>";
          })
          .join("");
      select.value = current;
    }
  }

  function mountProcess() {
    var target = qs("#processGrid");
    if (!target || target.children.length > 0) return;

    target.innerHTML = processSteps
      .map(function (step) {
        return (
          '<article class="process-card reveal" style="--accent:' +
          escapeHtml(step.accent) +
          '">' +
          '<div class="process-card__icon">' +
          iconSvg(step.icon) +
          "</div>" +
          '<p class="mono">' +
          escapeHtml(step.step) +
          "</p>" +
          "<h3>" +
          escapeHtml(step.title) +
          "</h3>" +
          "<p>" +
          escapeHtml(step.text) +
          "</p>" +
          "</article>"
        );
      })
      .join("");
  }

  function mountGallery() {
    qsa("[data-gallery-track]").forEach(function (track, trackIndex) {
      if (track.children.length > 0 || gallery.length === 0) return;
      var ordered = gallery.slice();
      if (trackIndex % 2 === 1) ordered.reverse();
      var doubled = ordered.concat(ordered);
      track.innerHTML = doubled
        .map(function (item, index) {
          return (
            '<figure class="gallery-item">' +
            '<img loading="lazy" decoding="async" src="' +
            escapeHtml(item.src) +
            '" alt="' +
            escapeHtml(item.alt) +
            '">' +
            '<figcaption>' +
            String((index % gallery.length) + 1).padStart(2, "0") +
            " · Magnifique</figcaption>" +
            "</figure>"
          );
        })
        .join("");
    });
  }

  function initSplashAndFab() {
    var splash = qs("#splash");
    var started = Date.now();
    var done = false;

    function showFab() {
      window.setTimeout(function () {
        body.classList.add("fab-visible");
        window.setTimeout(function () {
          body.classList.add("fab-label-done");
        }, 4300);
      }, 650);
    }

    function hideSplash() {
      if (done) return;
      done = true;
      if (splash) {
        splash.classList.add("is-hidden");
        splash.setAttribute("aria-hidden", "true");
      }
      body.classList.add("splash-done");
      showFab();
    }

    function hideAfterMinimum() {
      var elapsed = Date.now() - started;
      window.setTimeout(hideSplash, Math.max(250, 4550 - elapsed));
    }

    if (doc.readyState === "complete") {
      hideAfterMinimum();
    } else {
      window.addEventListener("load", hideAfterMinimum, { once: true });
    }

    window.setTimeout(hideSplash, 5600);
  }

  function initNav() {
    var toggle = qs("[data-menu-toggle]");
    var panel = qs("#siteNav");
    if (!toggle || !panel) return;

    toggle.addEventListener("click", function () {
      var open = !body.classList.contains("nav-open");
      body.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    qsa("#siteNav a").forEach(function (link) {
      link.addEventListener("click", function () {
        body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });

    window.addEventListener(
      "scroll",
      function () {
        body.classList.toggle("is-scrolled", window.scrollY > 18);
      },
      { passive: true }
    );
  }

  function initServiceProgress() {
    var track = qs("#servicesTrack");
    var output = qs("[data-service-progress]");
    if (!track || !output) return;

    function update() {
      var cards = qsa("[data-service-card]", track);
      if (!cards.length) return;
      var first = cards[0];
      var gap = parseFloat(window.getComputedStyle(track).columnGap || "0") || 0;
      var step = first.getBoundingClientRect().width + gap;
      var index = Math.max(0, Math.min(cards.length - 1, Math.round(track.scrollLeft / Math.max(step, 1))));
      output.textContent = String(index + 1).padStart(2, "0") + " / " + String(cards.length).padStart(2, "0");
    }

    update();
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  }

  function initQuoteForm() {
    var form = qs("#quoteForm");
    if (!form) return;

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var formData = new FormData(form);
      var lines = [
        brand.quoteMessage || "Olá! Quero um orçamento pela Magnifique.",
        "",
        "Nome: " + text(formData.get("nome"), "não informado"),
        "WhatsApp: " + text(formData.get("whatsapp"), "não informado"),
        "Serviço: " + text(formData.get("servico"), "não selecionado"),
        "Quantidade: " + text(formData.get("quantidade"), "a definir"),
        "Medidas: " + text(formData.get("medidas"), "a definir"),
        "Prazo desejado: " + text(formData.get("prazo"), "a combinar")
      ];

      var obs = text(formData.get("observacoes"), "");
      if (obs) {
        lines.push("Observações: " + obs);
      }

      var url = wa(lines.join("\n"));
      var opened = window.open(url, "_blank", "noopener");
      if (!opened) {
        window.location.href = url;
      }
    });
  }

  function initLoupe() {
    var stage = qs("[data-loupe-stage]");
    var glass = qs("[data-loupe-glass]");
    var toggle = qs("[data-loupe-toggle]");
    var slider = qs("[data-loupe-zoom]");
    if (!stage || !glass) return;

    function updateZoom(value) {
      var zoom = parseFloat(value || "2.2");
      var dot = Math.max(7, 18 - zoom * 3);
      var glassSize = Math.round(108 + zoom * 18);
      stage.style.setProperty("--zoom", zoom);
      stage.style.setProperty("--dot-size", dot + "px");
      stage.style.setProperty("--glass-size", glassSize + "px");
    }

    function move(clientX, clientY) {
      var rect = stage.getBoundingClientRect();
      var x = Math.max(0, Math.min(rect.width, clientX - rect.left));
      var y = Math.max(0, Math.min(rect.height, clientY - rect.top));
      stage.style.setProperty("--loupe-x", (x / rect.width) * 100 + "%");
      stage.style.setProperty("--loupe-y", (y / rect.height) * 100 + "%");
      glass.style.left = x + "px";
      glass.style.top = y + "px";
    }

    stage.addEventListener("pointerdown", function (event) {
      stage.setPointerCapture(event.pointerId);
      stage.classList.add("is-active");
      move(event.clientX, event.clientY);
    });

    stage.addEventListener("pointermove", function (event) {
      if (event.buttons || event.pointerType === "mouse") {
        move(event.clientX, event.clientY);
      }
    });

    stage.addEventListener("pointerup", function () {
      stage.classList.remove("is-active");
    });

    if (toggle) {
      toggle.addEventListener("click", function () {
        var open = !stage.classList.contains("is-zoomed");
        stage.classList.toggle("is-zoomed", open);
        toggle.textContent = open ? "reduzir amostra" : "ampliar amostra";
      });
    }

    if (slider) {
      updateZoom(slider.value);
      slider.addEventListener("input", function () {
        updateZoom(slider.value);
      });
    }
  }

  function initLineArt() {
    var svgs = qsa("[data-line-art]");
    if (!svgs.length) return;

    function prepare(svg) {
      qsa("[data-draw], path, line, rect, circle, polyline, polygon", svg).forEach(function (shape) {
        if (typeof shape.getTotalLength !== "function") return;
        var length = Math.ceil(shape.getTotalLength());
        shape.style.strokeDasharray = length;
        shape.style.strokeDashoffset = length;
        shape.style.transition = "stroke-dashoffset 1200ms cubic-bezier(.22,.61,.36,1)";
      });
    }

    function draw(svg) {
      qsa("[data-draw], path, line, rect, circle, polyline, polygon", svg).forEach(function (shape) {
        shape.style.strokeDashoffset = "0";
      });
      svg.classList.add("is-drawn");
    }

    svgs.forEach(prepare);

    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              draw(entry.target);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.05 }
      );
      svgs.forEach(function (svg) {
        observer.observe(svg);
      });
    } else {
      svgs.forEach(draw);
    }

    window.setTimeout(function () {
      svgs.forEach(draw);
    }, 6000);
  }

  function initReveal() {
    var elements = qsa(".reveal");
    if (!elements.length) return;

    if (window.gsap) {
      if (window.ScrollTrigger) {
        window.gsap.registerPlugin(window.ScrollTrigger);
      }

      elements.forEach(function (el) {
        window.gsap.from(el, {
          autoAlpha: 0,
          y: 26,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: window.ScrollTrigger
            ? {
                trigger: el,
                start: "top 92%",
                once: true
              }
            : undefined
        });
      });
    }

    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.05 }
      );
      elements.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      elements.forEach(function (el) {
        el.classList.add("is-visible");
      });
    }

    window.setTimeout(function () {
      elements.forEach(function (el) {
        el.classList.add("is-visible");
        el.style.opacity = "";
        el.style.transform = "";
      });
    }, 6000);
  }

  ready(function () {
    body = doc.body;
    body.classList.add("is-enhanced");
    root.classList.add("is-enhanced");

    safe(applyBrand, "conteúdo da marca");
    safe(mountServices, "cards de serviços");
    safe(mountProcess, "fluxo de atendimento");
    safe(mountGallery, "galeria");
    safe(initSplashAndFab, "splash e WhatsApp flutuante");
    safe(initNav, "navegação");
    safe(initQuoteForm, "formulário de orçamento");
    safe(initLoupe, "lupa de retícula");
    safe(initServiceProgress, "progresso de serviços");
    safe(initLineArt, "line-art SVG");
    safe(initReveal, "animações de entrada");
  });
})();
