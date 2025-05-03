export function generateAteezItemTemplate({ image, name }) {
  return `
      <div class="item">
        <img src="${image}" alt="${name}" />
        <p>${name}</p>
      </div>
    `;
}
