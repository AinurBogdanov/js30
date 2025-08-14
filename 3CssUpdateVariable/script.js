const inputs = document.querySelectorAll('.controls input');

function handleUpdate() {
  console.log('triggered');
  const suffix = this.dataset.sizing || '';
  document.documentElement.style.setProperty(
    `--${this.name}`,
    this.value + suffix
  );
}

inputs.forEach((input) => input.addEventListener('input', handleUpdate));
// inputs.forEach((input) => input.addEventListener('mousemove', handleUpdate));

// BADASS  COLOR #BADA55
