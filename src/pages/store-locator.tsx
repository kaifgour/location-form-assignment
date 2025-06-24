import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import rawStoreData from "@/data/static_data.json";
const storeData = rawStoreData as StoreData;
import Link from "next/link";
import { MapPin, Phone, Star } from "lucide-react";

const Map = dynamic(() => import("@/components/Map"), { ssr: false });

type Store = {
  name: string;
  address: string;
  latitude: string;
  longitude: string;
  phoneNumber: string;
  area: string;
  averageRating: string;
};

type CityStateMap = {
  [state: string]: {
    [city: string]: Store[];
  };
};

type StoreData = {
  cityStateMap: CityStateMap;
};

export default function Home() {
  const cityStateMap = storeData.cityStateMap;
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState("Delhi");
  const [selectedCity, setSelectedCity] = useState("New Delhi");
  const [stores, setStores] = useState<any[]>([]);

  //on initial load setting states from our static data
  useEffect(() => {
    setStates(Object.keys(cityStateMap));
  }, []);

  //on state dropdown change updating city dropdown based on selection
  useEffect(() => {
    if (selectedState) {
      const cityList = Object.keys(cityStateMap[selectedState] || {});
      setCities(cityList);
      if (!cityList.includes(selectedCity)) {
        setSelectedCity(cityList[0]);
      }
    }
  }, [selectedState]);
 

  // extracting store details based on state selection

  useEffect(() => {
    if (selectedState && selectedCity) {
      const storeList = cityStateMap[selectedState]?.[selectedCity] || [];
      setStores(storeList);
    }
  }, [selectedCity, selectedState]);

  return (
    <div className="p-6 space-y-4">
      <Link
        href="/"
        className="inline-block bg-white text-black px-4 py-2 rounded border border-gray-300 shadow hover:bg-gray-300"
      >
        Back
      </Link>
      <h1 className="text-2xl font-bold">Store Locator</h1>

      <div className="flex gap-4 flex-wrap">
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="p-2 border rounded bg-white text-black"
        >
          {states.map((state) => (
            <option key={state}>{state}</option>
          ))}
        </select>

        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="p-2 border rounded bg-white text-black"
        >
          {cities.map((city) => (
            <option key={city}>{city}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <h4>{stores.length} Results</h4>
          {stores.map((store, index) => (
            <div
              key={index}
              className="p-4 border rounded shadow-sm bg-white text-black space-y-2"
            >
              <h2 className="text-lg font-semibold">{store.name}</h2>

              <div className="flex items-center gap-2 text-sm text-gray-700">
                <MapPin size={16} className="text-blue-600" />
                <span>{store.address}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Phone size={16} className="text-green-600" />
                <span>{store.phoneNumber}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Star size={16} className="text-yellow-500 fill-yellow-500" />
                <span>{store.averageRating || "N/A"}</span>
              </div>

              <div className="text-xs text-gray-500">{store.area}</div>
            </div>
          ))}
        </div>
        {/* passing stores detail to Map component to show the map marker using longitude and latitude  */}
        <div>
          <Map stores={stores} />
        </div>
      </div>
    </div>
  );
}
