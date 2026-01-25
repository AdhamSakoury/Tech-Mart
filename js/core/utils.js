//  Reander Header and Footer Partials
export async function loadPartial(id, file) {
  try {
    const response = await fetch(file);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const html = await response.text();
    const target = document.getElementById(id);
    if (target) target.innerHTML = html;
  } catch (e) {
    console.error(`Failed to load ${file}:`, e);
  }
}
