"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

// Dynamically import Leaflet to avoid SSR issues
const Map = dynamic(() => import("./map-client"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  ),
});

interface MapViewProps {
  providers: any[];
  center?: [number, number];
  onProviderClick?: (providerId: string) => void;
}

export function MapView({ providers, center, onProviderClick }: MapViewProps) {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );

  useEffect(() => {
    if (navigator.geolocation && !center) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([
            position.coords.latitude,
            position.coords.longitude,
          ]);
        },
        (error) => {
          console.error("Error getting location:", error);
          // Default to São Paulo if location is denied
          setUserLocation([-23.5505, -46.6333]);
        }
      );
    } else if (center) {
      setUserLocation(center);
    }
  }, [center]);

  if (!userLocation) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Map
      providers={providers}
      center={userLocation}
      onProviderClick={onProviderClick}
    />
  );
}
