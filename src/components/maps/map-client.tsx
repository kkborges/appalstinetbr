"use client";

import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface MapClientProps {
  providers: any[];
  center: [number, number];
  onProviderClick?: (providerId: string) => void;
}

export default function MapClient({
  providers,
  center,
  onProviderClick,
}: MapClientProps) {
  return (
    <MapContainer
      center={center}
      zoom={14}
      className="h-full w-full rounded-lg"
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* User location marker */}
      <Marker position={center}>
        <Popup>
          <div className="text-center">
            <p className="font-semibold">Você está aqui</p>
          </div>
        </Popup>
      </Marker>

      {/* 2km radius circle */}
      <Circle
        center={center}
        radius={2000}
        pathOptions={{
          color: "blue",
          fillColor: "blue",
          fillOpacity: 0.1,
        }}
      />

      {/* Provider markers */}
      {providers.map((provider) => (
        <Marker
          key={provider.id}
          position={[provider.latitude, provider.longitude]}
          eventHandlers={{
            click: () => {
              if (onProviderClick) {
                onProviderClick(provider.id);
              }
            },
          }}
        >
          <Popup>
            <div className="min-w-[200px]">
              <h3 className="font-semibold text-lg mb-1">
                {provider.tradeName || provider.legalName}
              </h3>
              {provider.avgRating > 0 && (
                <div className="flex items-center gap-1 mb-2">
                  <span className="text-yellow-500">★</span>
                  <span className="text-sm">
                    {provider.avgRating.toFixed(1)} ({provider._count.reviews})
                  </span>
                </div>
              )}
              <p className="text-sm text-gray-600 mb-2">
                📍 {provider.distance.toFixed(2)} km de distância
              </p>
              {provider.description && (
                <p className="text-sm text-gray-700 line-clamp-2 mb-2">
                  {provider.description}
                </p>
              )}
              <div className="flex gap-2 mt-2">
                {provider.phone && (
                  <a
                    href={`tel:${provider.phone}`}
                    className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  >
                    📞 Ligar
                  </a>
                )}
                {provider.whatsapp && (
                  <a
                    href={`https://wa.me/${provider.whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                  >
                    💬 WhatsApp
                  </a>
                )}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
