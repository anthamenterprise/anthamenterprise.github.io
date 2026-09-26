/**
 * ANTHAM ENTERPRISE - Production Client-Side Utilities
 * Handles mobile navigation, header dynamics, and static form-to-WhatsApp/Email generator.
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

  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', !isExpanded);
    navLinks.classList.toggle('open');
  });

  // Close menu on navigation click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu on click outside
  document.addEventListener('click', (e) => {
    if (!toggleBtn.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('open')) {
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

  if (rfqForm) {
    rfqForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleFormDispatch(rfqForm, 'Procurement Requirement');
    });

    const waBtn = document.getElementById('whatsappSubmitBtn');
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
      handleFormDispatch(vendorForm, 'Vendor / Partner Registration');
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

  // Configured Placeholders for Antham Enterprise
  // Replace these with actual business details prior to production
  const businessWhatsAppNumber = "+919875421001"; // International format without +
  const businessEmailAddress = "anthamenterprise2024@gmail.com";

  const messageBody = `*ANTHAM ENTERPRISE - ${subjectPrefix.toUpperCase()}*
---------------------------------------
*Name:* ${data.name || 'N/A'}
*Organisation:* ${data.organisation || 'N/A'}
*Phone:* ${data.phone || 'N/A'}
*Email:* ${data.email || 'N/A'}
*Category/Requirement:* ${data.requirement || data.category || 'General Sourcing'}
*Location/District:* ${data.location || 'West Bengal'}
*Message/Details:*
${data.message || 'Please contact us regarding procurement requirements.'}
---------------------------------------
Generated via Antham Enterprise Web Portal`;

  if (forceWhatsApp) {
    const encodedWa = encodeURIComponent(messageBody);
    const waUrl = `https://wa.me/${businessWhatsAppNumber}?text=${encodedWa}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  } else {
    // Generate Mailto Fallback
    const mailSubject = encodeURIComponent(`[Antham Enterprise RFQ] ${data.requirement || subjectPrefix} - ${data.organisation || data.name}`);
    const mailBody = encodeURIComponent(messageBody);
    const mailtoUrl = `mailto:${businessEmailAddress}?subject=${mailSubject}&body=${mailBody}`;
    window.location.href = mailtoUrl;
  }
}

// Auto-update footer copyright year
function initCurrentYear() {
  const yearSpans = document.querySelectorAll('.current-year');
  const currentYear = new Date().getFullYear();
  yearSpans.forEach(span => {
    span.textContent = currentYear;
  });
}
