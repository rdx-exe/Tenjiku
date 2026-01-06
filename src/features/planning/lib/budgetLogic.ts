export interface Destination {
  name: string;
  lat: number;
  lng: number;
  dailyCostPerPerson: number;
  image: string;
  description: string;
  rating: string;
  category: string;
  isFallback?: boolean;
  budgetLevel?: 'low' | 'mid' | 'high';
  details?: string;
}

export interface PlanTripResult extends Destination {
  distance: number;
  duration: string;
  isFallback: boolean;
}

const AVG_COST_PER_KM = 5; // INR per KM

const getDemoImage = (name: string) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = (Math.abs(hash) % 8) + 1;
  return `/exe/${index}.jpeg`;
};

const BENGALURU_DEMO_DATA: Destination[] = [
  // SPIRITUAL
  {
    name: "ISKCON Temple", lat: 13.0102, lng: 77.5511, dailyCostPerPerson: 2000,
    image: "https://images.unsplash.com/photo-1600011689032-8b628b8a8747?w=800&q=80",
    description: "A beautiful spiritual retreat in the heart of the city.",
    rating: "4.8", category: "Spiritual India", budgetLevel: 'low',
    details: "Distance: 5km | Travel: ₹150 | Stay: ₹1200 | Food: ₹600 | Total: ₹1900-2000"
  },
  {
    name: "Bull Temple", lat: 12.9422, lng: 77.5681, dailyCostPerPerson: 2000,
    image: "https://images.unsplash.com/photo-1544735716-11f8e658c353?w=800&q=80",
    description: "One of the oldest temples in Bengaluru, dedicated to Nandi.",
    rating: "4.6", category: "Spiritual India", budgetLevel: 'low',
    details: "Distance: 6km | Travel: ₹150 | Stay: ₹1200 | Food: ₹600 | Total: ₹1900-2000"
  },
  {
    name: "Shravanabelagola", lat: 12.8572, lng: 76.4862, dailyCostPerPerson: 3500,
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80",
    description: "Famous for the Gommateshwara statue, a major Jain pilgrimage site.",
    rating: "4.7", category: "Spiritual India", budgetLevel: 'mid',
    details: "Distance: 145km | Travel: ₹600-900 | Stay: ₹1800-2200 | Food: ₹800 | Total: ₹3200-3900"
  },
  {
    name: "Melukote", lat: 12.6644, lng: 76.6547, dailyCostPerPerson: 3400,
    image: "https://images.unsplash.com/photo-1624513697968-3e4b476e336d?w=800&q=80",
    description: "A sacred hill town with historic temples and beautiful scenery.",
    rating: "4.5", category: "Spiritual India", budgetLevel: 'mid',
    details: "Distance: 150km | Travel: ₹600-900 | Stay: ₹1800 | Food: ₹800 | Total: ₹3200-3500"
  },
  {
    name: "Dharmasthala", lat: 12.9372, lng: 75.3900, dailyCostPerPerson: 6000,
    image: "https://images.unsplash.com/photo-1590050752117-23a9d7cd7413?w=800&q=80",
    description: "A popular religious landmark attracting thousands of pilgrims.",
    rating: "4.9", category: "Spiritual India", budgetLevel: 'high',
    details: "Distance: 300km | Travel: ₹1800-2200 | Stay: ₹2500-3000 | Food: ₹1000 | Total: ₹5300-6200"
  },
  {
    name: "Udupi", lat: 13.3409, lng: 74.7421, dailyCostPerPerson: 6600,
    image: "https://images.unsplash.com/photo-1590489240436-b52b2b1d6e3e?w=800&q=80",
    description: "Famous for the Krishna Temple and its unique cuisine.",
    rating: "4.8", category: "Spiritual India", budgetLevel: 'high',
    details: "Distance: 400km | Travel: ₹2200-2600 | Stay: ₹3000 | Food: ₹1200 | Total: ₹6400-6800"
  },

  // HERITAGE
  {
    name: "Bangalore Palace", lat: 12.9988, lng: 77.5921, dailyCostPerPerson: 1100,
    image: "https://images.unsplash.com/photo-1590732487082-7b649d8e5762?w=800&q=80",
    description: "Majestic palace with Tudor-style architecture.",
    rating: "4.6", category: "Heritage India", budgetLevel: 'low',
    details: "Distance: 5km | Travel: ₹150 | Food: ₹600 | Entry/Local: ₹300 | Total: ₹1000-1100"
  },
  {
    name: "Tipu Sultan's Summer Palace", lat: 12.9593, lng: 77.5738, dailyCostPerPerson: 1000,
    image: "https://images.unsplash.com/photo-1624513697968-3e4b476e336d?w=800&q=80",
    description: "An example of Indo-Islamic architecture, the summer residence of Tipu Sultan.",
    rating: "4.4", category: "Heritage India", budgetLevel: 'low',
    details: "Distance: 4km | Travel: ₹150 | Food: ₹600 | Entry: ₹200 | Total: ₹900-1000"
  },
  {
    name: "Mysuru Heritage", lat: 12.2958, lng: 76.6394, dailyCostPerPerson: 3600,
    image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=800&q=80",
    description: "The City of Palaces, known for its rich heritage and culture.",
    rating: "4.9", category: "Heritage India", budgetLevel: 'mid',
    details: "Distance: 145km | Travel: ₹600-900 | Stay: ₹2000 | Food: ₹800 | Total: ₹3400-3700"
  },
  {
    name: "Srirangapatna", lat: 12.4203, lng: 76.6917, dailyCostPerPerson: 3500,
    image: "https://images.unsplash.com/photo-1624513697968-3e4b476e336d?w=800&q=80",
    description: "A historical town on the banks of River Kaveri.",
    rating: "4.5", category: "Heritage India", budgetLevel: 'mid',
    details: "Distance: 125km | Travel: ₹600-800 | Stay: ₹2000 | Food: ₹800 | Total: ₹3400-3600"
  },
  {
    name: "Hampi", lat: 15.3350, lng: 76.4600, dailyCostPerPerson: 6400,
    image: "https://images.unsplash.com/photo-1600011689032-8b628b8a8747?w=800&q=80",
    description: "UNESCO World Heritage site with ancient temple ruins.",
    rating: "4.9", category: "Heritage India", budgetLevel: 'high',
    details: "Distance: 340km | Travel: ₹2000-2400 | Stay: ₹3000 | Food: ₹1200 | Total: ₹6200-6600"
  },
  {
    name: "Badami", lat: 15.9181, lng: 75.6766, dailyCostPerPerson: 6800,
    image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=800&q=80",
    description: "Famous for its rock-cut structural temples.",
    rating: "4.7", category: "Heritage India", budgetLevel: 'high',
    details: "Distance: 450km | Travel: ₹2400-2800 | Stay: ₹3000 | Food: ₹1200 | Total: ₹6600-7000"
  },

  // NATURE & MOUNTAINS
  {
    name: "Lalbagh Botanical Garden", lat: 12.9507, lng: 77.5848, dailyCostPerPerson: 800,
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80",
    description: "Historical botanical garden with a glass house.",
    rating: "4.6", category: "Nature & Mountains", budgetLevel: 'low',
    details: "Distance: 4km | Travel: ₹150 | Stay: ₹600 | Food: ₹50 | Total: ₹800"
  },
  {
    name: "Bannerghatta National Park", lat: 12.7936, lng: 77.5759, dailyCostPerPerson: 1200,
    image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=800&q=80",
    description: "Biological park with safari and butterfly house.",
    rating: "4.5", category: "Nature & Mountains", budgetLevel: 'low',
    details: "Distance: 22km | Travel: ₹300 | Stay: ₹600 | Food: ₹300 | Total: ₹1200"
  },
  {
    name: "Nandi Hills", lat: 13.3702, lng: 77.6835, dailyCostPerPerson: 3300,
    image: "https://images.unsplash.com/photo-1624513697968-3e4b476e336d?w=800&q=80",
    description: "Ancient hill fortress and popular sunrise spot.",
    rating: "4.7", category: "Nature & Mountains", budgetLevel: 'mid',
    details: "Distance: 60km | Travel: ₹400-600 | Stay: ₹2000 | Food: ₹800 | Total: ₹3200-3400"
  },
  {
    name: "Skandagiri", lat: 13.5186, lng: 77.6823, dailyCostPerPerson: 3300,
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80",
    description: "A mountain fortress popular for night trekking.",
    rating: "4.6", category: "Nature & Mountains", budgetLevel: 'mid',
    details: "Distance: 65km | Travel: ₹400-600 | Stay: ₹2000 | Food: ₹800 | Total: ₹3200-3400"
  },
  {
    name: "Coorg", lat: 12.4244, lng: 75.7382, dailyCostPerPerson: 6200,
    image: "https://images.unsplash.com/photo-1590732487082-7b649d8e5762?w=800&q=80",
    description: "Scotland of India, known for coffee plantations.",
    rating: "4.9", category: "Nature & Mountains", budgetLevel: 'high',
    details: "Distance: 260km | Travel: ₹1800-2200 | Stay: ₹3000 | Food: ₹1200 | Total: ₹6000-6400"
  },
  {
    name: "Chikmagalur", lat: 13.3161, lng: 75.7720, dailyCostPerPerson: 6200,
    image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=800&q=80",
    description: "Famous for its serene environment and coffee estates.",
    rating: "4.8", category: "Nature & Mountains", budgetLevel: 'high',
    details: "Distance: 245km | Travel: ₹1800-2200 | Stay: ₹3000 | Food: ₹1200 | Total: ₹6000-6400"
  },

  // CITY EXPLORER
  {
    name: "MG Road Bengaluru", lat: 12.9733, lng: 77.6074, dailyCostPerPerson: 700,
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80",
    description: "Central business district with shops and restaurants.",
    rating: "4.5", category: "City Explorer", budgetLevel: 'low',
    details: "Distance: 3km | Travel: ₹100 | Food: ₹600 | Total: ₹700"
  },
  {
    name: "Brigade Road", lat: 12.9711, lng: 77.6068, dailyCostPerPerson: 700,
    image: "https://images.unsplash.com/photo-1590732487082-7b649d8e5762?w=800&q=80",
    description: "A hub for shopping and entertainment.",
    rating: "4.4", category: "City Explorer", budgetLevel: 'low',
    details: "Distance: 3km | Travel: ₹100 | Food: ₹600 | Total: ₹700"
  },
  {
    name: "Commercial Street", lat: 12.9822, lng: 77.6083, dailyCostPerPerson: 3000,
    image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=800&q=80",
    description: "One of the oldest and busiest shopping areas.",
    rating: "4.6", category: "City Explorer", budgetLevel: 'mid',
    details: "Distance: 4km | Travel: ₹150 | Stay: ₹2000 | Food: ₹800 | Total: ₹2950-3100"
  },
  {
    name: "Indiranagar", lat: 12.9719, lng: 77.6412, dailyCostPerPerson: 3100,
    image: "https://images.unsplash.com/photo-1624513697968-3e4b476e336d?w=800&q=80",
    description: "Cosmopolitan neighborhood known for dining and nightlife.",
    rating: "4.7", category: "City Explorer", budgetLevel: 'mid',
    details: "Distance: 6km | Travel: ₹200 | Stay: ₹2000 | Food: ₹800 | Total: ₹3000-3200"
  },
  {
    name: "Mysuru Explore", lat: 12.2958, lng: 76.6394, dailyCostPerPerson: 5300,
    image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=800&q=80",
    description: "Combining history with urban exploration.",
    rating: "4.8", category: "City Explorer", budgetLevel: 'high',
    details: "Distance: 145km | Travel: ₹900-1200 | Stay: ₹3000 | Food: ₹1200 | Total: ₹5100-5400"
  },
  {
    name: "Shivamogga", lat: 13.9299, lng: 75.5681, dailyCostPerPerson: 6400,
    image: "https://images.unsplash.com/photo-1624513697968-3e4b476e336d?w=800&q=80",
    description: "Gateway to the Western Ghats, rich in natural beauty.",
    rating: "4.7", category: "City Explorer", budgetLevel: 'high',
    details: "Distance: 300km | Travel: ₹2000-2400 | Stay: ₹3000 | Food: ₹1200 | Total: ₹6200-6600"
  },
];

const CHENNAI_DEMO_DATA: Destination[] = [
  // SPIRITUAL
  {
    name: "Tiruttani", lat: 13.1843, lng: 79.6200, dailyCostPerPerson: 2200,
    image: "https://images.unsplash.com/photo-1590489240436-b52b2b1d6e3e?w=800&q=80",
    description: "Ancient hill temple dedicated to Lord Murugan.",
    rating: "4.7", category: "Spiritual India", budgetLevel: 'low',
    details: "Distance: 75km | Travel: ₹300-500 | Stay: ₹1200 | Food: ₹600 | Total: ₹2100-2300"
  },
  {
    name: "Ekambareswarar Temple", lat: 12.8395, lng: 79.6991, dailyCostPerPerson: 2200,
    image: "https://images.unsplash.com/photo-1600011689032-8b628b8a8747?w=800&q=80",
    description: "Major Shiva temple in Kanchipuram representing the element Earth.",
    rating: "4.8", category: "Spiritual India", budgetLevel: 'low',
    details: "Distance: 75km | Travel: ₹300-500 | Stay: ₹1200 | Food: ₹600 | Total: ₹2100-2300"
  },
  {
    name: "Tiruvannamalai", lat: 12.2253, lng: 79.0747, dailyCostPerPerson: 4000,
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80",
    description: "Abode of Lord Shiva, famous for the Arunachalam hill.",
    rating: "4.9", category: "Spiritual India", budgetLevel: 'mid',
    details: "Distance: 230km | Travel: ₹800-1200 | Stay (2 nights): ₹1800-2200 | Food: ₹800 | Total: ₹3500-4500"
  },
  {
    name: "Chidambaram", lat: 11.3995, lng: 79.6936, dailyCostPerPerson: 4000,
    image: "https://images.unsplash.com/photo-1544735716-11f8e658c353?w=800&q=80",
    description: "Famous for the Nataraja temple and cosmic dance of Shiva.",
    rating: "4.7", category: "Spiritual India", budgetLevel: 'mid',
    details: "Distance: 240km | Travel: ₹900-1300 | Stay: ₹2000 | Food: ₹800 | Total: ₹3700-4200"
  },
  {
    name: "Rameshwaram", lat: 9.2876, lng: 79.3129, dailyCostPerPerson: 6000,
    image: "https://images.unsplash.com/photo-1624513697968-3e4b476e336d?w=800&q=80",
    description: "One of the Char Dham pilgrimage sites, on Pamban Island.",
    rating: "4.9", category: "Spiritual India", budgetLevel: 'high',
    details: "Distance: 560km | Travel: ₹2000-2500 | Stay: ₹2500-3000 | Food: ₹1000 | Total: ₹5500-6500"
  },
  {
    name: "Madurai Spiritual", lat: 9.9252, lng: 78.1198, dailyCostPerPerson: 5600,
    image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=800&q=80",
    description: "Home to the magnificent Meenakshi Amman Temple.",
    rating: "4.9", category: "Spiritual India", budgetLevel: 'high',
    details: "Distance: 460km | Travel: ₹1800-2200 | Stay: ₹2500 | Food: ₹1000 | Total: ₹5200-6000"
  },

  // HERITAGE
  {
    name: "Mahabalipuram", lat: 12.6208, lng: 80.1945, dailyCostPerPerson: 2200,
    image: "https://images.unsplash.com/photo-1590732487082-7b649d8e5762?w=800&q=80",
    description: "UNESCO site known for shore temples and rock-cut caves.",
    rating: "4.8", category: "Heritage India", budgetLevel: 'low',
    details: "Distance: 60km | Travel: ₹300-500 | Stay: ₹1200 | Food: ₹600 | Total: ₹2100-2300"
  },
  {
    name: "Kanchipuram Heritage", lat: 12.8342, lng: 79.7036, dailyCostPerPerson: 2300,
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80",
    description: "The city of thousand temples and famous silk sarees.",
    rating: "4.7", category: "Heritage India", budgetLevel: 'low',
    details: "Distance: 75km | Travel: ₹400-600 | Stay: ₹1200 | Food: ₹600 | Total: ₹2200-2400"
  },
  {
    name: "Thanjavur", lat: 10.7870, lng: 79.1378, dailyCostPerPerson: 4500,
    image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=800&q=80",
    description: "Cultural capital of Tamil Nadu, famous for the Big Temple.",
    rating: "4.9", category: "Heritage India", budgetLevel: 'mid',
    details: "Distance: 300km | Travel: ₹1200-1600 | Stay: ₹2200 | Food: ₹800 | Total: ₹4300-4700"
  },
  {
    name: "Gingee Fort", lat: 12.2514, lng: 79.4184, dailyCostPerPerson: 3600,
    image: "https://images.unsplash.com/photo-1624513697968-3e4b476e336d?w=800&q=80",
    description: "The 'Troy of the East', a formidable hill fortress.",
    rating: "4.6", category: "Heritage India", budgetLevel: 'mid',
    details: "Distance: 160km | Travel: ₹700-1000 | Stay: ₹2000 | Food: ₹800 | Total: ₹3500-3800"
  },
  {
    name: "Chettinad", lat: 10.1706, lng: 78.7845, dailyCostPerPerson: 6500,
    image: "https://images.unsplash.com/photo-1590732487082-7b649d8e5762?w=800&q=80",
    description: "Famous for its grand mansions and unique spicy cuisine.",
    rating: "4.8", category: "Heritage India", budgetLevel: 'high',
    details: "Distance: 420km | Travel: ₹2000-2500 | Stay: ₹3000 | Food: ₹1200 | Total: ₹6200-6800"
  },
  {
    name: "Madurai Heritage", lat: 9.9252, lng: 78.1198, dailyCostPerPerson: 5900,
    image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=800&q=80",
    description: "Ancient city showcasing Dravidian culture and architecture.",
    rating: "4.8", category: "Heritage India", budgetLevel: 'high',
    details: "Distance: 460km | Travel: ₹1800-2200 | Stay: ₹2800 | Food: ₹1000 | Total: ₹5600-6200"
  },

  // NATURE & MOUNTAINS
  {
    name: "Pulicat Lake", lat: 13.4357, lng: 80.1945, dailyCostPerPerson: 1100,
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80",
    description: "Second largest brackish water lake in India, popular for birding.",
    rating: "4.5", category: "Nature & Mountains", budgetLevel: 'low',
    details: "Distance: 60km | Travel: ₹300 | Food: ₹600 | Boat/Entry: ₹200 | Total: ₹1000-1200"
  },
  {
    name: "Vedanthangal Bird Sanctuary", lat: 12.5447, lng: 79.8517, dailyCostPerPerson: 1200,
    image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=800&q=80",
    description: "One of the oldest water bird sanctuaries in India.",
    rating: "4.6", category: "Nature & Mountains", budgetLevel: 'low',
    details: "Distance: 85km | Travel: ₹400 | Food: ₹600 | Entry: ₹100 | Total: ₹1100-1300"
  },
  {
    name: "Yelagiri", lat: 12.5768, lng: 78.6385, dailyCostPerPerson: 4000,
    image: "https://images.unsplash.com/photo-1624513697968-3e4b476e336d?w=800&q=80",
    description: "Quaint hill station with orchards and rose gardens.",
    rating: "4.4", category: "Nature & Mountains", budgetLevel: 'mid',
    details: "Distance: 230km | Travel: ₹1000-1400 | Stay: ₹2000 | Food: ₹800 | Total: ₹3800-4200"
  },
  {
    name: "Hogenakkal", lat: 12.1158, lng: 77.7761, dailyCostPerPerson: 4500,
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80",
    description: "The Niagara of India, famous for coracle rides.",
    rating: "4.6", category: "Nature & Mountains", budgetLevel: 'mid',
    details: "Distance: 350km | Travel: ₹1400-1800 | Stay: ₹2000 | Food: ₹800 | Total: ₹4200-4800"
  },
  {
    name: "Yercaud", lat: 11.7753, lng: 78.2093, dailyCostPerPerson: 6200,
    image: "https://images.unsplash.com/photo-1590732487082-7b649d8e5762?w=800&q=80",
    description: "Poor man's Ooty, known for its coffee forests.",
    rating: "4.5", category: "Nature & Mountains", budgetLevel: 'high',
    details: "Distance: 330km | Travel: ₹2000-2400 | Stay: ₹3000 | Food: ₹1000 | Total: ₹6000-6500"
  },
  {
    name: "Mudumalai National Park", lat: 11.5623, lng: 76.5345, dailyCostPerPerson: 6800,
    image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=800&q=80",
    description: "Declared tiger reserve, home to diverse wildlife.",
    rating: "4.7", category: "Nature & Mountains", budgetLevel: 'high',
    details: "Distance: 560km | Travel: ₹2300-2800 | Stay: ₹3000 | Food & Safari: ₹1200 | Total: ₹6500-7200"
  },

  // CITY EXPLORER
  {
    name: "Chengalpattu", lat: 12.6841, lng: 79.9836, dailyCostPerPerson: 850,
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80",
    description: "Historic town serving as a gateway to Chennai.",
    rating: "4.2", category: "City Explorer", budgetLevel: 'low',
    details: "Distance: 55km | Travel: ₹200-300 | Food & local: ₹600 | Total: ₹800-900"
  },
  {
    name: "Kanchipuram City", lat: 12.8342, lng: 79.7036, dailyCostPerPerson: 1000,
    image: "https://images.unsplash.com/photo-1590732487082-7b649d8e5762?w=800&q=80",
    description: "Urban exploration of the temple city's culture.",
    rating: "4.4", category: "City Explorer", budgetLevel: 'low',
    details: "Distance: 75km | Travel: ₹300-400 | Food & local: ₹700 | Total: ₹1000-1100"
  },
  {
    name: "Vellore", lat: 12.9165, lng: 79.1325, dailyCostPerPerson: 3500,
    image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=800&q=80",
    description: "Known for the fort and the Golden Temple.",
    rating: "4.5", category: "City Explorer", budgetLevel: 'mid',
    details: "Distance: 140km | Travel: ₹600-800 | Stay: ₹2000 | Food: ₹800 | Total: ₹3400-3600"
  },
  {
    name: "Pondicherry", lat: 11.9416, lng: 79.8083, dailyCostPerPerson: 3800,
    image: "https://images.unsplash.com/photo-1624513697968-3e4b476e336d?w=800&q=80",
    description: "French colonial legacy combined with spiritual vibes.",
    rating: "4.8", category: "City Explorer", budgetLevel: 'mid',
    details: "Distance: 150km | Travel: ₹600-900 | Stay: ₹2200 | Food: ₹900 | Total: ₹3700-4000"
  },
  {
    name: "Kodaikanal", lat: 10.2381, lng: 77.4892, dailyCostPerPerson: 6700,
    image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=800&q=80",
    description: "Princess of Hill Stations, known for its beauty.",
    rating: "4.8", category: "City Explorer", budgetLevel: 'high',
    details: "Distance: 525km | Travel: ₹2200-2600 | Stay: ₹3200 | Food: ₹1200 | Total: ₹6500-7000"
  },
  {
    name: "Ooty", lat: 11.4102, lng: 76.6950, dailyCostPerPerson: 7500,
    image: "https://images.unsplash.com/photo-1624513697968-3e4b476e336d?w=800&q=80",
    description: "Queen of Hill Stations, famous for its tea estates.",
    rating: "4.9", category: "City Explorer", budgetLevel: 'high',
    details: "Distance: 560km | Travel: ₹2500-3000 | Stay: ₹3500 | Food: ₹1200 | Total: ₹7200-7800"
  },
];

const MUMBAI_DEMO_DATA: Destination[] = [
  // SPIRITUAL
  {
    name: "Siddhivinayak Temple", lat: 19.0163, lng: 72.8300, dailyCostPerPerson: 2000,
    image: "https://images.unsplash.com/photo-1600011689032-8b628b8a8747?w=800&q=80",
    description: "One of the most famous and richest temples in Mumbai.",
    rating: "4.8", category: "Spiritual India", budgetLevel: 'low',
    details: "Distance: 10km | Travel: ₹200 | Stay: ₹1200 | Food: ₹600 | Total: ₹1900-2000"
  },
  {
    name: "ISKCON Temple Juhu", lat: 19.1126, lng: 72.8282, dailyCostPerPerson: 2000,
    image: "https://images.unsplash.com/photo-1544735716-11f8e658c353?w=800&q=80",
    description: "A spiritual oasis with a beautiful marble temple and vegetarian restaurant.",
    rating: "4.7", category: "Spiritual India", budgetLevel: 'low',
    details: "Distance: 12km | Travel: ₹200 | Stay: ₹1200 | Food: ₹600 | Total: ₹1900-2000"
  },
  {
    name: "Shirdi", lat: 19.7645, lng: 74.4762, dailyCostPerPerson: 4400,
    image: "https://images.unsplash.com/photo-1590489240436-b52b2b1d6e3e?w=800&q=80",
    description: "A major pilgrimage site dedicated to the sage Sai Baba.",
    rating: "4.9", category: "Spiritual India", budgetLevel: 'mid',
    details: "Distance: 240km | Travel: ₹1000-1400 | Stay: ₹1800-2200 | Food: ₹800 | Total: ₹3600-4400"
  },
  {
    name: "Trimbakeshwar", lat: 19.9324, lng: 73.5308, dailyCostPerPerson: 4000,
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80",
    description: "Ancient Hindu temple dedicated to Lord Shiva, one of twelve Jyotirlingas.",
    rating: "4.8", category: "Spiritual India", budgetLevel: 'mid',
    details: "Distance: 170km | Travel: ₹800-1200 | Stay: ₹2000 | Food: ₹800 | Total: ₹3600-4000"
  },
  {
    name: "Pandharpur", lat: 17.6710, lng: 75.3255, dailyCostPerPerson: 6200,
    image: "https://images.unsplash.com/photo-1590050752117-23a9d7cd7413?w=800&q=80",
    description: "Famous pilgrimage town on the banks of Chandrabhaga river.",
    rating: "4.7", category: "Spiritual India", budgetLevel: 'high',
    details: "Distance: 350km | Travel: ₹1800-2200 | Stay: ₹2500-3000 | Food: ₹1000 | Total: ₹5300-6200"
  },
  {
    name: "Bhimashankar", lat: 19.0722, lng: 73.5358, dailyCostPerPerson: 5600,
    image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=800&q=80",
    description: "A Jyotirlinga shrine located in the Sahyadri hills.",
    rating: "4.6", category: "Spiritual India", budgetLevel: 'high',
    details: "Distance: 210km | Travel: ₹1500-1800 | Stay: ₹2800 | Food: ₹1000 | Total: ₹5300-5600"
  },

  // HERITAGE
  {
    name: "Gateway of India", lat: 18.9220, lng: 72.8347, dailyCostPerPerson: 1000,
    image: "https://images.unsplash.com/photo-1590732487082-7b649d8e5762?w=800&q=80",
    description: "Iconic arch-monument built during the 20th century.",
    rating: "4.6", category: "Heritage India", budgetLevel: 'low',
    details: "Distance: 5km | Travel: ₹150 | Food: ₹600 | Entry/local: ₹200 | Total: ₹900-1000"
  },
  {
    name: "Elephanta Caves", lat: 18.9633, lng: 72.9315, dailyCostPerPerson: 1300,
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80",
    description: "UNESCO World Heritage site comprising cave temples dedicated to Shiva.",
    rating: "4.5", category: "Heritage India", budgetLevel: 'low',
    details: "Distance: 11km (ferry) | Travel & Ferry: ₹400 | Food: ₹600 | Entry: ₹200 | Total: ₹1200-1300"
  },
  {
    name: "Alibaug", lat: 18.6416, lng: 72.8722, dailyCostPerPerson: 3700,
    image: "https://images.unsplash.com/photo-1624513697968-3e4b476e336d?w=800&q=80",
    description: "Coastal town known for its beaches and marine forts.",
    rating: "4.4", category: "Heritage India", budgetLevel: 'mid',
    details: "Distance: 95km | Travel: ₹600-900 | Stay: ₹2000 | Food: ₹800 | Total: ₹3400-3700"
  },
  {
    name: "Vasai", lat: 19.3919, lng: 72.8397, dailyCostPerPerson: 3300,
    image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=800&q=80",
    description: "Historical town known for the Vasai Fort and Indo-Portuguese history.",
    rating: "4.3", category: "Heritage India", budgetLevel: 'mid',
    details: "Distance: 55km | Travel: ₹300-500 | Stay: ₹2000 | Food: ₹800 | Total: ₹3100-3300"
  },
  {
    name: "Aurangabad", lat: 19.8762, lng: 75.3433, dailyCostPerPerson: 6600,
    image: "https://images.unsplash.com/photo-1590732487082-7b649d8e5762?w=800&q=80",
    description: "The City of Gates, entry point to Ajanta and Ellora caves.",
    rating: "4.7", category: "Heritage India", budgetLevel: 'high',
    details: "Distance: 330km | Travel: ₹2000-2400 | Stay: ₹3000 | Food: ₹1200 | Total: ₹6200-6600"
  },
  {
    name: "Ajanta & Ellora Caves", lat: 20.5519, lng: 75.7483, dailyCostPerPerson: 6800,
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80",
    description: "Breath-taking UNESCO rock-cut cave monuments and temples.",
    rating: "4.9", category: "Heritage India", budgetLevel: 'high',
    details: "Distance: 330km | Travel: ₹2200-2600 | Stay: ₹3000 | Food: ₹1200 | Total: ₹6400-6800"
  },

  // NATURE & MOUNTAINS
  {
    name: "Sanjay Gandhi National Park", lat: 19.2288, lng: 72.9122, dailyCostPerPerson: 1000,
    image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=800&q=80",
    description: "Large protected area in the northern part of Mumbai city.",
    rating: "4.5", category: "Nature & Mountains", budgetLevel: 'low',
    details: "Distance: 20km | Travel: ₹200 | Food: ₹600 | Entry: ₹200 | Total: ₹1000"
  },
  {
    name: "Manori Beach", lat: 19.2081, lng: 72.7845, dailyCostPerPerson: 1200,
    image: "https://images.unsplash.com/photo-1624513697968-3e4b476e336d?w=800&q=80",
    description: "A tranquil beach getaway on the outskirts of Mumbai.",
    rating: "4.3", category: "Nature & Mountains", budgetLevel: 'low',
    details: "Distance: 40km | Travel: ₹300 | Food: ₹600 | local: ₹200 | Total: ₹1100-1200"
  },
  {
    name: "Lonavala", lat: 18.7500, lng: 73.4000, dailyCostPerPerson: 3700,
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80",
    description: "Popular hill station known for its greenery and waterfalls.",
    rating: "4.7", category: "Nature & Mountains", budgetLevel: 'mid',
    details: "Distance: 85km | Travel: ₹600-900 | Stay: ₹2000 | Food: ₹800 | Total: ₹3400-3700"
  },
  {
    name: "Matheran", lat: 18.9861, lng: 73.2722, dailyCostPerPerson: 3800,
    image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=800&q=80",
    description: "Automobile-free hill station accessible only via toy train or trek.",
    rating: "4.6", category: "Nature & Mountains", budgetLevel: 'mid',
    details: "Distance: 90km | Travel: ₹700-1000 | Stay: ₹2000 | Food: ₹800 | Total: ₹3500-3800"
  },
  {
    name: "Mahabaleshwar", lat: 17.9237, lng: 73.6586, dailyCostPerPerson: 6400,
    image: "https://images.unsplash.com/photo-1590732487082-7b649d8e5762?w=800&q=80",
    description: "Scenic hill station famous for its strawberries and viewpoints.",
    rating: "4.8", category: "Nature & Mountains", budgetLevel: 'high',
    details: "Distance: 260km | Travel: ₹1800-2200 | Stay: ₹3000 | Food: ₹1200 | Total: ₹6000-6400"
  },
  {
    name: "Todoba Andhari Tiger Reserve", lat: 20.2114, lng: 79.3039, dailyCostPerPerson: 9000,
    image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=800&q=80",
    description: "One of India's project tiger reserves, known for tiger sightings.",
    rating: "4.9", category: "Nature & Mountains", budgetLevel: 'high',
    details: "Distance: 830km | Travel: ₹3500-4000 | Stay: ₹3500 | Food & safari: ₹1500 | Total: ₹8500-9000"
  },

  // CITY EXPLORER
  {
    name: "Marine Drive", lat: 18.9440, lng: 72.8236, dailyCostPerPerson: 750,
    image: "https://images.unsplash.com/photo-1624513697968-3e4b476e336d?w=800&q=80",
    description: "An arc-shaped boulevard along the coast of Mumbai.",
    rating: "4.9", category: "City Explorer", budgetLevel: 'low',
    details: "Distance: 6km | Travel: ₹150 | Food: ₹600 | Total: ₹750"
  },
  {
    name: "Bandra Bandstand", lat: 19.0435, lng: 72.8193, dailyCostPerPerson: 800,
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80",
    description: "Popular promenade in Bandra West known for celebrity sightings.",
    rating: "4.6", category: "City Explorer", budgetLevel: 'low',
    details: "Distance: 10km | Travel: ₹200 | Food: ₹600 | Total: ₹800"
  },
  {
    name: "Navi Mumbai", lat: 19.0330, lng: 73.0297, dailyCostPerPerson: 3300,
    image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=800&q=80",
    description: "A planned city across the Thane Creek, part of Mumbai metropolitan area.",
    rating: "4.5", category: "City Explorer", budgetLevel: 'mid',
    details: "Distance: 25km | Travel: ₹300-500 | Stay: ₹2000 | Food: ₹800 | Total: ₹3100-3300"
  },
  {
    name: "Thane City", lat: 19.2183, lng: 72.9781, dailyCostPerPerson: 3300,
    image: "https://images.unsplash.com/photo-1624513697968-3e4b476e336d?w=800&q=80",
    description: "The city of lakes, offering urban exploration and shopping.",
    rating: "4.4", category: "City Explorer", budgetLevel: 'mid',
    details: "Distance: 25km | Travel: ₹300 | Stay: ₹2000 | Food: ₹800 | Total: ₹3100-3300"
  },
  {
    name: "Pune", lat: 18.5204, lng: 73.8567, dailyCostPerPerson: 5700,
    image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=800&q=80",
    description: "The cultural capital of Maharashtra, a major urban hub.",
    rating: "4.8", category: "City Explorer", budgetLevel: 'high',
    details: "Distance: 150km | Travel: ₹1200-1500 | Stay: ₹3000 | Food: ₹1200 | Total: ₹5400-5700"
  },
  {
    name: "Nashik", lat: 19.9975, lng: 73.7898, dailyCostPerPerson: 5800,
    image: "https://images.unsplash.com/photo-1624513697968-3e4b476e336d?w=800&q=80",
    description: "The wine capital and a historic city with many temples.",
    rating: "4.7", category: "City Explorer", budgetLevel: 'high',
    details: "Distance: 170km | Travel: ₹1200-1600 | Stay: ₹3000 | Food: ₹1200 | Total: ₹5400-5800"
  },
];

const HYDERABAD_DEMO_DATA: Destination[] = [
  // SPIRITUAL
  {
    name: "Yadagirigutta", lat: 17.5900, lng: 78.9400, dailyCostPerPerson: 2200,
    image: "https://images.unsplash.com/photo-1590489240436-b52b2b1d6e3e?w=800&q=80",
    description: "Famous cave temple dedicated to Lord Narasimha.",
    rating: "4.7", category: "Spiritual India", budgetLevel: 'low',
    details: "Distance: 65km | Travel: ₹300-400 | Stay: ₹1200 | Food: ₹600 | Total: ₹2100-2200"
  },
  {
    name: "Keesaragutta", lat: 17.5144, lng: 78.6744, dailyCostPerPerson: 2100,
    image: "https://images.unsplash.com/photo-1600011689032-8b628b8a8747?w=800&q=80",
    description: "Ancient Shiva temple on a hill, known for its scenic beauty.",
    rating: "4.5", category: "Spiritual India", budgetLevel: 'low',
    details: "Distance: 35km | Travel: ₹200-300 | Stay: ₹1200 | Food: ₹600 | Total: ₹2000-2100"
  },
  {
    name: "Basara", lat: 18.8833, lng: 77.9667, dailyCostPerPerson: 4200,
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80",
    description: "Home to the famous Gnana Saraswati Temple on the banks of Godavari.",
    rating: "4.6", category: "Spiritual India", budgetLevel: 'mid',
    details: "Distance: 210km | Travel: ₹800-1200 | Stay: ₹1800-2200 | Food: ₹800 | Total: ₹3500-4200"
  },
  {
    name: "Bhadrachalam", lat: 17.6710, lng: 80.8870, dailyCostPerPerson: 4500,
    image: "https://images.unsplash.com/photo-1544735716-11f8e658c353?w=800&q=80",
    description: "Major pilgrimage site dedicated to Lord Rama.",
    rating: "4.8", category: "Spiritual India", budgetLevel: 'mid',
    details: "Distance: 310km | Travel: ₹1200-1600 | Stay: ₹2000 | Food: ₹900 | Total: ₹4100-4500"
  },
  {
    name: "Srisailam", lat: 16.0748, lng: 78.8681, dailyCostPerPerson: 6200,
    image: "https://images.unsplash.com/photo-1624513697968-3e4b476e336d?w=800&q=80",
    description: "One of the twelve Jyotirlingas, located in the Nallamala Hills.",
    rating: "4.9", category: "Spiritual India", budgetLevel: 'high',
    details: "Distance: 215km | Travel: ₹1800-2200 | Stay: ₹2500-3000 | Food: ₹1000 | Total: ₹5300-6200"
  },
  {
    name: "Tirupati", lat: 13.6288, lng: 79.4192, dailyCostPerPerson: 7200,
    image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=800&q=80",
    description: "The world-famous Venkateswara Swamy Temple on Tirumala hills.",
    rating: "5.0", category: "Spiritual India", budgetLevel: 'high',
    details: "Distance: 560km | Travel: ₹2500-3000 | Stay: ₹3000 | Food: ₹1200 | Total: ₹6700-7200"
  },

  // HERITAGE
  {
    name: "Golconda Fort", lat: 17.3833, lng: 78.4011, dailyCostPerPerson: 1000,
    image: "https://images.unsplash.com/photo-1590732487082-7b649d8e5762?w=800&q=80",
    description: "Majestic citadel and former capital of the Qutb Shahi dynasty.",
    rating: "4.8", category: "Heritage India", budgetLevel: 'low',
    details: "Distance: 15km | Travel: ₹200 | Food: ₹600 | Entry & local: ₹200 | Total: ₹900-1000"
  },
  {
    name: "Charminar", lat: 17.3616, lng: 78.4747, dailyCostPerPerson: 900,
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80",
    description: "Global icon of Hyderabad, built in 1591.",
    rating: "4.9", category: "Heritage India", budgetLevel: 'low',
    details: "Distance: 5km | Travel: ₹100 | Food: ₹600 | Entry/local: ₹200 | Total: ₹800-900"
  },
  {
    name: "Warangal Heritage", lat: 17.9689, lng: 79.5941, dailyCostPerPerson: 3700,
    image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=800&q=80",
    description: "Historic city known for the Thousand Pillar Temple and Warangal Fort.",
    rating: "4.7", category: "Heritage India", budgetLevel: 'mid',
    details: "Distance: 150km | Travel: ₹600-900 | Stay: ₹2000 | Food: ₹800 | Total: ₹3400-3700"
  },
  {
    name: "Bidar Fort Heritage", lat: 17.9250, lng: 77.5310, dailyCostPerPerson: 3800,
    image: "https://images.unsplash.com/photo-1624513697968-3e4b476e336d?w=800&q=80",
    description: "Impressive fort with distinct Bahmani and Baridi style architecture.",
    rating: "4.6", category: "Heritage India", budgetLevel: 'mid',
    details: "Distance: 145km | Travel: ₹700-1000 | Stay: ₹2000 | Food: ₹800 | Total: ₹3500-3800"
  },
  {
    name: "Hampi History", lat: 15.3350, lng: 76.4600, dailyCostPerPerson: 6600,
    image: "https://images.unsplash.com/photo-1590732487082-7b649d8e5762?w=800&q=80",
    description: "UNESCO Heritage site with ruins from the Vijayanagara Empire.",
    rating: "4.9", category: "Heritage India", budgetLevel: 'high',
    details: "Distance: 370km | Travel: ₹2000-2400 | Stay: ₹3000 | Food: ₹1200 | Total: ₹6200-6600"
  },
  {
    name: "Lepakshi Heritage", lat: 13.8016, lng: 77.6074, dailyCostPerPerson: 6600,
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80",
    description: "Famous for the Veerabhadra Temple and the giant stone Nandi.",
    rating: "4.8", category: "Heritage India", budgetLevel: 'high',
    details: "Distance: 380km | Travel: ₹2200-2600 | Stay: ₹2800 | Food: ₹1200 | Total: ₹6200-6600"
  },

  // NATURE & MOUNTAINS
  {
    name: "Ananthagiri Hills", lat: 17.3090, lng: 77.8590, dailyCostPerPerson: 1200,
    image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=800&q=80",
    description: "Lush green hills and the origin point of Musi River.",
    rating: "4.5", category: "Nature & Mountains", budgetLevel: 'low',
    details: "Distance: 80km | Travel: ₹300-400 | Food: ₹600 | Local: ₹200 | Total: ₹1100-1200"
  },
  {
    name: "Pocharam Sanctuary", lat: 18.1400, lng: 78.1800, dailyCostPerPerson: 1400,
    image: "https://images.unsplash.com/photo-1624513697968-3e4b476e336d?w=800&q=80",
    description: "Wildlife sanctuary and dam, perfect for nature lovers.",
    rating: "4.3", category: "Nature & Mountains", budgetLevel: 'low',
    details: "Distance: 115km | Travel: ₹400-600 | Food: ₹600 | Entry: ₹200 | Total: ₹1200-1400"
  },
  {
    name: "Nagarjuna Sagar", lat: 16.5833, lng: 79.3167, dailyCostPerPerson: 4000,
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80",
    description: "One of the world's largest masonry dams on River Krishna.",
    rating: "4.7", category: "Nature & Mountains", budgetLevel: 'mid',
    details: "Distance: 165km | Travel: ₹800-1200 | Stay: ₹2000 | Food: ₹800 | Total: ₹3600-4000"
  },
  {
    name: "Ethipothala Falls", lat: 16.5400, lng: 79.3400, dailyCostPerPerson: 4200,
    image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=800&q=80",
    description: "Beautiful scenic cascade of three streams into a lagoon.",
    rating: "4.4", category: "Nature & Mountains", budgetLevel: 'mid',
    details: "Distance: 190km | Travel: ₹1000-1400 | Stay: ₹2000 | Food: ₹800 | Total: ₹3800-4200"
  },
  {
    name: "Araku Valley", lat: 18.3333, lng: 82.8667, dailyCostPerPerson: 8200,
    image: "https://images.unsplash.com/photo-1590732487082-7b649d8e5762?w=800&q=80",
    description: "Stunning hill station famous for coffee plantations and tribal culture.",
    rating: "4.9", category: "Nature & Mountains", budgetLevel: 'high',
    details: "Distance: 700km | Travel: ₹3000-3500 | Stay: ₹3500 | Food: ₹1200 | Total: ₹7700-8200"
  },
  {
    name: "Lambasingi", lat: 17.6167, lng: 82.5000, dailyCostPerPerson: 7200,
    image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=800&q=80",
    description: "The 'Kashmir of Andhra Pradesh', known for its cool climate.",
    rating: "4.6", category: "Nature & Mountains", budgetLevel: 'high',
    details: "Distance: 590km | Travel: ₹2600-3000 | Stay: ₹3000 | Food: ₹1200 | Total: ₹6800-7200"
  },

  // CITY EXPLORER
  {
    name: "Secunderabad", lat: 17.4399, lng: 78.4983, dailyCostPerPerson: 700,
    image: "https://images.unsplash.com/photo-1624513697968-3e4b476e336d?w=800&q=80",
    description: "Twin city of Hyderabad, rich in colonial history and shopping.",
    rating: "4.4", category: "City Explorer", budgetLevel: 'low',
    details: "Distance: 10km | Travel: ₹100 | Food & local: ₹600 | Total: ₹700"
  },
  {
    name: "Ramoji Film City", lat: 17.2543, lng: 78.6808, dailyCostPerPerson: 1800,
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80",
    description: "World's largest film studio complex and theme park.",
    rating: "4.8", category: "City Explorer", budgetLevel: 'low',
    details: "Distance: 30km | Travel: ₹300 | Food: ₹700 | Entry: ₹800 | Total: ₹1800"
  },
  {
    name: "Vijayawada", lat: 16.5062, lng: 80.6480, dailyCostPerPerson: 4600,
    image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=800&q=80",
    description: "Vibrant city on the banks of River Krishna.",
    rating: "4.5", category: "City Explorer", budgetLevel: 'mid',
    details: "Distance: 270km | Travel: ₹1200-1500 | Stay: ₹2200 | Food: ₹900 | Total: ₹4300-4600"
  },
  {
    name: "Rajahmundry", lat: 17.0005, lng: 81.7835, dailyCostPerPerson: 5400,
    image: "https://images.unsplash.com/photo-1624513697968-3e4b476e336d?w=800&q=80",
    description: "Cultural capital of Andhra Pradesh, famous for its river views.",
    rating: "4.6", category: "City Explorer", budgetLevel: 'mid',
    details: "Distance: 420km | Travel: ₹1800-2200 | Stay: ₹2200 | Food: ₹1000 | Total: ₹5000-5400"
  },
  {
    name: "Vizag City", lat: 17.6868, lng: 83.2185, dailyCostPerPerson: 7700,
    image: "https://images.unsplash.com/photo-1590732487082-7b649d8e5762?w=800&q=80",
    description: "The city of destiny, beautiful beaches and urban vibe.",
    rating: "4.9", category: "City Explorer", budgetLevel: 'high',
    details: "Distance: 620km | Travel: ₹2500-3000 | Stay: ₹3500 | Food: ₹1200 | Total: ₹7200-7700"
  },
  {
    name: "Amaravati Explorer", lat: 16.5750, lng: 80.3583, dailyCostPerPerson: 5800,
    image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=800&q=80",
    description: "Upcoming smart city and historical Buddhist site.",
    rating: "4.4", category: "City Explorer", budgetLevel: 'high',
    details: "Distance: 280km | Travel: ₹1500-1800 | Stay: ₹3000 | Food: ₹1000 | Total: ₹5500-5800"
  },
];

const KOLKATA_DEMO_DATA: Destination[] = [
  // SPIRITUAL
  {
    name: "Dakshineswar Kali Temple", lat: 22.6548, lng: 88.3575, dailyCostPerPerson: 1950,
    image: "https://images.unsplash.com/photo-1590050752117-23a9d7cd7413?w=800&q=80",
    description: "Famous temple dedicated to Goddess Kali on the banks of Hooghly River.",
    rating: "4.8", category: "Spiritual India", budgetLevel: 'low',
    details: "Distance: 15km | Travel: ₹150-200 | Stay: ₹1200 | Food: ₹600 | Total: ₹1950-2000"
  },
  {
    name: "Kalighat Kali Temple", lat: 22.5204, lng: 88.3418, dailyCostPerPerson: 1900,
    image: "https://images.unsplash.com/photo-1544735716-11f8e658c353?w=800&q=80",
    description: "One of the 51 Shakti Peethas, a historic Kali temple.",
    rating: "4.7", category: "Spiritual India", budgetLevel: 'low',
    details: "Distance: 8km | Travel: ₹150 | Stay: ₹1200 | Food: ₹600 | Total: ₹1850-1950"
  },
  {
    name: "Tarapith", lat: 24.1132, lng: 87.7963, dailyCostPerPerson: 3800,
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80",
    description: "Pious place dedicated to Goddess Tara, known for its tantric rituals.",
    rating: "4.6", category: "Spiritual India", budgetLevel: 'mid',
    details: "Distance: 260km | Travel: ₹900-1200 | Stay: ₹1800-2200 | Food: ₹800 | Total: ₹3500-4200"
  },
  {
    name: "Mayapur", lat: 23.4243, lng: 88.3908, dailyCostPerPerson: 3400,
    image: "https://images.unsplash.com/photo-1624513697968-3e4b476e336d?w=800&q=80",
    description: "Headquarters of ISKCON, located at the confluence of Jalangi and Ganges.",
    rating: "4.9", category: "Spiritual India", budgetLevel: 'mid',
    details: "Distance: 130km | Travel: ₹500-800 | Stay: ₹2000 | Food: ₹800 | Total: ₹3300-3600"
  },
  {
    name: "Puri", lat: 19.8135, lng: 85.8312, dailyCostPerPerson: 6200,
    image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=800&q=80",
    description: "Beach city famous for Jagannath Temple and Golden Beach.",
    rating: "4.8", category: "Spiritual India", budgetLevel: 'high',
    details: "Distance: 500km | Travel: ₹2000-2500 | Stay: ₹3000 | Food: ₹1000 | Total: ₹6000-6500"
  },
  {
    name: "Gaya", lat: 24.7914, lng: 85.0002, dailyCostPerPerson: 6000,
    image: "https://images.unsplash.com/photo-1590489240436-b52b2b1d6e3e?w=800&q=80",
    description: "Major pilgrimage site for both Hindus and Buddhists.",
    rating: "4.7", category: "Spiritual India", budgetLevel: 'high',
    details: "Distance: 470km | Travel: ₹1800-2200 | Stay: ₹3000 | Food: ₹1000 | Total: ₹5800-6200"
  },

  // HERITAGE
  {
    name: "Victoria Memorial", lat: 22.5448, lng: 88.3426, dailyCostPerPerson: 950,
    image: "https://images.unsplash.com/photo-1590732487082-7b649d8e5762?w=800&q=80",
    description: "Large marble building, a memorial to Queen Victoria.",
    rating: "4.9", category: "Heritage India", budgetLevel: 'low',
    details: "Distance: 5km | Travel: ₹150 | Food: ₹600 | Entry: ₹200 | Total: ₹950-1000"
  },
  {
    name: "Marble Palace", lat: 22.5828, lng: 88.3582, dailyCostPerPerson: 950,
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80",
    description: "Palatial nineteenth-century mansion in North Kolkata.",
    rating: "4.6", category: "Heritage India", budgetLevel: 'low',
    details: "Distance: 6km | Travel: ₹150 | Food: ₹600 | Entry/local: ₹200 | Total: ₹950-1000"
  },
  {
    name: "Murshidabad", lat: 24.1824, lng: 88.2709, dailyCostPerPerson: 3800,
    image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=800&q=80",
    description: "Historic city on the banks of Bhagirathi, former capital of Bengal.",
    rating: "4.7", category: "Heritage India", budgetLevel: 'mid',
    details: "Distance: 200km | Travel: ₹800-1200 | Stay: ₹2000 | Food: ₹800 | Total: ₹3600-4000"
  },
  {
    name: "Bishnupur", lat: 23.0673, lng: 87.3164, dailyCostPerPerson: 3500,
    image: "https://images.unsplash.com/photo-1624513697968-3e4b476e336d?w=800&q=80",
    description: "Famous for its terracotta temples and Baluchari sarees.",
    rating: "4.8", category: "Heritage India", budgetLevel: 'mid',
    details: "Distance: 140km | Travel: ₹600-900 | Stay: ₹2000 | Food: ₹800 | Total: ₹3400-3700"
  },
  {
    name: "Darjeeling", lat: 27.0360, lng: 88.2627, dailyCostPerPerson: 7900,
    image: "https://images.unsplash.com/photo-1590732487082-7b649d8e5762?w=800&q=80",
    description: "Queen of the Hills, famous for tea gardens and Kanchenjunga views.",
    rating: "5.0", category: "Heritage India", budgetLevel: 'high',
    details: "Distance: 620km | Travel: ₹3000-3500 | Stay: ₹3500 | Food: ₹1200 | Total: ₹7700-8200"
  },
  {
    name: "Kalimpong", lat: 27.0594, lng: 88.4731, dailyCostPerPerson: 7400,
    image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=800&q=80",
    description: "Hill station known for its nurseries and panoramic views.",
    rating: "4.7", category: "Heritage India", budgetLevel: 'high',
    details: "Distance: 600km | Travel: ₹2800-3300 | Stay: ₹3200 | Food: ₹1200 | Total: ₹7200-7700"
  },

  // NATURE
  {
    name: "Eco Park Kolkata", lat: 22.5992, lng: 88.4655, dailyCostPerPerson: 950,
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80",
    description: "Urban park in Rajarhat with diverse themes and activities.",
    rating: "4.6", category: "Nature & Mountains", budgetLevel: 'low',
    details: "Distance: 12km | Travel: ₹150 | Food: ₹600 | Entry local: ₹200 | Total: ₹950"
  },
  {
    name: "Botanical Garden Howrah", lat: 22.5597, lng: 88.2980, dailyCostPerPerson: 850,
    image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=800&q=80",
    description: "Acharya Jagadish Chandra Bose Indian Botanic Garden, famous for Great Banyan Tree.",
    rating: "4.5", category: "Nature & Mountains", budgetLevel: 'low',
    details: "Distance: 10km | Travel: ₹150 | Food: ₹600 | Entry: ₹100 | Total: ₹850"
  },
  {
    name: "Sundarbans", lat: 22.1352, lng: 88.8354, dailyCostPerPerson: 3800,
    image: "https://images.unsplash.com/photo-1624513697968-3e4b476e336d?w=800&q=80",
    description: "World's largest mangrove forest and home to Royal Bengal Tiger.",
    rating: "4.8", category: "Nature & Mountains", budgetLevel: 'mid',
    details: "Distance: 100km | Travel: ₹800-1200 | Stay: ₹2000 | Food: ₹800 | Total: ₹3600-4000"
  },
  {
    name: "Bakkhali", lat: 21.5645, lng: 88.2618, dailyCostPerPerson: 3500,
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80",
    description: "Seaside resort in South 24 Parganas, known for its serenity.",
    rating: "4.4", category: "Nature & Mountains", budgetLevel: 'mid',
    details: "Distance: 130km | Travel: ₹600-900 | Stay: ₹2000 | Food: ₹800 | Total: ₹3400-3700"
  },
  {
    name: "Lava", lat: 27.0863, lng: 88.6659, dailyCostPerPerson: 7600,
    image: "https://images.unsplash.com/photo-1590732487082-7b649d8e5762?w=800&q=80",
    description: "Quiet village near Kalimpong, entrance to Neora Valley National Park.",
    rating: "4.7", category: "Nature & Mountains", budgetLevel: 'high',
    details: "Distance: 670km | Travel: ₹3000-3500 | Stay: ₹3200 | Food: ₹1200 | Total: ₹7400-7900"
  },
  {
    name: "Lolegaon", lat: 27.0253, lng: 88.5524, dailyCostPerPerson: 7400,
    image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=800&q=80",
    description: "Small Lepcha village known for its canopy walk and sunrise views.",
    rating: "4.6", category: "Nature & Mountains", budgetLevel: 'high',
    details: "Distance: 650km | Travel: ₹2800-3300 | Stay: ₹3200 | Food: ₹1200 | Total: ₹7200-7700"
  },

  // CITY EXPLORE
  {
    name: "Park Street", lat: 22.5529, lng: 88.3533, dailyCostPerPerson: 700,
    image: "https://images.unsplash.com/photo-1624513697968-3e4b476e336d?w=800&q=80",
    description: "Culinary and entertainment hub of Kolkata.",
    rating: "4.9", category: "City Explorer", budgetLevel: 'low',
    details: "Distance: 3km | Travel: ₹100 | Food: ₹600 | Total: ₹700"
  },
  {
    name: "College Street", lat: 22.5746, lng: 88.3637, dailyCostPerPerson: 700,
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80",
    description: "World's largest second-hand book market and hub of heritage cafes.",
    rating: "4.8", category: "City Explorer", budgetLevel: 'low',
    details: "Distance: 4km | Travel: ₹100 | Food: ₹600 | Total: ₹700"
  },
  {
    name: "Howrah", lat: 22.5851, lng: 88.3416, dailyCostPerPerson: 3000,
    image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=800&q=80",
    description: "Twin city of Kolkata, famous for the Howrah Bridge and Station.",
    rating: "4.5", category: "City Explorer", budgetLevel: 'mid',
    details: "Distance: 6km | Travel: ₹150 | Stay: ₹2000 | Food: ₹800 | Total: ₹2950-3100"
  },
  {
    name: "Chandannagar", lat: 22.8689, lng: 88.3662, dailyCostPerPerson: 3300,
    image: "https://images.unsplash.com/photo-1624513697968-3e4b476e336d?w=800&q=80",
    description: "Former French colony known for its beautiful strand and heritage.",
    rating: "4.6", category: "City Explorer", budgetLevel: 'mid',
    details: "Distance: 40km | Travel: ₹300-500 | Stay: ₹2000 | Food: ₹800 | Total: ₹3200-3500"
  },
  {
    name: "Digha", lat: 21.6266, lng: 87.5074, dailyCostPerPerson: 5600,
    image: "https://images.unsplash.com/photo-1590732487082-7b649d8e5762?w=800&q=80",
    description: "Most popular sea resort in West Bengal.",
    rating: "4.5", category: "City Explorer", budgetLevel: 'high',
    details: "Distance: 185km | Travel: ₹1200-1600 | Stay: ₹3000 | Food: ₹1200 | Total: ₹5400-5800"
  },
  {
    name: "Shantiniketan", lat: 23.6797, lng: 87.6753, dailyCostPerPerson: 5200,
    image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=800&q=80",
    description: "Vishwa Bharati University founded by Rabindranath Tagore.",
    rating: "4.8", category: "City Explorer", budgetLevel: 'high',
    details: "Distance: 160km | Travel: ₹800-1200 | Stay: ₹3000 | Food: ₹1200 | Total: ₹5000-5400"
  },
];


export function getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export async function getCityCoords(city: string): Promise<{ lat: number; lng: number }> {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`);
    const data = await response.json();
    if (data && data.length > 0) {
      return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
    }
  } catch (error) {
    console.error("Geocoding error:", error);
  }
  return { lat: 28.6139, lng: 77.2090 }; // Default Delhi
}

export async function fetchLiveDestinations(lat: number, lng: number, radiusKm: number): Promise<Destination[]> {
  const radius = Math.min(radiusKm, 500) * 1000; // in meters
  const query = `
        [out:json][timeout:25];
        (
          node["tourism"="attraction"](around:${radius},${lat},${lng});
          node["place"~"city|town"](around:${radius},${lat},${lng});
        );
        out body 15;
    `;

  try {
    const response = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`);
    const data = await response.json();

    return data.elements.map((el: any) => ({
      name: el.tags.name || "Interesting Place",
      lat: el.lat,
      lng: el.lon,
      dailyCostPerPerson: 1000 + Math.floor(Math.random() * 1000),
      image: getDemoImage(el.tags.name || "Interesting Place"),
      description: el.tags.description || `A real location found near your starting point.`,
      rating: (4 + Math.random()).toFixed(1),
      category: el.tags.tourism ? "Tourist Spot" : "City"
    }));
  } catch (error) {
    console.error("Overpass error:", error);
    return [];
  }
}

export async function planTrip(
  startCity: string,
  totalBudget: number,
  days: number,
  _groupSize: number,
  category: string
) {
  // Demo check for Bengaluru
  if (startCity.toLowerCase().includes("bengaluru") || startCity.toLowerCase().includes("bangalore")) {
    let filtered = BENGALURU_DEMO_DATA;
    if (category && category !== "Custom Adventure") {
      filtered = filtered.filter(d => d.category.toLowerCase().includes(category.toLowerCase()));
    }
    const budget = totalBudget;
    if (budget >= 2000 && budget <= 3000) {
      filtered = filtered.filter(d => d.budgetLevel === 'low');
    } else if (budget >= 6000 && budget <= 7000) {
      filtered = filtered.filter(d => d.budgetLevel === 'low' || d.budgetLevel === 'mid');
    } else if (budget >= 8000) {
    } else if (budget < 2000) {
      filtered = filtered.filter(d => d.budgetLevel === 'low');
    }
    return filtered.map(dest => ({
      ...dest,
      image: getDemoImage(dest.name),
      distance: Math.round(getDistance(12.9716, 77.5946, dest.lat, dest.lng)),
      duration: `${days} Days`,
      isFallback: false
    }));
  }

  // Demo check for Chennai
  if (startCity.toLowerCase().includes("chennai")) {
    let filtered = CHENNAI_DEMO_DATA;
    if (category && category !== "Custom Adventure") {
      filtered = filtered.filter(d => d.category.toLowerCase().includes(category.toLowerCase()));
    }
    const budget = totalBudget;
    if (budget >= 2000 && budget <= 3000) {
      filtered = filtered.filter(d => d.budgetLevel === 'low');
    } else if (budget >= 6000 && budget <= 7000) {
      filtered = filtered.filter(d => d.budgetLevel === 'low' || d.budgetLevel === 'mid');
    } else if (budget >= 8000) {
    } else if (budget < 2000) {
      filtered = filtered.filter(d => d.budgetLevel === 'low');
    }
    return filtered.map(dest => ({
      ...dest,
      image: getDemoImage(dest.name),
      distance: Math.round(getDistance(13.0827, 80.2707, dest.lat, dest.lng)),
      duration: `${days} Days`,
      isFallback: false
    }));
  }

  // Demo check for Mumbai / Pune (User said Pune but provided Mumbai images)
  if (startCity.toLowerCase().includes("mumbai") || startCity.toLowerCase().includes("pune")) {
    let filtered = MUMBAI_DEMO_DATA;
    if (category && category !== "Custom Adventure") {
      filtered = filtered.filter(d => d.category.toLowerCase().includes(category.toLowerCase()));
    }
    const budget = totalBudget;
    if (budget >= 2000 && budget <= 3000) {
      filtered = filtered.filter(d => d.budgetLevel === 'low');
    } else if (budget >= 6000 && budget <= 7000) {
      filtered = filtered.filter(d => d.budgetLevel === 'low' || d.budgetLevel === 'mid');
    } else if (budget >= 8000) {
    } else if (budget < 2000) {
      filtered = filtered.filter(d => d.budgetLevel === 'low');
    }

    // Start coords: If user specifically typed Pune, we use Pune's center, else Mumbai's center
    const startLat = startCity.toLowerCase().includes("pune") ? 18.5204 : 19.0760;
    const startLng = startCity.toLowerCase().includes("pune") ? 73.8567 : 72.8777;

    return filtered.map(dest => ({
      ...dest,
      image: getDemoImage(dest.name),
      distance: Math.round(getDistance(startLat, startLng, dest.lat, dest.lng)),
      duration: `${days} Days`,
      isFallback: false
    }));
  }

  // Demo check for Hyderabad
  if (startCity.toLowerCase().includes("hyderabad")) {
    let filtered = HYDERABAD_DEMO_DATA;
    if (category && category !== "Custom Adventure") {
      filtered = filtered.filter(d => d.category.toLowerCase().includes(category.toLowerCase()));
    }
    const budget = totalBudget;
    if (budget >= 2000 && budget <= 3000) {
      filtered = filtered.filter(d => d.budgetLevel === 'low');
    } else if (budget >= 6000 && budget <= 7000) {
      filtered = filtered.filter(d => d.budgetLevel === 'low' || d.budgetLevel === 'mid');
    } else if (budget >= 8000) {
    } else if (budget < 2000) {
      filtered = filtered.filter(d => d.budgetLevel === 'low');
    }
    return filtered.map(dest => ({
      ...dest,
      image: getDemoImage(dest.name),
      distance: Math.round(getDistance(17.3850, 78.4867, dest.lat, dest.lng)),
      duration: `${days} Days`,
      isFallback: false
    }));
  }

  // Demo check for Kolkata
  if (startCity.toLowerCase().includes("kolkata")) {
    let filtered = KOLKATA_DEMO_DATA;
    if (category && category !== "Custom Adventure") {
      filtered = filtered.filter(d => d.category.toLowerCase().includes(category.toLowerCase()));
    }
    const budget = totalBudget;
    if (budget >= 2000 && budget <= 3000) {
      filtered = filtered.filter(d => d.budgetLevel === 'low');
    } else if (budget >= 6000 && budget <= 7000) {
      filtered = filtered.filter(d => d.budgetLevel === 'low' || d.budgetLevel === 'mid');
    } else if (budget >= 8000) {
    } else if (budget < 2000) {
      filtered = filtered.filter(d => d.budgetLevel === 'low');
    }
    return filtered.map(dest => ({
      ...dest,
      image: getDemoImage(dest.name),
      distance: Math.round(getDistance(22.5726, 88.3639, dest.lat, dest.lng)),
      duration: `${days} Days`,
      isFallback: false
    }));
  }

  const startCoords = await getCityCoords(startCity);
  const travelBudget = totalBudget;
  const maxDistance = (travelBudget / AVG_COST_PER_KM) / 2;

  let results = await fetchLiveDestinations(startCoords.lat, startCoords.lng, maxDistance);

  if (category && category !== "Custom Adventure") {
    results = results.filter(r => r.category.toLowerCase().includes(category.toLowerCase()) || category === "Nature & Mountains");
  }

  return results.map(dest => {
    const dist = getDistance(startCoords.lat, startCoords.lng, dest.lat, dest.lng);
    return {
      ...dest,
      distance: Math.round(dist),
      duration: `${days} Days`,
      isFallback: false
    };
  });
}
