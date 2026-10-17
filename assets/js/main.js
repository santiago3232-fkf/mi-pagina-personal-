/**
 * Portafolio Personal - Santiago Gutiérrez
 * Lógica interactiva para navegación, modales, copia rápida y enlaces de contacto
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navegación móvil
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 2. Efecto Header al hacer scroll
  const siteHeader = document.getElementById('siteHeader');
  const backToTopBtn = document.getElementById('backToTopBtn');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    // Header sombreado
    if (siteHeader) {
      if (scrollPos > 30) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }

    // Botón volver arriba
    if (backToTopBtn) {
      if (scrollPos > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 3. Scrollspy activo con IntersectionObserver
  const sections = document.querySelectorAll('section[id]');
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  // 4. Toast Notification
  const toast = document.getElementById('toastNotice');
  const toastMsg = document.getElementById('toastMsg');
  let toastTimer = null;

  function showToast(message) {
    if (!toast || !toastMsg) return;
    toastMsg.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // 5. Copiar al Portapapeles (Email y Teléfono)
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const email = 'san.18gutierrez@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('¡Correo copiado al portapapeles!');
      }).catch(() => {
        showToast('Correo: ' + email);
      });
    });
  }

  // 6. Modales (Comedor Escolar & CV)
  const modalComedor = document.getElementById('modalComedor');
  const modalCV = document.getElementById('modalCV');
  const openComedorBtns = document.querySelectorAll('.open-modal-comedor');
  const openCVBtns = document.querySelectorAll('.open-modal-cv');
  const closeModals = document.querySelectorAll('.modal-close');

  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  openComedorBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(modalComedor);
    });
  });

  openCVBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(modalCV);
    });
  });

  closeModals.forEach(btn => {
    btn.addEventListener('click', () => {
      closeModal(modalComedor);
      closeModal(modalCV);
    });
  });

  // Cerrar al hacer click fuera del contenido
  [modalComedor, modalCV].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeModal(modal);
        }
      });
    }
  });

  // Cerrar con tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal(modalComedor);
      closeModal(modalCV);
    }
  });

  // 7. Enviar Mensaje Rápido por WhatsApp o Correo
  const quickMsgForm = document.getElementById('quickMsgForm');
  if (quickMsgForm) {
    quickMsgForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('msgName')?.value.trim() || 'Un visitante';
      const subject = document.getElementById('msgSubject')?.value.trim() || 'Contacto desde tu portafolio';
      const message = document.getElementById('msgBody')?.value.trim() || 'Hola Santiago, me gustaría contactarte.';

      const formattedText = `Hola Santiago! Mi nombre es ${name}. Asunto: ${subject}. Mensaje: ${message}`;
      const waUrl = `https://wa.me/573224045855?text=${encodeURIComponent(formattedText)}`;
      
      window.open(waUrl, '_blank');
      showToast('Redirigiendo a WhatsApp...');
    });
  }

  // Botón alternativo de enviar por correo desde el form rápido
  const sendViaEmailBtn = document.getElementById('sendViaEmailBtn');
  if (sendViaEmailBtn) {
    sendViaEmailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const name = document.getElementById('msgName')?.value.trim() || 'Un visitante';
      const subject = document.getElementById('msgSubject')?.value.trim() || 'Contacto desde tu portafolio';
      const message = document.getElementById('msgBody')?.value.trim() || 'Hola Santiago, me gustaría contactarte.';

      const fullSubject = `[Portafolio] ${subject} - De: ${name}`;
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=san.18gutierrez@gmail.com&su=${encodeURIComponent(fullSubject)}&body=${encodeURIComponent(message)}`;
      
      window.open(gmailUrl, '_blank');
      showToast('Abriendo Gmail...');
    });
  }
});
