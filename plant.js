const API_KEY = 'sk-TVI66885fc4f5460011577'; // 🔑 Replace with your actual key

// --- Search logic (on index.html) ---
if (location.pathname.endsWith('index.html') || location.pathname === '/' || location.pathname.endsWith('/')) {
  const input = document.getElementById('searchInput');
  const button = document.getElementById('searchBtn');

  button.addEventListener('click', () => {
    const query = input.value.trim();
    if (query) {
      localStorage.setItem('plantQuery', query);
      location.href = 'plant.html';
    }
  });

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      button.click();
    }
  });
}

// --- Plant info page logic (on plant.html) ---
if (location.pathname.endsWith('plant.html')) {
  const query = localStorage.getItem('plantQuery');
  const plantDetailsDiv = document.getElementById('plantDetails');

  async function fetchPlantDetails() {
    if (!query) {
      plantDetailsDiv.innerHTML = '<p class="text-red-600">No plant name provided.</p>';
      return;
    }

    try {
      // Step 1: Get plant ID
      const searchRes = await fetch(`https://perenual.com/api/v2/species-list?key=${API_KEY}&q=${query}`);
      const searchData = await searchRes.json();
      const plant = searchData.data[0];

      if (!plant) {
        plantDetailsDiv.innerHTML = '<p class="text-red-600">No plant found with that name.</p>';
        return;
      }

      // Step 2: Get full plant details
      const detailRes = await fetch(`https://perenual.com/api/v2/species/details/${plant.id}?key=${API_KEY}`);
      const details = await detailRes.json();

      // Step 3: Render all plant information
      plantDetailsDiv.innerHTML = `
        <!-- Title Section -->
        <div class="mb-6">
          <h2 class="text-3xl font-bold text-green-800 mb-2">${details.common_name || 'No Name Found'}</h2>
          <p class="italic text-gray-600">Scientific Name: ${details.scientific_name || 'N/A'}</p>
        </div>

        <!-- Image + Description Grid -->
        <div class="flex flex-col md:flex-row gap-6 mb-6">
          <img src="${details.default_image?.original_url || ''}" alt="${details.common_name}" class="rounded-lg shadow-md h-72 w-72 object-cover" />

          <div class="flex-1">
            <p><strong>🌿 Description:</strong> ${details.description || 'No description available.'}</p>
          </div>
        </div>

        <!-- Other Plant Details -->
        <div class="text-sm md:text-base space-y-2">
          <p><strong>🪴 Type:</strong> ${details.type || 'N/A'}</p>
          <p><strong>📅 Cycle:</strong> ${details.cycle || 'N/A'}</p>
          <p><strong>🏠 Indoor Plant:</strong> ${details.indoor ? 'Yes' : 'No'}</p>
          <p><strong>💧 Watering:</strong> ${details.watering || 'N/A'}</p>
          <p><strong>☀️ Sunlight:</strong> ${Array.isArray(details.sunlight) ? details.sunlight.join(', ') : details.sunlight || 'N/A'}</p>
          <p><strong>🧑‍🌾 Maintenance Level:</strong> ${details.maintenance || 'N/A'}</p>
          <p><strong>🪻 Flower Color:</strong> ${details.flower_color || 'N/A'}</p>
          <p><strong>🍃 Leaf Color:</strong> ${details.leaf_color || 'N/A'}</p>
          <p><strong>🌼 Blooming Season:</strong> ${details.blooming_season || 'N/A'}</p>
          <p><strong>📦 Propagation:</strong> ${details.propagation?.join(', ') || 'N/A'}</p>
          <p><strong>✂️ Pruning Months:</strong> ${details.pruning_month?.join(', ') || 'N/A'}</p>
          <p><strong>🧬 Growth Rate:</strong> ${details.growth_rate || 'N/A'}</p>
          <p><strong>🌍 Suitable Soil:</strong> ${details.soil || 'N/A'}</p>
          <p><strong>🦋 Attracts:</strong> ${details.attracts?.join(', ') || 'N/A'}</p>
          <p><strong>🧪 Medicinal:</strong> ${details.medicinal ? 'Yes' : 'No'}</p>
          <p><strong>🐾 Poisonous to Pets:</strong> ${details.poisonous_to_pets ? 'Yes' : 'No'}</p>
        </div>
      `;

    } catch (error) {
      console.error('Fetch error:', error);
      plantDetailsDiv.innerHTML = '<p class="text-red-600">Failed to load plant information.</p>';
    }
  }

  fetchPlantDetails();
}