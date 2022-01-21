export function validatePhone(e) {
  if (e.target.validity.patternMismatch || !e.target.value) {
    e.target.setCustomValidity("Format: +1 (818) 456-7890");
  } else {
    e.target.setCustomValidity("");
    e.preventDefault();
  }
}
