import { useState, useEffect } from 'react';
import './App.css';

// API Configuration
const API_KEY = 'T/0Qz2Rak0eQrVhj/yUDHw==YgFmWhSJUTOAuPRd';
const API_URL = 'https://api.api-ninjas.com/v1/animals';

// Fallback animal data
const fallbackAnimals = [
  {
    name: "Lion",
    taxonomy: { scientific_name: "Panthera leo", kingdom: "Animalia", phylum: "Chordata", class: "Mammalia", order: "Carnivora", family: "Felidae" },
    characteristics: { 
      habitat: "Savannas and grasslands", 
      diet: "Carnivore", 
      lifespan: "10-14 years in wild", 
      weight: "190 kg (male), 130 kg (female)",
      top_speed: "80 km/h",
      most_distinctive_feature: "Large mane on males",
      lifestyle: "Pride (social groups)",
      prey: "Zebras, wildebeest, antelopes"
    }
  },
  {
    name: "African Elephant",
    taxonomy: { scientific_name: "Loxodonta africana", kingdom: "Animalia", phylum: "Chordata", class: "Mammalia", order: "Proboscidea", family: "Elephantidae" },
    characteristics: { 
      habitat: "Savannas, forests, deserts", 
      diet: "Herbivore", 
      lifespan: "60-70 years", 
      weight: "4,000-7,000 kg",
      most_distinctive_feature: "Largest land animal",
      lifestyle: "Herds",
      prey: "None (herbivore)"
    }
  },
  {
    name: "Bengal Tiger",
    taxonomy: { scientific_name: "Panthera tigris tigris", kingdom: "Animalia", phylum: "Chordata", class: "Mammalia", order: "Carnivora", family: "Felidae" },
    characteristics: { 
      habitat: "Tropical forests, grasslands", 
      diet: "Carnivore", 
      lifespan: "10-15 years", 
      weight: "180-260 kg",
      top_speed: "65 km/h",
      most_distinctive_feature: "Orange coat with black stripes",
      lifestyle: "Solitary",
      prey: "Deer, wild boar, water buffalo"
    }
  },
  {
    name: "Bald Eagle",
    taxonomy: { scientific_name: "Haliaeetus leucocephalus", kingdom: "Animalia", phylum: "Chordata", class: "Aves", order: "Accipitriformes", family: "Accipitridae" },
    characteristics: { 
      habitat: "Near large bodies of water", 
      diet: "Carnivore", 
      lifespan: "20-30 years", 
      weight: "3-6.3 kg",
      top_speed: "160 km/h (diving)",
      most_distinctive_feature: "White head and tail",
      lifestyle: "Monogamous pairs",
      prey: "Fish, waterfowl, small mammals"
    }
  },
  {
    name: "Great White Shark",
    taxonomy: { scientific_name: "Carcharodon carcharias", kingdom: "Animalia", phylum: "Chordata", class: "Chondrichthyes", order: "Lamniformes", family: "Lamnidae" },
    characteristics: { 
      habitat: "Coastal surface waters", 
      diet: "Carnivore", 
      lifespan: "70+ years", 
      weight: "680-1,100 kg",
      top_speed: "56 km/h",
      most_distinctive_feature: "Large size and powerful jaws",
      lifestyle: "Solitary",
      prey: "Seals, sea lions, fish"
    }
  },
  {
    name: "Humpback Whale",
    taxonomy: { scientific_name: "Megaptera novaeangliae", kingdom: "Animalia", phylum: "Chordata", class: "Mammalia", order: "Cetacea", family: "Balaenopteridae" },
    characteristics: { 
      habitat: "Oceans worldwide", 
      diet: "Carnivore (krill, small fish)", 
      lifespan: "45-50 years", 
      weight: "25,000-30,000 kg",
      most_distinctive_feature: "Complex songs and acrobatic breaching",
      lifestyle: "Migratory pods",
      prey: "Krill, small fish"
    }
  },
  {
    name: "Giant Panda",
    taxonomy: { scientific_name: "Ailuropoda melanoleuca", kingdom: "Animalia", phylum: "Chordata", class: "Mammalia", order: "Carnivora", family: "Ursidae" },
    characteristics: { 
      habitat: "Mountain bamboo forests", 
      diet: "Herbivore (99% bamboo)", 
      lifespan: "20 years", 
      weight: "70-120 kg",
      most_distinctive_feature: "Black and white coloring",
      lifestyle: "Solitary",
      prey: "None (herbivore)"
    }
  },
  {
    name: "Emperor Penguin",
    taxonomy: { scientific_name: "Aptenodytes forsteri", kingdom: "Animalia", phylum: "Chordata", class: "Aves", order: "Sphenisciformes", family: "Spheniscidae" },
    characteristics: { 
      habitat: "Antarctic ice", 
      diet: "Carnivore (fish, squid)", 
      lifespan: "15-20 years", 
      weight: "22-45 kg",
      most_distinctive_feature: "Tallest and heaviest penguin",
      lifestyle: "Colonial breeding",
      prey: "Fish, krill, squid"
    }
  },
  {
    name: "Grizzly Bear",
    taxonomy: { scientific_name: "Ursus arctos horribilis", kingdom: "Animalia", phylum: "Chordata", class: "Mammalia", order: "Carnivora", family: "Ursidae" },
    characteristics: { 
      habitat: "Forests, mountains, tundra", 
      diet: "Omnivore", 
      lifespan: "20-25 years", 
      weight: "180-360 kg",
      top_speed: "56 km/h",
      most_distinctive_feature: "Shoulder hump and powerful build",
      lifestyle: "Solitary",
      prey: "Fish, small mammals, berries, roots"
    }
  },
  {
    name: "Cheetah",
    taxonomy: { scientific_name: "Acinonyx jubatus", kingdom: "Animalia", phylum: "Chordata", class: "Mammalia", order: "Carnivora", family: "Felidae" },
    characteristics: { 
      habitat: "Savanna, grasslands", 
      diet: "Carnivore", 
      lifespan: "10-12 years", 
      weight: "34-54 kg",
      top_speed: "120 km/h",
      most_distinctive_feature: "Fastest land animal",
      lifestyle: "Solitary or small groups",
      prey: "Gazelles, impalas, young wildebeest"
    }
  },
  {
    name: "Bottlenose Dolphin",
    taxonomy: { scientific_name: "Tursiops truncatus", kingdom: "Animalia", phylum: "Chordata", class: "Mammalia", order: "Cetacea", family: "Delphinidae" },
    characteristics: { 
      habitat: "Temperate and tropical oceans", 
      diet: "Carnivore", 
      lifespan: "40-50 years", 
      weight: "150-650 kg",
      top_speed: "30 km/h",
      most_distinctive_feature: "High intelligence and echolocation",
      lifestyle: "Social pods",
      prey: "Fish, squid, crustaceans"
    }
  },
  {
    name: "Komodo Dragon",
    taxonomy: { scientific_name: "Varanus komodoensis", kingdom: "Animalia", phylum: "Chordata", class: "Reptilia", order: "Squamata", family: "Varanidae" },
    characteristics: { 
      habitat: "Indonesian islands", 
      diet: "Carnivore", 
      lifespan: "30 years", 
      weight: "70-90 kg",
      top_speed: "20 km/h",
      most_distinctive_feature: "Largest living lizard",
      lifestyle: "Solitary",
      prey: "Deer, pigs, water buffalo, carrion"
    }
  }
];

function AnimalCard({ animal, onClick }) {
  const taxonomy = animal.taxonomy || {};
  
  return (
    <div className="animal-card" onClick={() => onClick(animal)}>
      <div className="card-content">
        <div className="animal-name">{animal.name || 'Unknown'}</div>
        {taxonomy.scientific_name && (
          <div className="animal-scientific">{taxonomy.scientific_name}</div>
        )}
      </div>
    </div>
  );
}

function AnimalDetail({ animal, onBack }) {
  const characteristics = animal.characteristics || {};
  const taxonomy = animal.taxonomy || {};
  
  const getCharacteristicsTags = () => {
    const tags = [];
    if (characteristics.most_distinctive_feature) tags.push(characteristics.most_distinctive_feature);
    if (characteristics.lifestyle) tags.push(characteristics.lifestyle);
    if (characteristics.type) tags.push(characteristics.type);
    return tags;
  };

  return (
    <div className="detail-page">
      <button className="back-button" onClick={onBack}>← Back to Animals</button>
      
      <div className="detail-container">
        <div className="detail-content">
          <h2 className="detail-name">{animal.name || 'Unknown'}</h2>
          {taxonomy.scientific_name && (
            <div className="detail-scientific">{taxonomy.scientific_name}</div>
          )}
          
          <div className="detail-info">
            {taxonomy.kingdom && (
              <div className="info-section">
                <div className="info-label">Kingdom:</div>
                <div className="info-value">{taxonomy.kingdom}</div>
              </div>
            )}
            
            {taxonomy.class && (
              <div className="info-section">
                <div className="info-label">Class:</div>
                <div className="info-value">{taxonomy.class}</div>
              </div>
            )}
            
            {taxonomy.order && (
              <div className="info-section">
                <div className="info-label">Order:</div>
                <div className="info-value">{taxonomy.order}</div>
              </div>
            )}
            
            {taxonomy.family && (
              <div className="info-section">
                <div className="info-label">Family:</div>
                <div className="info-value">{taxonomy.family}</div>
              </div>
            )}
            
            {characteristics.prey && (
              <div className="info-section">
                <div className="info-label">Prey:</div>
                <div className="info-value">{characteristics.prey}</div>
              </div>
            )}
            
            {characteristics.diet && (
              <div className="info-section">
                <div className="info-label">Diet:</div>
                <div className="info-value">{characteristics.diet}</div>
              </div>
            )}
            
            {characteristics.habitat && (
              <div className="info-section">
                <div className="info-label">Habitat:</div>
                <div className="info-value">{characteristics.habitat}</div>
              </div>
            )}
            
            {characteristics.lifespan && (
              <div className="info-section">
                <div className="info-label">Lifespan:</div>
                <div className="info-value">{characteristics.lifespan}</div>
              </div>
            )}
            
            {characteristics.weight && (
              <div className="info-section">
                <div className="info-label">Weight:</div>
                <div className="info-value">{characteristics.weight}</div>
              </div>
            )}
            
            {characteristics.top_speed && (
              <div className="info-section">
                <div className="info-label">Top Speed:</div>
                <div className="info-value">{characteristics.top_speed}</div>
              </div>
            )}
          </div>
          
          {getCharacteristicsTags().length > 0 && (
            <div className="characteristics">
              <div className="char-title">Key Features:</div>
              <div className="char-tags">
                {getCharacteristicsTags().map((tag, idx) => (
                  <span key={idx} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function App() {
  const [allAnimals, setAllAnimals] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [usingFallback, setUsingFallback] = useState(false);
  const [error, setError] = useState('');
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [allSearchResults, setAllSearchResults] = useState([]);
  const [sortBy, setSortBy] = useState('none');
  const animalsPerPage = 9;

  const suggestions = ['lion', 'elephant', 'shark', 'eagle', 'tiger', 'whale', 'penguin'];

  useEffect(() => {
    loadAnimals();
  }, []);

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // Extract numeric value from lifespan string for sorting
  const extractLifespanYears = (lifespan) => {
    if (!lifespan) return 0;
    const match = lifespan.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };

  // Sort animals based on selected criteria
  const sortAnimals = (animals, sortType) => {
    if (sortType === 'none') return animals;
    
    const sorted = [...animals];
    
    if (sortType === 'class') {
      sorted.sort((a, b) => {
        const classA = a.taxonomy?.class || '';
        const classB = b.taxonomy?.class || '';
        return classA.localeCompare(classB);
      });
    } else if (sortType === 'lifespan') {
      sorted.sort((a, b) => {
        const lifespanA = extractLifespanYears(a.characteristics?.lifespan);
        const lifespanB = extractLifespanYears(b.characteristics?.lifespan);
        return lifespanB - lifespanA; // Descending order (longest first)
      });
    }
    
    return sorted;
  };

  const loadAnimals = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const testResponse = await fetch(`${API_URL}?name=lion`, {
        method: 'GET',
        headers: {
          'X-Api-Key': API_KEY
        }
      });

      if (testResponse.ok) {
        await loadFromAPI();
      } else {
        throw new Error('API not accessible');
      }
    } catch (error) {
      console.log('Using fallback data due to:', error.message);
      loadFallbackData();
    }
  };

  const loadFromAPI = async () => {
    const animalNames = ['lion', 'elephant', 'tiger', 'eagle', 'shark', 'whale', 'penguin', 'bear', 'cheetah'];
    const results = [];
    
    for (const name of animalNames) {
      try {
        const response = await fetch(`${API_URL}?name=${name}`, {
          method: 'GET',
          headers: {
            'X-Api-Key': API_KEY
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) {
            results.push(data[0]);
          }
        }
        await delay(150);
      } catch (error) {
        console.error(`Error fetching ${name}:`, error);
      }
    }
    
    if (results.length > 0) {
      setAllAnimals(results);
      setAllSearchResults(results);
      setUsingFallback(false);
      setIsLoading(false);
      setCurrentPage(1);
    } else {
      loadFallbackData();
    }
  };

  const loadFallbackData = () => {
    setAllAnimals(fallbackAnimals);
    setAllSearchResults(fallbackAnimals);
    setUsingFallback(true);
    setIsLoading(false);
    setCurrentPage(1);
  };

  const handleSearch = async () => {
    const searchTerm = searchInput.trim().toLowerCase();
    setError('');
    setCurrentPage(1);
    
    if (!searchTerm) {
      setAllSearchResults(allAnimals);
      return;
    }

    if (usingFallback) {
      const filtered = allAnimals.filter(animal => 
        animal.name.toLowerCase().includes(searchTerm)
      );
      setAllSearchResults(filtered);
      return;
    }

    await searchAnimals(searchTerm);
  };

  const searchAnimals = async (animalName) => {
    if (isLoading) return;
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${API_URL}?name=${encodeURIComponent(animalName)}`, {
        method: 'GET',
        headers: {
          'X-Api-Key': API_KEY
        }
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      setAllSearchResults(data);
      
    } catch (error) {
      console.error('Error searching animals:', error);
      setError('Failed to search. Try again or use the animals already loaded.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (animal) => {
    setSearchInput(animal);
    const searchTerm = animal.toLowerCase();
    setError('');
    setCurrentPage(1);
    
    if (usingFallback) {
      const filtered = allAnimals.filter(a => 
        a.name.toLowerCase().includes(searchTerm)
      );
      setAllSearchResults(filtered);
    } else {
      searchAnimals(searchTerm);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleAnimalClick = (animal) => {
    setSelectedAnimal(animal);
  };

  const handleBack = () => {
    setSelectedAnimal(null);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  // Apply sorting to results
  const sortedResults = sortAnimals(allSearchResults, sortBy);

  // Pagination calculations
  const totalPages = Math.ceil(sortedResults.length / animalsPerPage);
  const startIndex = (currentPage - 1) * animalsPerPage;
  const endIndex = startIndex + animalsPerPage;
  const currentAnimals = sortedResults.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (selectedAnimal) {
    return <AnimalDetail animal={selectedAnimal} onBack={handleBack} />;
  }

  return (
    <div className="container">
      <header>
        <h1>🦁 AnimalDex 🐘</h1>
        <p className="subtitle">Discover fascinating facts about animals from around the world</p>
        
        <div className="search-container">
          <input 
            type="text" 
            id="searchInput"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search for an animal (e.g., lion, eagle, shark)..."
          />
          <button id="searchBtn" onClick={handleSearch}>Search</button>
          <select id="sortSelect" value={sortBy} onChange={handleSortChange} className="sort-select">
            <option value="none">Sort: Default</option>
            <option value="lifespan">Sort: Lifespan</option>
            <option value="top_speed">Sort: Top Speed</option>
            <option value="weight">Sort: Weight</option>
          </select>
        </div>

        <div className="suggestions">
          <span className="suggestion-label">Try:</span>
          {suggestions.map((animal, idx) => (
            <button 
              key={idx}
              className="suggestion-btn" 
              onClick={() => handleSuggestionClick(animal)}
            >
              {animal.charAt(0).toUpperCase() + animal.slice(1)}
            </button>
          ))}
        </div>
      </header>

      <div className="animal-grid">
        {isLoading ? (
          <div className="loading">🔍 Loading animals...</div>
        ) : error ? (
          <div className="error">⚠️ {error}</div>
        ) : currentAnimals.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🦘</div>
            <div className="empty-state-text">
              {searchInput ? `No animals found for "${searchInput}"` : 'No animals to display'}
            </div>
            <p style={{ color: '#999', marginTop: '10px' }}>Try searching for another animal</p>
          </div>
        ) : (
          currentAnimals.map((animal, idx) => (
            <AnimalCard key={idx} animal={animal} onClick={handleAnimalClick} />
          ))
        )}
      </div>

      {!isLoading && !error && sortedResults.length > 0 && (
        <div className="pagination">
          <button 
            className="pagination-btn" 
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            ← Previous
          </button>
          
          <span className="pagination-info">
            Page {currentPage} of {totalPages} ({sortedResults.length} animals)
          </span>
          
          <button 
            className="pagination-btn" 
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
