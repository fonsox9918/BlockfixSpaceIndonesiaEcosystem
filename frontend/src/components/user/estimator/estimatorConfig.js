// src/components/user/estimator/estimatorConfig.js

export const estimatorOptions = {
  types: ["Wall Panel WPC", "Plafon PVC"],
  patterns: ["Polos", "Motif Kayu", "Marble", "Custom Mix"],
  accessories: {
    wpc: [
      { name: "U-List", pricePerMeter: 25000 },
      { name: "L-List", pricePerMeter: 25000 },
      { name: "Inside Corner", pricePerMeter: 30000 },
      { name: "End Cap", pricePerMeter: 20000 },
      { name: "Lem PU", pricePerItem: 40000 },
      { name: "Bracket", pricePerItem: 6000 },
    ],
    pvc: [
      { name: "List PVC", pricePerMeter: 20000 },
      { name: "Center List", pricePerMeter: 25000 },
      { name: "Rangka Hollow", pricePerMeter: 50000 },
      { name: "Lamp Holder", pricePerItem: 15000 },
    ],
  },
  basePricePerM2: {
    wpc: {
      "Polos": 180000,
      "Motif Kayu": 190000,
      "Marble": 200000,
      "Custom Mix": 220000,
    },
    pvc: {
      "Polos": 120000,
      "Motif Kayu": 130000,
      "Marble": 140000,
      "Custom Mix": 150000,
    },
  },
};