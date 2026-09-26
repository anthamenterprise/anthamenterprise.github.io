/**
 * ANTHAM ENTERPRISE - Production Client-Side Utilities
 * Handles mobile navigation, header elevation, and GitHub Pages static RFQ generation.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initHeaderScroll();
  initContactForms();
  initCurrentYear();
});

// Mobile Navigation Toggle
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', !isExpanded);
    navLinks.classList.toggle('open');
  });

  // Close menu when tapping any navigation link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu when tapping anywhere outside
  document.addEventListener('click', (e) => {
    if (!toggleBtn.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

// Header Elevation on Scroll
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

// Inquiry Form to WhatsApp / Mailto (Static GitHub Pages compliant)
function initContactForms() {
  const rfqForm = document.getElementById('rfqForm');
  const vendorForm = document.getElementById('vendorForm');
  const waBtn = document.getElementById('whatsappSubmitBtn');

  if (rfqForm) {
    rfqForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleFormDispatch(rfqForm, 'Procurement Requirement', false);
    });

    if (waBtn) {
      waBtn.addEventListener('click', (e) => {
        e.preventDefault();
        handleFormDispatch(rfqForm, 'Procurement Requirement', true);
      });
    }
  }

  if (vendorForm) {
    vendorForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleFormDispatch(vendorForm, 'Vendor / Partner Registration', false);
    });
  }
}

function handleFormDispatch(form, subjectPrefix, forceWhatsApp = false) {
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  // =========================================================
  // ANTHAM ENTERPRISE CONTACT CONFIGURATION
  // =========================================================

  const businessWhatsAppNumber = "919875421001";
  const businessEmailAddress = "anthamenterprise2024@gmail.com";

  // =========================================================
  // BUILD MESSAGE
  // =========================================================

  const plainMessageBody = `
ANTHAM ENTERPRISE - ${subjectPrefix.toUpperCase()}

Name: ${data.name || "N/A"}
Organisation: ${data.organisation || "N/A"}
Phone: ${data.phone || "N/A"}
Email: ${data.email || "N/A"}
Category / Requirement: ${data.requirement || data.category || "General Sourcing"}
Location / District: ${data.location || "West Bengal"}

Requirement Details:
${data.message || "Please contact us regarding procurement requirements."}

---------------------------------------
Generated via Antham Enterprise Website
  `.trim();

  // =========================================================
  // WHATSAPP
  // =========================================================

  if (forceWhatsApp) {
    const encodedWa = encodeURIComponent(
      `*ANTHAM ENTERPRISE - ${subjectPrefix.toUpperCase()}*\n\n` +
      `*Name:* ${data.name || "N/A"}\n` +
      `*Organisation:* ${data.organisation || "N/A"}\n` +
      `*Phone:* ${data.phone || "N/A"}\n` +
      `*Email:* ${data.email || "N/A"}\n` +
      `*Category/Requirement:* ${data.requirement || data.category || "General Sourcing"}\n` +
      `*Location/District:* ${data.location || "West Bengal"}\n\n` +
      `*Requirement Details:*\n${data.message || "Please contact us regarding procurement requirements."}\n\n` +
      `Generated via Antham Enterprise Website`
    );

    window.open(
      `https://wa.me/${businessWhatsAppNumber}?text=${encodedWa}`,
      "_blank",
      "noopener,noreferrer"
    );

    return;
  }

  // =========================================================
  // EMAIL
  // =========================================================

  const mailSubject =
    `[Antham Enterprise RFQ] ${data.requirement || subjectPrefix} - ${data.organisation || data.name}`;

  const encodedSubject = encodeURIComponent(mailSubject);
  const encodedBody = encodeURIComponent(plainMessageBody);

  // Gmail Web Compose
  const gmailUrl =
    `https://mail.google.com/mail/?view=cm&fs=1` +
    `&to=${encodeURIComponent(businessEmailAddress)}` +
    `&su=${encodedSubject}` +
    `&body=${encodedBody}`;

  window.open(gmailUrl, "_blank", "noopener,noreferrer");
}
// Auto-update footer copyright year
function initCurrentYear() {
  const yearSpans = document.querySelectorAll('.current-year');
  const currentYear = new Date().getFullYear();
  yearSpans.forEach(span => {
    span.textContent = currentYear;
  });
}
