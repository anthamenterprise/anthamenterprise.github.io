/**
 * ANTHAM ENTERPRISE - Mobile Navigation & Static RFQ Dispatcher
 * Vanilla JavaScript (Zero Dependencies, Fully Compatible with GitHub Pages)
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileDrawer();
  initHeaderScroll();
  initStaticForms();
  initCurrentYear();
});

// Mobile Off-Canvas Drawer Navigation
function initMobileDrawer() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const closeBtn = document.querySelector('.mobile-close-btn');
  const navLinks = document.querySelector('.nav-links');
  const backdrop = document.querySelector('.nav-backdrop');

  if (!toggleBtn || !navLinks) return;

  const openMenu = () => {
    navLinks.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; // Prevents background scroll
  };

  const closeMenu = () => {
    navLinks.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (backdrop) backdrop.addEventListener('click', closeMenu);

  // Close when tapping any link inside the mobile menu
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      closeMenu();
    }
  });
}

// Header Elevation on Scroll
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// Static Form Handlers (Converts Form Input into WhatsApp & Mailto Links)
function initStaticForms() {
  const rfqForm = document.getElementById('rfqForm');
  const vendorForm = document.getElementById('vendorForm');
  const waBtn = document.getElementById('whatsappSubmitBtn');

  if (rfqForm) {
    rfqForm.addEventListener('submit', (e) => {
      e.preventDefault();
      dispatchStaticMessage(rfqForm, 'Procurement Requirement', false);
    });

    if (waBtn) {
      waBtn.addEventListener('click', (e) => {
        e.preventDefault();
        dispatchStaticMessage(rfqForm, 'Procurement Requirement', true);
      });
    }
  }

  if (vendorForm) {
    vendorForm.addEventListener('submit', (e) => {
      e.preventDefault();
      dispatchStaticMessage(vendorForm, 'Vendor Partner Registration', false);
    });
  }
}

function dispatchStaticMessage(form, subjectPrefix, useWhatsApp = false) {
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  // Business Configuration Placeholders
  const businessWhatsApp = "+919875421001"; // International format without +
  const businessEmail = "anthamenterprise2024@gmail.com";

  const messageText = `*ANTHAM ENTERPRISE - ${subjectPrefix.toUpperCase()}*
----------------------------------------
*Name:* ${data.name || 'N/A'}
*Organisation:* ${data.organisation || 'N/A'}
*Phone:* ${data.phone || 'N/A'}
*Email:* ${data.email || 'N/A'}
*Category/Scope:* ${data.requirement || data.category || 'General Sourcing'}
*Site/Location:* ${data.location || 'West Bengal'}
*Message/Details:*
${data.message || 'Please contact regarding requirement.'}
----------------------------------------
Transmitted via Antham Enterprise Static Web Portal`;

  if (useWhatsApp) {
    const encoded = encodeURIComponent(messageText);
    window.open(`https://wa.me/${businessWhatsApp}?text=${encoded}`, '_blank', 'noopener,noreferrer');
  } else {
    const subject = encodeURIComponent(`[Antham Enterprise RFQ] ${data.requirement || subjectPrefix} - ${data.organisation || data.name}`);
    const body = encodeURIComponent(messageText);
    window.location.href = `mailto:${businessEmail}?subject=${subject}&body=${body}`;
  }
}

// Auto-update footer copyright year
function initCurrentYear() {
  const spans = document.querySelectorAll('.current-year');
  const year = new Date().getFullYear();
  spans.forEach(span => {
    span.textContent = year;
  });
}
