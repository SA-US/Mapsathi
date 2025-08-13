'use client';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import Navbar from '@/app/sections/navbar';
import Footer from '@/app/sections/footer';
import { motion } from 'framer-motion';

const ClientSideMap = dynamic(() => import('@/app/ClientSideMap'), { ssr: false });

const CITIES = [
  {
    "id": "delhi",
    "name": "Delhi",
    "center": [28.7041, 77.1025],
    "zoom": 12,
    "markers": [
      { "id": 1, "pos": [28.6129, 77.2295], "title": "India Gate" },
      { "id": 2, "pos": [28.6562, 77.2410], "title": "Qutub Minar" },
      { "id": 3, "pos": [28.5355, 77.2588], "title": "Humayun's Tomb" },
      { "id": 4, "pos": [28.6946, 77.2185], "title": "Red Fort" },
      { "id": 5, "pos": [28.6268, 77.2181], "title": "Connaught Place" },
    ]
  },
  {
    "id": "mumbai",
    "name": "Mumbai",
    "center": [19.0760, 72.8777],
    "zoom": 12,
    "markers": [
      { "id": 1, "pos": [18.9220, 72.8347], "title": "Gateway of India" },
      { "id": 2, "pos": [19.0728, 72.8826], "title": "Marine Drive" },
      { "id": 3, "pos": [19.0305, 72.8540], "title": "Chhatrapati Shivaji Maharaj Vastu Sangrahalaya" },
      { "id": 4, "pos": [19.0416, 72.8208], "title": "Bandra–Worli Sea Link" },
      { "id": 5, "pos": [18.9401, 72.8347], "title": "Colaba Causeway" }
    ]
  },
  {
    "id": "jaipur",
    "name": "Jaipur",
    "center": [26.9124, 75.7873],
    "zoom": 12,
    "markers": [
      { "id": 1, "pos": [26.9239, 75.8267], "title": "Hawa Mahal" },
      { "id": 2, "pos": [26.9855, 75.8500], "title": "Amber Fort" },
      { "id": 3, "pos": [26.9248, 75.8258], "title": "City Palace" },
      { "id": 4, "pos": [26.9250, 75.8242], "title": "Jantar Mantar" },
      { "id": 5, "pos": [26.8837, 75.8117], "title": "Albert Hall Museum" }
    ]
  },
  {
    "id": "varanasi",
    "name": "Varanasi",
    "center": [25.3176, 82.9739],
    "zoom": 13,
    "markers": [
      { "id": 1, "pos": [25.3109, 82.9735], "title": "Kashi Vishwanath Temple" },
      { "id": 2, "pos": [25.3217, 82.9873], "title": "Dashashwamedh Ghat" },
      { "id": 3, "pos": [25.3175, 82.9904], "title": "Assi Ghat" },
      { "id": 4, "pos": [25.3121, 82.9839], "title": "Manikarnika Ghat" },
      { "id": 5, "pos": [25.3197, 82.9890], "title": "Tulsi Ghat" }
    ]
  },
  {
    "id": "bengaluru",
    "name": "Bengaluru",
    "center": [12.9716, 77.5946],
    "zoom": 12,
    "markers": [
      { "id": 1, "pos": [12.9768, 77.5701], "title": "Bangalore Palace" },
      { "id": 2, "pos": [12.9754, 77.6006], "title": "Cubbon Park" },
      { "id": 3, "pos": [12.9768, 77.6019], "title": "Vidhana Soudha" },
      { "id": 4, "pos": [12.9768, 77.5746], "title": "Lalbagh Botanical Garden" },
      { "id": 5, "pos": [12.9168, 77.6044], "title": "Bannerghatta National Park" }
    ]
  },
  {
    "id": "chennai",
    "name": "Chennai",
    "center": [13.0827, 80.2707],
    "zoom": 12,
    "markers": [
      { "id": 1, "pos": [13.0833, 80.2828], "title": "Marina Beach" },
      { "id": 2, "pos": [13.0817, 80.2741], "title": "Fort St. George" },
      { "id": 3, "pos": [13.0674, 80.2376], "title": "San Thome Church" },
      { "id": 4, "pos": [13.0118, 80.2731], "title": "Kapaleeshwarar Temple" },
      { "id": 5, "pos": [13.0984, 80.2612], "title": "Government Museum" }
    ]
  },
  {
    "id": "kolkata",
    "name": "Kolkata",
    "center": [22.5726, 88.3639],
    "zoom": 12,
    "markers": [
      { "id": 1, "pos": [22.5448, 88.3426], "title": "Victoria Memorial" },
      { "id": 2, "pos": [22.5694, 88.3468], "title": "Howrah Bridge" },
      { "id": 3, "pos": [22.5726, 88.3651], "title": "Dakshineswar Kali Temple" },
      { "id": 4, "pos": [22.5714, 88.3639], "title": "Indian Museum" },
      { "id": 5, "pos": [22.5663, 88.3451], "title": "Eden Gardens" }
    ]
  },
  {
    "id": "hyderabad",
    "name": "Hyderabad",
    "center": [17.3850, 78.4867],
    "zoom": 12,
    "markers": [
      { "id": 1, "pos": [17.3616, 78.4747], "title": "Charminar" },
      { "id": 2, "pos": [17.3850, 78.4867], "title": "Golconda Fort" },
      { "id": 3, "pos": [17.3686, 78.4754], "title": "Mecca Masjid" },
      { "id": 4, "pos": [17.4399, 78.4983], "title": "Hussain Sagar Lake" },
      { "id": 5, "pos": [17.4124, 78.4485], "title": "Salar Jung Museum" }
    ]
  },
  {
    "id": "pune",
    "name": "Pune",
    "center": [18.5204, 73.8567],
    "zoom": 12,
    "markers": [
      { "id": 1, "pos": [18.5144, 73.8576], "title": "Shaniwar Wada" },
      { "id": 2, "pos": [18.5224, 73.8570], "title": "Aga Khan Palace" },
      { "id": 3, "pos": [18.5173, 73.8569], "title": "Lal Mahal" },
      { "id": 4, "pos": [18.5229, 73.8459], "title": "Dagadusheth Halwai Ganapati Temple" },
      { "id": 5, "pos": [18.4998, 73.8052], "title": "Sinhagad Fort" }
    ]
  },
  {
    "id": "goa",
    "name": "Goa",
    "center": [15.2993, 74.1240],
    "zoom": 10,
    "markers": [
      { "id": 1, "pos": [15.5562, 73.7431], "title": "Baga Beach" },
      { "id": 2, "pos": [15.5445, 73.7380], "title": "Calangute Beach" },
      { "id": 3, "pos": [15.4989, 73.8236], "title": "Basilica of Bom Jesus" },
      { "id": 4, "pos": [15.5574, 73.8123], "title": "Fort Aguada" },
      { "id": 5, "pos": [15.4851, 73.8227], "title": "Se Cathedral" }
    ]
  },
  {
    "id": "amritsar",
    "name": "Amritsar",
    "center": [31.6340, 74.8723],
    "zoom": 13,
    "markers": [
      { "id": 1, "pos": [31.6200, 74.8765], "title": "Golden Temple" },
      { "id": 2, "pos": [31.6343, 74.8778], "title": "Jallianwala Bagh" },
      { "id": 3, "pos": [31.6158, 74.8787], "title": "Partition Museum" },
      { "id": 4, "pos": [31.6208, 74.8767], "title": "Akal Takht" },
      { "id": 5, "pos": [31.6027, 74.8741], "title": "Durgiana Temple" }
    ]
  },
  {
    "id": "ahmedabad",
    "name": "Ahmedabad",
    "center": [23.0225, 72.5714],
    "zoom": 12,
    "markers": [
      { "id": 1, "pos": [23.0216, 72.5855], "title": "Sabarmati Ashram" },
      { "id": 2, "pos": [23.0135, 72.5833], "title": "Jama Masjid" },
      { "id": 3, "pos": [23.0234, 72.5707], "title": "Sidi Saiyyed Mosque" },
      { "id": 4, "pos": [23.0226, 72.5714], "title": "Bhadra Fort" },
      { "id": 5, "pos": [23.0226, 72.5714], "title": "Manek Chowk" }
    ]
  }
];

export default function MapsPage() {
  const searchParams = useSearchParams();
  const cityParam = searchParams.get('city') || CITIES[0].id;

  const cityData = CITIES.find((c) => c.id === cityParam) || CITIES[0];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-sky-50 to-sky-100">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <motion.header
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <h1 className="text-3xl font-bold text-sky-700">City Maps</h1>
            <p className="text-gray-600 mt-2">Select a city to explore.</p>
          </motion.header>

          <div style={{ height: '600px', width: '100%' }}>
            <ClientSideMap cityData={cityData} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
