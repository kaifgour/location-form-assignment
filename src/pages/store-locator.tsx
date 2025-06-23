import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import rawStoreData from '@/data/static_data.json';
const storeData = rawStoreData as StoreData;
const cityStateMap = storeData.cityStateMap;
const Map = dynamic(() => import('@/components/Map'), { ssr: false });

type Store = {
  name: string;
  address: string;
  latitude: string;
  longitude: string;
  phoneNumber: string;
  area: string;
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
  const [selectedState, setSelectedState] = useState('Delhi');
  const [selectedCity, setSelectedCity] = useState('New Delhi');
  const [stores, setStores] = useState<any[]>([]);

  useEffect(() => {
    setStates(Object.keys(cityStateMap));
  }, []);

  useEffect(() => {
    if (selectedState) {
      const cityList = Object.keys(cityStateMap[selectedState] || {});
      setCities(cityList);
      if (!cityList.includes(selectedCity)) {
        setSelectedCity(cityList[0]);
      }
    }
  }, [selectedState]);

  useEffect(() => {
    if (selectedState && selectedCity) {
      const storeList = cityStateMap[selectedState]?.[selectedCity] || [];
      setStores(storeList);
    }
  }, [selectedCity, selectedState]);

  return (
    <div className="p-6 space-y-4">
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
          {stores.map((store, index) => (
            <div key={index} className="p-3 border rounded shadow-sm bg-white text-black">
              <h2 className="font-semibold">{store.name}</h2>
              <p>{store.address}</p>
              <p>{store.phoneNumber}</p>
              <p>{store.area}</p>
            </div>
          ))}
        </div>
        <div>
          <Map stores={stores} />
        </div>
      </div>
    </div>
  );
}