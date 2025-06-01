// src/components/user/estimator/calculateEstimation.js

import { estimatorOptions } from "./estimatorConfig";

export function calculateEstimation({ type, pattern, width, length, accessories = [], lampPoints = 0 }) {
  const area = width * length;
  const isWall = type === "Wall Panel WPC";
  const configKey = isWall ? "wpc" : "pvc";

  // Harga dasar material + jasa
  const basePrice = estimatorOptions.basePricePerM2[configKey][pattern] * area;

  // Estimasi biaya aksesori
  let accessoriesCost = 0;

  estimatorOptions.accessories[configKey].forEach((acc) => {
    const isMeterBased = acc.pricePerMeter !== undefined;
    const qty = isMeterBased ? (width + length) * 2 : (acc.name.includes("Lamp") ? lampPoints : area * 2);
    const price = isMeterBased ? acc.pricePerMeter : acc.pricePerItem;
    if (accessories.includes(acc.name)) {
      accessoriesCost += qty * price;
    }
  });

  return {
    area,
    basePrice,
    accessoriesCost,
    total: basePrice + accessoriesCost,
  };
}