// Turkish phone input: "+90 5XX XXX XX XX"
// Usage: <input type="tel" data-phone-tr ...> — formatting is attached automatically.
const TR_PHONE_PATTERN = '\\+90 [2-5][0-9]{2} [0-9]{3} [0-9]{2} [0-9]{2}';
const TR_PHONE_REGEX = new RegExp(`^${TR_PHONE_PATTERN}$`);

// Accepts any input ("05551234567", "+90 555...", "555 123 45 67") and returns "+90 555 123 45 67"
function formatTrPhone(value) {
    let digits = String(value || '').replace(/\D/g, '');
    if (digits.startsWith('90')) {
        digits = digits.slice(2);
    }
    digits = digits.replace(/^0+/, '').slice(0, 10);
    if (!digits) return '';

    const parts = [digits.slice(0, 3), digits.slice(3, 6), digits.slice(6, 8), digits.slice(8, 10)].filter(Boolean);
    return '+90 ' + parts.join(' ');
}

function isValidTrPhone(value) {
    return TR_PHONE_REGEX.test(value);
}

function initTrPhoneInput(input) {
    input.setAttribute('inputmode', 'tel');
    input.setAttribute('maxlength', '17');
    input.setAttribute('placeholder', '+90 5XX XXX XX XX');
    // Native form validation (works for values set from code too)
    input.setAttribute('pattern', TR_PHONE_PATTERN);
    input.setAttribute('title', 'Telefon numarası +90 5XX XXX XX XX biçiminde olmalı');

    input.addEventListener('focus', function() {
        if (!this.value) this.value = '+90 ';
    });
    input.addEventListener('blur', function() {
        if (this.value.trim() === '+90') this.value = '';
    });
    input.addEventListener('input', function() {
        const formatted = formatTrPhone(this.value);
        this.value = formatted || (document.activeElement === this ? '+90 ' : '');
    });

    // Normalize a value that may already be filled in (e.g. old "0555 123 45 67")
    input.value = formatTrPhone(input.value);
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('input[data-phone-tr]').forEach(initTrPhoneInput);
});
