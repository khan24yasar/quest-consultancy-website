// Base API URL: Automaticallyconst API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:5000/api'
  : 'https://quest-consultancy-backend-xxxx.onrender.com/api'; // <-- Paste your exact Render URL here switches between local testing and production
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:5000/api'
  : 'https://quest-consultancy-backend.onrender.com/api';

// 1. Mobile Menu Toggle
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');

mobileToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// 2. Contact & Enquiry Form Submission
const enquiryForm = document.getElementById('enquiryForm');
const submitBtn = document.getElementById('submitBtn');
const formFeedback = document.getElementById('formFeedback');

enquiryForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  submitBtn.disabled = true;
  submitBtn.innerText = 'Transmitting...';
  formFeedback.className = 'feedback-msg';
  formFeedback.style.display = 'none';

  const payload = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    service: document.getElementById('service').value,
    message: document.getElementById('message').value,
  };

  try {
    const response = await fetch(`${API_BASE_URL}/enquiry`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      formFeedback.innerText = data.message;
      formFeedback.classList.add('success');
      formFeedback.style.display = 'block';
      enquiryForm.reset();
    } else {
      throw new Error(data.error || 'Failed to submit enquiry.');
    }
  } catch (err) {
    formFeedback.innerText = err.message || 'Connection error. Please ensure backend is running or reach out via WhatsApp.';
    formFeedback.classList.add('error');
    formFeedback.style.display = 'block';
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerText = 'Submit Inquiry';
  }
});

// 3. Automated FAQ Chatbot Widget Logic
const chatToggle = document.getElementById('chatToggle');
const chatClose = document.getElementById('chatClose');
const chatWidget = document.getElementById('chatWidget');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatMessages = document.getElementById('chatMessages');

chatToggle.addEventListener('click', () => chatWidget.classList.toggle('hidden'));
chatClose.addEventListener('click', () => chatWidget.classList.add('hidden'));

chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const text = chatInput.value.trim();
  if (!text) return;

  // Add user message to UI
  appendMessage(text, 'user');
  chatInput.value = '';

  try {
    const res = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: text }),
    });
    const data = await res.json();
    appendMessage(data.reply, 'bot');
  } catch (err) {
    appendMessage('I am having trouble connecting to the advisory server. Please reach out via WhatsApp.', 'bot');
  }
});

function appendMessage(text, sender) {
  const msgEl = document.createElement('div');
  msgEl.className = `msg ${sender}`;
  msgEl.innerText = text;
  chatMessages.appendChild(msgEl);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}