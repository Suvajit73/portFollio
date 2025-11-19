document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav
  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("nav");
  if (hamburger && nav) {
    hamburger.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
    nav.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        nav.classList.remove("open");
      });
    });
  }

  // GSAP setup
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  // Smooth scroll on nav click
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      gsap.to(window, {
        duration: 0.8,
        scrollTo: { y: target, offsetY: 70 },
        ease: "power2.out",
      });
    });
  });

  // Hero: pin + parallax + orbit rotation
  const hero = document.querySelector("#hero");
  const avatar = document.querySelector(".avatar");
  const orbitCards = gsap.utils.toArray(".orbit-card");

  if (hero) {
    ScrollTrigger.create({
      trigger: hero,
      start: "top top",
      end: "bottom+=200 top",
      pin: true,
      pinSpacing: true,
      scrub: true,
    });

    // Hero parallax
    gsap.to(".hero-left", {
      yPercent: -10,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to(".hero-right", {
      yPercent: 10,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Continuous orbit rotation
    gsap.to(orbitCards, {
      rotate: 360,
      duration: 30,
      repeat: -1,
      ease: "none",
      transformOrigin: "50% 50%",
    });

    // Avatar subtle breathing scale
    gsap.to(avatar, {
      scale: 1.05,
      duration: 2.4,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });
  }

  // =========================
  // NEW: Scroll progress bar + soft section glow
  // =========================
  const sections = gsap.utils.toArray("section.section");
  const progressBar = document.getElementById("scrollProgress");
  const sectionGlow = document.getElementById("sectionGlow");

  // Scroll progress bar (top)
  if (progressBar) {
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        gsap.to(progressBar, {
          width: `${self.progress * 100}%`,
          duration: 0.15,
          ease: "power1.out",
        });
      },
    });
  }

  // Section glow that reacts to current section
  if (sectionGlow && sections.length) {
    sections.forEach((section) => {
      const colorType = section.getAttribute("data-bg");

      ScrollTrigger.create({
        trigger: section,
        start: "top center+=40",
        end: "bottom center-=40",
        onEnter: () => {
          gsap.to(sectionGlow, {
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
          });
        },
        onEnterBack: () => {
          gsap.to(sectionGlow, {
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
          });
        },
        onLeave: () => {
          gsap.to(sectionGlow, {
            opacity: 0,
            duration: 0.35,
            ease: "power2.out",
          });
        },
        onLeaveBack: () => {
          gsap.to(sectionGlow, {
            opacity: 0,
            duration: 0.35,
            ease: "power2.out",
          });
        },
      });

      // Color shift based on section type
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          if (colorType === "accent") {
            gsap.to(sectionGlow, {
              background:
                "radial-gradient(circle, rgba(34,197,94,0.22), transparent 65%)",
              duration: 0.5,
              ease: "power2.out",
            });
          } else {
            gsap.to(sectionGlow, {
              background:
                "radial-gradient(circle, rgba(56,189,248,0.22), transparent 65%)",
              duration: 0.5,
              ease: "power2.out",
            });
          }
        },
        onEnterBack: () => {
          if (colorType === "accent") {
            gsap.to(sectionGlow, {
              background:
                "radial-gradient(circle, rgba(34,197,94,0.22), transparent 65%)",
              duration: 0.5,
              ease: "power2.out",
            });
          } else {
            gsap.to(sectionGlow, {
              background:
                "radial-gradient(circle, rgba(56,189,248,0.22), transparent 65%)",
              duration: 0.5,
              ease: "power2.out",
            });
          }
        },
      });
    });
  }

  // About: cards slide in with scrub timeline
  const about = document.querySelector("#about");
  if (about) {
    const tlAbout = gsap.timeline({
      scrollTrigger: {
        trigger: about,
        start: "top 80%",
        end: "bottom 60%",
        scrub: true,
      },
    });

    tlAbout
      .from(about.querySelector(".section-title"), {
        y: 40,
        opacity: 0,
      })
      .from(
        about.querySelector(".about-text"),
        {
          y: 40,
          opacity: 0,
        },
        "-=0.2"
      )
      .from(
        about.querySelectorAll(".about-card"),
        {
          y: 60,
          opacity: 0,
          stagger: 0.2,
        },
        "-=0.1"
      );
  }

  // Skills: scale-in bubbles with repeat-on-scroll
  const skills = document.querySelector("#skills");
  if (skills) {
    const skillBadges = skills.querySelectorAll(".skill-group");

    gsap.from(skillBadges, {
      scale: 0.9,
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: skills,
        start: "top 75%",
        end: "bottom 30%",
        toggleActions: "play reverse play reverse",
      },
    });

    // subtle float every time you scroll through
    skillBadges.forEach((group) => {
      gsap.to(group, {
        y: -8,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        scrollTrigger: {
          trigger: skills,
          start: "top bottom",
          end: "bottom top",
          scrub: false,
        },
      });
    });
  }

  // Projects: cards in + hover lift
  const projects = document.querySelector("#projects");
  if (projects) {
    const cards = projects.querySelectorAll(".project-card");

    const tlProj = gsap.timeline({
      scrollTrigger: {
        trigger: projects,
        start: "top 75%",
        end: "bottom 30%",
        scrub: true,
      },
    });

    tlProj.from(cards, {
      opacity: 0,
      y: 80,
      stagger: 0.2,
      ease: "power2.out",
    });

    // hover lift with GSAP
    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          y: -10,
          boxShadow: "0 18px 40px rgba(15,23,42,0.7)",
          duration: 0.25,
        });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          y: 0,
          boxShadow: "0 0 0 rgba(0,0,0,0)",
          duration: 0.25,
        });
      });
    });
  }

  // Experience: timeline grows and items fade in
  const exp = document.querySelector("#experience");
  if (exp) {
    const item = exp.querySelector(".exp-item");
    const line = exp.querySelector(".exp-timeline");

    if (line && item) {
      gsap.from(line, {
        borderLeftColor: "rgba(55,65,81,0)",
        scrollTrigger: {
          trigger: exp,
          start: "top 80%",
          end: "bottom 40%",
          scrub: true,
        },
      });

      gsap.from(item, {
        opacity: 0,
        y: 60,
        duration: 0.7,
        scrollTrigger: {
          trigger: item,
          start: "top 80%",
          end: "bottom 50%",
          scrub: true,
        },
      });
    }
  }

  // Contact: slide from bottom
  const contact = document.querySelector("#contact");
  if (contact) {
    const info = contact.querySelector(".contact-info");
    const form = contact.querySelector(".contact-form");

    gsap.from([info, form], {
      y: 80,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.15,
      scrollTrigger: {
        trigger: contact,
        start: "top 75%",
        end: "bottom 40%",
        scrub: true,
      },
    });
  }

  // Scroll-reactive header (small shrink)
  ScrollTrigger.create({
    start: 20,
    onEnter: () => document.body.classList.add("header-scrolled"),
    onLeaveBack: () => document.body.classList.remove("header-scrolled"),
  });

  // Contact form tiny feedback
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = contactForm.elements["name"].value.trim();
      const email = contactForm.elements["email"].value.trim();
      const message = contactForm.elements["message"].value.trim();

      if (!name || !email || !message) return;

      const to = "rana.suvajit7@gmail.com";
      const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      );

      const mailtoLink = `mailto:${to}?subject=${subject}&body=${body}`;

      gsap.fromTo(
        contactForm,
        { scale: 0.98 },
        { scale: 1, duration: 0.3, ease: "elastic.out(1, 0.5)" }
      );

      window.location.href = mailtoLink;
    });
  }

  // Keyboard focus indicator
  document.body.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      document.documentElement.classList.add("show-focus");
    }
  });
});
