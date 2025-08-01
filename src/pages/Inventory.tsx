import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Heart,
  Eye,
  ArrowRight,
  Star,
  Calendar,
  Gauge,
  Fuel,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Vehicle {
  id: number;
  name: string;
  brand: string;
  price: string;
  year: number;
  image: string;
  category: string;
  mileage: string;
  fuelType: string;
  transmission: string;
  specs: {
    engine: string;
    power: string;
    acceleration: string;
    topSpeed: string;
  };
  features: string[];
  rating: number;
}

const Inventory = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);

  const vehicles: Vehicle[] = [
    {
      id: 1,
      name: "AMG GT 63 S",
      brand: "Mercedes-Benz",
      price: "$189,900",
      year: 2024,
      image:
        "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop",
      category: "Sports Cars",
      mileage: "2,500 miles",
      fuelType: "Premium",
      transmission: "Automatic",
      specs: {
        engine: "4.0L V8 Biturbo",
        power: "630 HP",
        acceleration: "3.1s 0-60mph",
        topSpeed: "196 mph",
      },
      features: [
        "AMG Performance Seats",
        "Carbon Fiber Package",
        "Night Package",
      ],
      rating: 4.9,
    },
    {
      id: 2,
      name: "488 GTB",
      brand: "Ferrari",
      price: "$295,000",
      year: 2024,
      image:
        "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop",
      category: "Sports Cars",
      mileage: "1,200 miles",
      fuelType: "Premium",
      transmission: "7-Speed DCT",
      specs: {
        engine: "3.9L V8 Twin-Turbo",
        power: "661 HP",
        acceleration: "3.0s 0-60mph",
        topSpeed: "205 mph",
      },
      features: ["Racing Seats", "Carbon Fiber Interior", "Track Package"],
      rating: 5.0,
    },
    {
      id: 3,
      name: "911 Turbo S",
      brand: "Porsche",
      price: "$234,400",
      year: 2024,
      image:
        "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop",
      category: "Sports Cars",
      mileage: "3,100 miles",
      fuelType: "Premium",
      transmission: "8-Speed PDK",
      specs: {
        engine: "3.8L H6 Twin-Turbo",
        power: "640 HP",
        acceleration: "2.6s 0-60mph",
        topSpeed: "205 mph",
      },
      features: ["Sport Chrono Package", "PASM Suspension", "Ceramic Brakes"],
      rating: 4.8,
    },
    {
      id: 4,
      name: "R8 V10 Plus",
      brand: "Audi",
      price: "$198,500",
      year: 2024,
      image:
        "https://images.unsplash.com/photo-1606016159991-d8bfa52ee522?w=800&h=600&fit=crop",
      category: "Sports Cars",
      mileage: "4,200 miles",
      fuelType: "Premium",
      transmission: "7-Speed S-Tronic",
      specs: {
        engine: "5.2L V10 FSI",
        power: "602 HP",
        acceleration: "3.2s 0-60mph",
        topSpeed: "201 mph",
      },
      features: ["Quattro AWD", "Carbon Fiber Package", "Virtual Cockpit"],
      rating: 4.7,
    },
    {
      id: 5,
      name: "Huracán EVO",
      brand: "Lamborghini",
      price: "$248,295",
      year: 2024,
      image:
        "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop",
      category: "Sports Cars",
      mileage: "1,800 miles",
      fuelType: "Premium",
      transmission: "7-Speed DCT",
      specs: {
        engine: "5.2L V10",
        power: "631 HP",
        acceleration: "2.9s 0-60mph",
        topSpeed: "202 mph",
      },
      features: ["All-Wheel Drive", "Dynamic Steering", "Performance Package"],
      rating: 4.9,
    },
    {
      id: 6,
      name: "S-Class S580",
      brand: "Mercedes-Benz",
      price: "$112,400",
      year: 2024,
      image:
        "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&h=600&fit=crop",
      category: "Luxury Sedans",
      mileage: "5,600 miles",
      fuelType: "Premium",
      transmission: "9-Speed Automatic",
      specs: {
        engine: "4.0L V8 Biturbo",
        power: "496 HP",
        acceleration: "4.4s 0-60mph",
        topSpeed: "130 mph",
      },
      features: ["Executive Package", "Massage Seats", "Burmester Audio"],
      rating: 4.8,
    },
    {
      id: 7,
      name: "7 Series 760Li",
      brand: "BMW",
      price: "$157,800",
      year: 2024,
      image:
        "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop",
      category: "Luxury Sedans",
      mileage: "4,300 miles",
      fuelType: "Premium",
      transmission: "8-Speed Automatic",
      specs: {
        engine: "6.6L V12 TwinPower",
        power: "601 HP",
        acceleration: "3.6s 0-60mph",
        topSpeed: "155 mph",
      },
      features: [
        "Executive Lounge",
        "Sky Lounge Roof",
        "Bowers & Wilkins Audio",
      ],
      rating: 4.7,
    },
    {
      id: 8,
      name: "Panamera Turbo S",
      brand: "Porsche",
      price: "$179,800",
      year: 2024,
      image:
        "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800&h=600&fit=crop",
      category: "Luxury Sedans",
      mileage: "2,700 miles",
      fuelType: "Premium",
      transmission: "8-Speed PDK",
      specs: {
        engine: "4.0L V8 Twin-Turbo",
        power: "620 HP",
        acceleration: "3.1s 0-60mph",
        topSpeed: "196 mph",
      },
      features: [
        "Sport Design Package",
        "Porsche InnoDrive",
        "Burmester Audio",
      ],
      rating: 4.9,
    },
    {
      id: 9,
      name: "Cullinan",
      brand: "Rolls-Royce",
      price: "$395,000",
      year: 2024,
      image:
        "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop",
      category: "Luxury SUVs",
      mileage: "3,200 miles",
      fuelType: "Premium",
      transmission: "8-Speed Automatic",
      specs: {
        engine: "6.75L V12 Twin-Turbo",
        power: "563 HP",
        acceleration: "4.8s 0-60mph",
        topSpeed: "155 mph",
      },
      features: ["Bespoke Interior", "Starlight Headliner", "Viewing Suite"],
      rating: 5.0,
    },
    {
      id: 10,
      name: "G-Wagon G63",
      brand: "Mercedes-Benz",
      price: "$179,000",
      year: 2024,
      image:
        "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&h=600&fit=crop",
      category: "Luxury SUVs",
      mileage: "6,800 miles",
      fuelType: "Premium",
      transmission: "9-Speed Automatic",
      specs: {
        engine: "4.0L V8 Biturbo",
        power: "577 HP",
        acceleration: "4.5s 0-60mph",
        topSpeed: "137 mph",
      },
      features: [
        "AMG Performance Package",
        "Night Package",
        "Off-Road Package",
      ],
      rating: 4.8,
    },
    {
      id: 11,
      name: "X7 M50i",
      brand: "BMW",
      price: "$156,700",
      year: 2024,
      image:
        "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop",
      category: "Luxury SUVs",
      mileage: "4,100 miles",
      fuelType: "Premium",
      transmission: "8-Speed Automatic",
      specs: {
        engine: "4.4L V8 TwinPower",
        power: "523 HP",
        acceleration: "4.1s 0-60mph",
        topSpeed: "155 mph",
      },
      features: ["M Sport Package", "Panoramic Roof", "Harman Kardon Audio"],
      rating: 4.7,
    },
    {
      id: 12,
      name: "Cayenne Turbo",
      brand: "Porsche",
      price: "$134,500",
      year: 2024,
      image:
        "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800&h=600&fit=crop",
      category: "Luxury SUVs",
      mileage: "5,300 miles",
      fuelType: "Premium",
      transmission: "8-Speed Tiptronic",
      specs: {
        engine: "4.0L V8 Twin-Turbo",
        power: "541 HP",
        acceleration: "3.9s 0-60mph",
        topSpeed: "177 mph",
      },
      features: ["Sport Design Package", "PASM Suspension", "Panoramic Roof"],
      rating: 4.6,
    },
    {
      id: 13,
      name: "Continental GT",
      brand: "Bentley",
      price: "$248,300",
      year: 2024,
      image:
        "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&h=600&fit=crop",
      category: "Grand Tourers",
      mileage: "2,900 miles",
      fuelType: "Premium",
      transmission: "8-Speed DCT",
      specs: {
        engine: "6.0L W12 Twin-Turbo",
        power: "626 HP",
        acceleration: "3.7s 0-60mph",
        topSpeed: "207 mph",
      },
      features: ["Mulliner Package", "Diamond Quilted Leather", "Naim Audio"],
      rating: 4.9,
    },
    {
      id: 14,
      name: "DB11 V12",
      brand: "Aston Martin",
      price: "$214,820",
      year: 2024,
      image:
        "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop",
      category: "Grand Tourers",
      mileage: "3,700 miles",
      fuelType: "Premium",
      transmission: "8-Speed Automatic",
      specs: {
        engine: "5.2L V12 Twin-Turbo",
        power: "630 HP",
        acceleration: "3.5s 0-60mph",
        topSpeed: "200 mph",
      },
      features: [
        "Sports Plus Package",
        "Carbon Fiber Package",
        "Bang & Olufsen",
      ],
      rating: 4.8,
    },
    {
      id: 15,
      name: "F-Type R",
      brand: "Jaguar",
      price: "$103,200",
      year: 2024,
      image:
        "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop",
      category: "Sports Cars",
      mileage: "4,500 miles",
      fuelType: "Premium",
      transmission: "8-Speed Automatic",
      specs: {
        engine: "5.0L V8 Supercharged",
        power: "575 HP",
        acceleration: "3.5s 0-60mph",
        topSpeed: "186 mph",
      },
      features: ["R-Dynamic Package", "Performance Seats", "Meridian Audio"],
      rating: 4.6,
    },
    {
      id: 16,
      name: "LC 500",
      brand: "Lexus",
      price: "$97,500",
      year: 2024,
      image:
        "https://images.unsplash.com/photo-1606016159991-d8bfa52ee522?w=800&h=600&fit=crop",
      category: "Grand Tourers",
      mileage: "6,200 miles",
      fuelType: "Premium",
      transmission: "10-Speed Automatic",
      specs: {
        engine: "5.0L V8 NA",
        power: "471 HP",
        acceleration: "4.4s 0-60mph",
        topSpeed: "168 mph",
      },
      features: ["Performance Package", "Mark Levinson Audio", "Carbon Roof"],
      rating: 4.7,
    },
    {
      id: 17,
      name: "M8 Competition",
      brand: "BMW",
      price: "$146,500",
      year: 2024,
      image:
        "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop",
      category: "Sports Cars",
      mileage: "3,800 miles",
      fuelType: "Premium",
      transmission: "8-Speed Automatic",
      specs: {
        engine: "4.4L V8 TwinPower",
        power: "617 HP",
        acceleration: "3.1s 0-60mph",
        topSpeed: "189 mph",
      },
      features: [
        "M Competition Package",
        "Carbon Ceramic Brakes",
        "M Driver's Package",
      ],
      rating: 4.8,
    },
    {
      id: 18,
      name: "RS e-tron GT",
      brand: "Audi",
      price: "$142,400",
      year: 2024,
      image:
        "https://images.unsplash.com/photo-1606016159991-d8bfa52ee522?w=800&h=600&fit=crop",
      category: "Electric Sports",
      mileage: "2,100 miles",
      fuelType: "Electric",
      transmission: "2-Speed",
      specs: {
        engine: "Dual Motor Electric",
        power: "590 HP",
        acceleration: "3.1s 0-60mph",
        topSpeed: "155 mph",
      },
      features: ["Air Suspension", "Matrix LED", "Bang & Olufsen Audio"],
      rating: 4.9,
    },
    {
      id: 19,
      name: "Model S Plaid",
      brand: "Tesla",
      price: "$129,990",
      year: 2024,
      image:
        "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=600&fit=crop",
      category: "Electric Sports",
      mileage: "7,300 miles",
      fuelType: "Electric",
      transmission: "Single Speed",
      specs: {
        engine: "Tri Motor Electric",
        power: "1,020 HP",
        acceleration: "1.9s 0-60mph",
        topSpeed: "200 mph",
      },
      features: ["Full Self Driving", "Glass Roof", "Premium Audio"],
      rating: 4.7,
    },
    {
      id: 20,
      name: "Taycan Turbo S",
      brand: "Porsche",
      price: "$185,000",
      year: 2024,
      image:
        "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800&h=600&fit=crop",
      category: "Electric Sports",
      mileage: "4,600 miles",
      fuelType: "Electric",
      transmission: "2-Speed",
      specs: {
        engine: "Dual Motor Electric",
        power: "750 HP",
        acceleration: "2.6s 0-60mph",
        topSpeed: "161 mph",
      },
      features: ["Sport Design Package", "PASM Suspension", "Burmester Audio"],
      rating: 4.8,
    },
    {
      id: 21,
      name: "i8 Roadster",
      brand: "BMW",
      price: "$164,295",
      year: 2023,
      image:
        "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop",
      category: "Hybrid Sports",
      mileage: "8,900 miles",
      fuelType: "Hybrid",
      transmission: "6-Speed Automatic",
      specs: {
        engine: "1.5L Hybrid",
        power: "369 HP",
        acceleration: "4.2s 0-60mph",
        topSpeed: "155 mph",
      },
      features: ["Laser Headlights", "Carbon Body", "Harman Kardon Audio"],
      rating: 4.5,
    },
    {
      id: 22,
      name: "NSX Type S",
      brand: "Acura",
      price: "$171,500",
      year: 2024,
      image:
        "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop",
      category: "Hybrid Sports",
      mileage: "2,400 miles",
      fuelType: "Hybrid",
      transmission: "9-Speed DCT",
      specs: {
        engine: "3.5L V6 Hybrid",
        power: "600 HP",
        acceleration: "2.9s 0-60mph",
        topSpeed: "191 mph",
      },
      features: [
        "Sport Hybrid SH-AWD",
        "Carbon Ceramic Brakes",
        "Track Package",
      ],
      rating: 4.8,
    },
    {
      id: 23,
      name: "C8 Corvette Z06",
      brand: "Chevrolet",
      price: "$106,395",
      year: 2024,
      image:
        "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop",
      category: "Sports Cars",
      mileage: "1,500 miles",
      fuelType: "Premium",
      transmission: "8-Speed DCT",
      specs: {
        engine: "5.5L V8 NA",
        power: "670 HP",
        acceleration: "2.6s 0-60mph",
        topSpeed: "194 mph",
      },
      features: [
        "Z07 Performance Package",
        "Carbon Fiber Wheels",
        "Competition Seats",
      ],
      rating: 4.9,
    },
    {
      id: 24,
      name: "GT 4-Door 63 S",
      brand: "Mercedes-AMG",
      price: "$173,000",
      year: 2024,
      image:
        "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&h=600&fit=crop",
      category: "Performance Sedans",
      mileage: "3,600 miles",
      fuelType: "Premium",
      transmission: "9-Speed MCT",
      specs: {
        engine: "4.0L V8 Biturbo",
        power: "630 HP",
        acceleration: "3.1s 0-60mph",
        topSpeed: "195 mph",
      },
      features: [
        "AMG Performance Package",
        "Ceramic Brakes",
        "Burmester 3D Audio",
      ],
      rating: 4.8,
    },
    {
      id: 25,
      name: "M5 CS",
      brand: "BMW",
      price: "$142,895",
      year: 2024,
      image:
        "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop",
      category: "Performance Sedans",
      mileage: "2,800 miles",
      fuelType: "Premium",
      transmission: "8-Speed Automatic",
      specs: {
        engine: "4.4L V8 TwinPower",
        power: "627 HP",
        acceleration: "2.9s 0-60mph",
        topSpeed: "190 mph",
      },
      features: ["CS Package", "Carbon Fiber Roof", "M Driver's Package"],
      rating: 4.9,
    },
    {
      id: 26,
      name: "RS7 Performance",
      brand: "Audi",
      price: "$127,900",
      year: 2024,
      image:
        "https://images.unsplash.com/photo-1606016159991-d8bfa52ee522?w=800&h=600&fit=crop",
      category: "Performance Sedans",
      mileage: "4,700 miles",
      fuelType: "Premium",
      transmission: "8-Speed Tiptronic",
      specs: {
        engine: "4.0L V8 TFSI",
        power: "621 HP",
        acceleration: "3.3s 0-60mph",
        topSpeed: "174 mph",
      },
      features: ["Dynamic Package", "Carbon Package", "Bang & Olufsen 3D"],
      rating: 4.7,
    },
    {
      id: 27,
      name: "Vantage",
      brand: "Aston Martin",
      price: "$139,000",
      year: 2024,
      image:
        "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop",
      category: "Sports Cars",
      mileage: "3,100 miles",
      fuelType: "Premium",
      transmission: "8-Speed Automatic",
      specs: {
        engine: "4.0L V8 Twin-Turbo",
        power: "503 HP",
        acceleration: "3.5s 0-60mph",
        topSpeed: "195 mph",
      },
      features: ["Sports Plus Package", "Alcantara Interior", "Bang & Olufsen"],
      rating: 4.8,
    },
    {
      id: 28,
      name: "720S",
      brand: "McLaren",
      price: "$299,000",
      year: 2024,
      image:
        "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop",
      category: "Supercars",
      mileage: "1,100 miles",
      fuelType: "Premium",
      transmission: "7-Speed SSG",
      specs: {
        engine: "4.0L V8 Twin-Turbo",
        power: "710 HP",
        acceleration: "2.8s 0-60mph",
        topSpeed: "212 mph",
      },
      features: ["MSO Package", "Carbon Fiber Body", "Track Package"],
      rating: 5.0,
    },
    {
      id: 29,
      name: "Aventador SVJ",
      brand: "Lamborghini",
      price: "$517,770",
      year: 2023,
      image:
        "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop",
      category: "Supercars",
      mileage: "900 miles",
      fuelType: "Premium",
      transmission: "7-Speed ISR",
      specs: {
        engine: "6.5L V12 NA",
        power: "759 HP",
        acceleration: "2.8s 0-60mph",
        topSpeed: "217 mph",
      },
      features: [
        "Aerodinamica Lamborghini Attiva",
        "Carbon Monocoque",
        "Track Package",
      ],
      rating: 5.0,
    },
    {
      id: 30,
      name: "SF90 Stradale",
      brand: "Ferrari",
      price: "$507,300",
      year: 2024,
      image:
        "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop",
      category: "Supercars",
      mileage: "650 miles",
      fuelType: "Hybrid",
      transmission: "8-Speed DCT",
      specs: {
        engine: "4.0L V8 Hybrid",
        power: "986 HP",
        acceleration: "2.5s 0-60mph",
        topSpeed: "211 mph",
      },
      features: [
        "Assetto Fiorano Package",
        "Carbon Package",
        "Manettino eDrive",
      ],
      rating: 5.0,
    },
  ];

  const categories = [
    "All",
    "Sports Cars",
    "Luxury Sedans",
    "Luxury SUVs",
    "Grand Tourers",
    "Electric Sports",
    "Hybrid Sports",
    "Performance Sedans",
    "Supercars",
  ];

  useEffect(() => {
    let filtered = vehicles;

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (vehicle) => vehicle.category === selectedCategory
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (vehicle) =>
          vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vehicle.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredVehicles(filtered);
  }, [searchTerm, selectedCategory]);

  return (
    <>
    <Navbar/>
      <div className="min-h-screen bg-luxury-black text-luxury-light-gray pt-20">
        {/* Header */}
        <div className="container mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-luxury-light-gray mb-6">
              Premium
              <span className="text-luxury-crimson"> Inventory</span>
            </h1>
            <p className="text-xl text-luxury-light-gray/70 max-w-3xl mx-auto">
              Explore our exclusive collection of the world's finest luxury
              vehicles, meticulously curated for the most discerning automotive
              enthusiasts.
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col md:flex-row gap-6 mb-12"
          >
            <div className="relative flex-1">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-luxury-light-gray/60"
                size={20}
              />
              <Input
                type="text"
                placeholder="Search by brand or model..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 bg-luxury-dark-gray border-luxury-dark-gray text-luxury-light-gray h-12"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  className={`whitespace-nowrap transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-luxury-crimson text-luxury-light-gray hover:bg-luxury-crimson/90"
                      : "border-luxury-dark-gray text-luxury-light-gray hover:bg-luxury-dark-gray"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="mb-8"
          >
            <p className="text-luxury-light-gray/60">
              Showing {filteredVehicles.length} of {vehicles.length} vehicles
            </p>
          </motion.div>

          {/* Vehicle Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
            layout
          >
            {filteredVehicles.map((vehicle, index) => (
              <motion.div
                key={vehicle.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                layout
              >
                <Card className="luxury-card group cursor-pointer h-full overflow-hidden">
                  <div className="relative">
                    <motion.img
                      src={vehicle.image}
                      alt={`${vehicle.brand} ${vehicle.name}`}
                      className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Hover Actions */}
                    <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 bg-luxury-black/80 text-luxury-light-gray hover:text-luxury-crimson rounded-full backdrop-blur-sm transition-colors duration-300"
                      >
                        <Heart size={18} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedVehicle(vehicle)}
                        className="p-2 bg-luxury-black/80 text-luxury-light-gray hover:text-luxury-crimson rounded-full backdrop-blur-sm transition-colors duration-300"
                      >
                        <Eye size={18} />
                      </motion.button>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 px-3 py-1 bg-luxury-crimson/90 text-luxury-light-gray text-xs font-semibold rounded-full backdrop-blur-sm">
                      {vehicle.category}
                    </div>

                    {/* Year Badge */}
                    <div className="absolute bottom-4 left-4 px-3 py-1 bg-luxury-dark-gray/90 text-luxury-light-gray text-sm font-semibold rounded-full backdrop-blur-sm">
                      {vehicle.year}
                    </div>
                  </div>

                  <CardContent className="p-6 flex-1 flex flex-col">
                    <div className="flex-1">
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-luxury-light-gray group-hover:text-luxury-crimson transition-colors duration-300">
                          {vehicle.brand}
                        </h3>
                        <p className="text-luxury-light-gray/70">
                          {vehicle.name}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-bold text-luxury-crimson">
                          {vehicle.price}
                        </span>
                        <div className="flex items-center text-luxury-light-gray/60">
                          <Star
                            className="fill-current text-yellow-500 mr-1"
                            size={16}
                          />
                          <span className="text-sm">{vehicle.rating}</span>
                        </div>
                      </div>

                      {/* Vehicle Details */}
                      <div className="grid grid-cols-2 gap-2 text-sm text-luxury-light-gray/60 mb-4">
                        <div className="flex items-center">
                          <Gauge className="mr-1" size={14} />
                          {vehicle.mileage}
                        </div>
                        <div className="flex items-center">
                          <Fuel className="mr-1" size={14} />
                          {vehicle.fuelType}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="mr-1" size={14} />
                          {vehicle.transmission}
                        </div>
                        <div>{vehicle.specs.power}</div>
                      </div>
                    </div>

                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center justify-between text-luxury-light-gray/60 group-hover:text-luxury-crimson transition-colors duration-300 cursor-pointer"
                      onClick={() => setSelectedVehicle(vehicle)}
                    >
                      <span className="text-sm font-medium">View Details</span>
                      <ArrowRight size={16} />
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Quick View Modal */}
        <AnimatePresence>
          {selectedVehicle && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-luxury-black/90 backdrop-blur-lg p-6"
              onClick={() => setSelectedVehicle(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-luxury-dark-gray rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  <img
                    src={selectedVehicle.image}
                    alt={`${selectedVehicle.brand} ${selectedVehicle.name}`}
                    className="w-full h-96 object-cover rounded-t-2xl"
                  />
                  <button
                    onClick={() => setSelectedVehicle(null)}
                    className="absolute top-4 right-4 p-2 bg-luxury-black/80 text-luxury-light-gray hover:text-luxury-crimson rounded-full backdrop-blur-sm transition-colors duration-300 text-2xl leading-none"
                  >
                    ×
                  </button>
                  <div className="absolute top-4 left-4 px-3 py-1 bg-luxury-crimson text-luxury-light-gray text-sm font-semibold rounded-full">
                    {selectedVehicle.category}
                  </div>
                </div>

                <div className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <div className="mb-6">
                        <h3 className="text-4xl font-bold text-luxury-light-gray mb-2">
                          {selectedVehicle.brand} {selectedVehicle.name}
                        </h3>
                        <div className="flex items-center justify-between">
                          <p className="text-3xl font-bold text-luxury-crimson">
                            {selectedVehicle.price}
                          </p>
                          <div className="flex items-center text-luxury-light-gray/60">
                            <Star
                              className="fill-current text-yellow-500 mr-1"
                              size={20}
                            />
                            <span>{selectedVehicle.rating}</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="text-center p-4 bg-luxury-black/30 rounded-lg">
                          <div className="text-luxury-light-gray text-lg font-semibold mb-1">
                            {selectedVehicle.specs.power}
                          </div>
                          <div className="text-luxury-light-gray/60 text-sm">
                            Power
                          </div>
                        </div>
                        <div className="text-center p-4 bg-luxury-black/30 rounded-lg">
                          <div className="text-luxury-light-gray text-lg font-semibold mb-1">
                            {selectedVehicle.specs.acceleration}
                          </div>
                          <div className="text-luxury-light-gray/60 text-sm">
                            0-60 mph
                          </div>
                        </div>
                        <div className="text-center p-4 bg-luxury-black/30 rounded-lg">
                          <div className="text-luxury-light-gray text-lg font-semibold mb-1">
                            {selectedVehicle.specs.topSpeed}
                          </div>
                          <div className="text-luxury-light-gray/60 text-sm">
                            Top Speed
                          </div>
                        </div>
                        <div className="text-center p-4 bg-luxury-black/30 rounded-lg">
                          <div className="text-luxury-light-gray text-lg font-semibold mb-1">
                            {selectedVehicle.year}
                          </div>
                          <div className="text-luxury-light-gray/60 text-sm">
                            Year
                          </div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="text-xl font-semibold text-luxury-light-gray mb-3">
                          Vehicle Details
                        </h4>
                        <div className="grid grid-cols-2 gap-4 text-luxury-light-gray/70">
                          <div>
                            <span className="font-medium">Engine:</span>{" "}
                            {selectedVehicle.specs.engine}
                          </div>
                          <div>
                            <span className="font-medium">Mileage:</span>{" "}
                            {selectedVehicle.mileage}
                          </div>
                          <div>
                            <span className="font-medium">Fuel Type:</span>{" "}
                            {selectedVehicle.fuelType}
                          </div>
                          <div>
                            <span className="font-medium">Transmission:</span>{" "}
                            {selectedVehicle.transmission}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xl font-semibold text-luxury-light-gray mb-4">
                        Premium Features
                      </h4>
                      <div className="space-y-2 mb-8">
                        {selectedVehicle.features.map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-center text-luxury-light-gray/70"
                          >
                            <div className="w-2 h-2 bg-luxury-crimson rounded-full mr-3" />
                            {feature}
                          </div>
                        ))}
                      </div>

                      <div className="space-y-4">
                        <Button className="w-full btn-luxury-primary">
                          Schedule Test Drive
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full btn-luxury-outline"
                        >
                          Request Quote
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full bg-transparent border-luxury-dark-gray text-luxury-light-gray hover:bg-luxury-dark-gray"
                        >
                          Contact Specialist
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer/>
    </>
  );
};

export default Inventory;
