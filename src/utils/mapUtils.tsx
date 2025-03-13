import axios from 'axios';
// import {useUserStore} from '@/store/userStore';

// export const getLatLong = async (placeId: string) => {
//   try {
//     const response = await axios.get(
//       'https://maps.googleapis.com/maps/api/place/details/json',
//       {
//         params: {
//           placeid: placeId,
//           key: process.env.EXPO_PUBLIC_MAP_API_KEY,
//         },
//       },
//     );
//     const data = response.data;
//     if (data.status === 'OK' && data.result) {
//       const location = data.result.geometry.location;
//       const address = data.result.formatted_address;

//       return {
//         latitude: location.lat,
//         longitude: location.lng,
//         address: address,
//       };
//     } else {
//       throw new Error('Unable to fetch location details');
//     }
//   } catch (error) {
//     throw new Error('Unable to fetch location details');
//   }
// };

interface GeocodingResult {
  address: string;
  timestamp: number;
}

interface GeocodingCache {
  [key: string]: GeocodingResult;
}

interface GeocodingError extends Error {
  code?: string;
  response?: any;
}

const CACHE_EXPIRY_TIME = 1000 * 60 * 60; // 1 hour
const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY = 1000;
const geocodingCache: GeocodingCache = {};

const validateCoordinates = (latitude: number, longitude: number): boolean => {
  return (
    latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180
  );
};

const getCacheKey = (latitude: number, longitude: number): string => {
  return `${latitude.toFixed(6)},${longitude.toFixed(6)}`;
};

const isPlusCode = (address: string): boolean => {
  // Plus codes typically follow patterns like "3PH7+VGF"
  return /^[A-Z0-9]+\+[A-Z0-9]+/.test(address);
};

const findBestAddress = (results: any[]): string => {
  // Skip plus codes and find the most detailed address
  for (const result of results) {
    const address = result.formatted_address;
    if (!isPlusCode(address.split(',')[0].trim())) {
      return address;
    }
  }
  return results[0]?.formatted_address || '';
};

export const reverseGeocode = async (
  latitude: number,
  longitude: number,
  forceRefresh = false,
): Promise<string> => {
  if (!validateCoordinates(latitude, longitude)) {
    throw new Error('Invalid coordinates provided');
  }

  const cacheKey = getCacheKey(latitude, longitude);

  // Check cache if refresh not forced
  if (!forceRefresh && geocodingCache[cacheKey]) {
    const cached = geocodingCache[cacheKey];
    if (Date.now() - cached.timestamp < CACHE_EXPIRY_TIME) {
      return cached.address;
    }
  }

  let lastError: GeocodingError | null = null;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      if (attempt > 0) {
        // Exponential backoff with proper typing
        await new Promise<void>(resolve =>
          setTimeout(
            () => resolve(),
            INITIAL_RETRY_DELAY * Math.pow(2, attempt - 1),
          ),
        );
      }

      const response = await axios.get(
        'https://maps.googleapis.com/maps/api/geocode/json',
        {
          params: {
            latlng: `${latitude},${longitude}`,
            key: 'AIzaSyAvefGQbwfcfPDN9z5m5aikjjjgDkRLu1w',
            result_type: 'street_address|premise|subpremise|route', // Prefer street addresses
            location_type: 'ROOFTOP|RANGE_INTERPOLATED|GEOMETRIC_CENTER', // Prefer accurate locations
          },
          timeout: 5000,
        },
      );

      if (response.data.status === 'OK' && response.data.results?.length > 0) {
        const address = findBestAddress(response.data.results);

        // Update cache only if we got a proper address
        if (address && !isPlusCode(address.split(',')[0].trim())) {
          geocodingCache[cacheKey] = {
            address,
            timestamp: Date.now(),
          };
          return address;
        }
      }

      // Handle specific API error statuses
      const error = new Error(
        `Geocoding failed: ${response.data.status}`,
      ) as GeocodingError;
      error.code = response.data.status;
      error.response = response.data;
      throw error;
    } catch (error: any) {
      lastError = error;

      // Don't retry on certain error types
      if (error.response?.status === 403 || error.response?.status === 401) {
        console.error('Authentication error during reverse geocoding:', error);
        throw new Error('Geocoding service authentication failed');
      }

      if (attempt === MAX_RETRIES - 1) {
        console.error(
          'Max retry attempts reached for reverse geocoding:',
          error,
        );
        return '';
      }
    }
  }

  // Log the final error if all retries failed
  console.error('All reverse geocoding attempts failed:', lastError);
  return '';
};

function extractPlaceData(data: any) {
  return data.map((item: any) => ({
    place_id: item.place_id,
    title: item.structured_formatting.main_text,
    description: item.description,
  }));
}

// export const getPlacesSuggestions = async (query: string) => {
//   //   const {location} = useUserStore.getState();
//   try {
//     const response = await axios.get(
//       `https://maps.googleapis.com/maps/api/place/autocomplete/json`,
//       {
//         params: {
//           input: query,
//           location: `${location?.latitude},${location?.longitude}`,
//           radius: 50000,
//           components: 'country:IN',
//           key: process.env.EXPO_PUBLIC_MAP_API_KEY,
//         },
//       },
//     );
//     return extractPlaceData(response.data.predictions);
//   } catch (error) {
//     console.error('Error fetching autocomplete suggestions:', error);
//     return [];
//   }
// };

export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const calculateFare = (distance: number) => {
  const rateStructure = {
    bike: {baseFare: 10, perKmRate: 5, minimumFare: 25},
    auto: {baseFare: 15, perKmRate: 7, minimumFare: 30},
    cabEconomy: {baseFare: 20, perKmRate: 10, minimumFare: 50},
    cabPremium: {baseFare: 30, perKmRate: 15, minimumFare: 70},
  };

  const fareCalculation = (
    baseFare: number,
    perKmRate: number,
    minimumFare: number,
  ) => {
    const calculatedFare = baseFare + distance * perKmRate;
    return Math.max(calculatedFare, minimumFare);
  };

  return {
    bike: fareCalculation(
      rateStructure.bike.baseFare,
      rateStructure.bike.perKmRate,
      rateStructure.bike.minimumFare,
    ),
    auto: fareCalculation(
      rateStructure.auto.baseFare,
      rateStructure.auto.perKmRate,
      rateStructure.auto.minimumFare,
    ),
    cabEconomy: fareCalculation(
      rateStructure.cabEconomy.baseFare,
      rateStructure.cabEconomy.perKmRate,
      rateStructure.cabEconomy.minimumFare,
    ),
    cabPremium: fareCalculation(
      rateStructure.cabPremium.baseFare,
      rateStructure.cabPremium.perKmRate,
      rateStructure.cabPremium.minimumFare,
    ),
  };
};

function quadraticBezierCurve(
  p1: any,
  p2: any,
  controlPoint: any,
  numPoints: any,
) {
  const points = [];
  const step = 1 / (numPoints - 1);

  for (let t = 0; t <= 1; t += step) {
    const x =
      (1 - t) ** 2 * p1[0] + 2 * (1 - t) * t * controlPoint[0] + t ** 2 * p2[0];
    const y =
      (1 - t) ** 2 * p1[1] + 2 * (1 - t) * t * controlPoint[1] + t ** 2 * p2[1];
    const coord = {latitude: x, longitude: y};
    points.push(coord);
  }

  return points;
}

const calculateControlPoint = (p1: any, p2: any) => {
  const d = Math.sqrt((p2[0] - p1[0]) ** 2 + (p2[1] - p1[1]) ** 2);
  const scale = 1; // Scale factor to reduce bending
  const h = d * scale; // Reduced distance from midpoint
  const w = d / 2;
  const x_m = (p1[0] + p2[0]) / 2;
  const y_m = (p1[1] + p2[1]) / 2;

  const x_c =
    x_m +
    ((h * (p2[1] - p1[1])) /
      (2 * Math.sqrt((p2[0] - p1[0]) ** 2 + (p2[1] - p1[1]) ** 2))) *
      (w / d);
  const y_c =
    y_m -
    ((h * (p2[0] - p1[0])) /
      (2 * Math.sqrt((p2[0] - p1[0]) ** 2 + (p2[1] - p1[1]) ** 2))) *
      (w / d);

  const controlPoint = [x_c, y_c];
  return controlPoint;
};

export const getPoints = (places: any) => {
  const p1 = [places[0].latitude, places[0].longitude];
  const p2 = [places[1].latitude, places[1].longitude];
  const controlPoint = calculateControlPoint(p1, p2);

  return quadraticBezierCurve(p1, p2, controlPoint, 100);
};

// export const vehicleIcons: Record<
//   'bike' | 'auto' | 'cabEconomy' | 'cabPremium',
//   {icon: any}
// > = {
//   bike: {icon: require('@/assets/icons/bike.png')},
//   auto: {icon: require('@/assets/icons/auto.png')},
//   cabEconomy: {icon: require('@/assets/icons/cab.png')},
//   cabPremium: {icon: require('@/assets/icons/cab_premium.png')},
// };
