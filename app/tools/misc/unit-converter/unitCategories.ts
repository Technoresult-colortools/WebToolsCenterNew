type UnitCategory = {
  name: string
  units: string[]
  convert: (value: number, from: string, to: string) => number
  formula?: (from: string, to: string) => string
}
export const categories: UnitCategory[] = [
  {
    name: "Length",
    units: [
      "Meters",
      "Kilometers",
      "Centimeters",
      "Millimeters",
      "Micrometers",
      "Nanometers",
      "Miles",
      "Yards",
      "Feet",
      "Inches",
      "Nautical Miles",
    ],
    convert: (value, from, to) => {
      const meterValues: { [key: string]: number } = {
        Meters: 1,
        Kilometers: 1000,
        Centimeters: 0.01,
        Millimeters: 0.001,
        Micrometers: 1e-6,
        Nanometers: 1e-9,
        Miles: 1609.34,
        Yards: 0.9144,
        Feet: 0.3048,
        Inches: 0.0254,
        "Nautical Miles": 1852,
      }
      const meters = value * meterValues[from]
      return meters / meterValues[to]
    },
    formula: (from, to) => {
      const meterValues: { [key: string]: number } = {
        Meters: 1,
        Kilometers: 1000,
        Centimeters: 0.01,
        Millimeters: 0.001,
        Micrometers: 1e-6,
        Nanometers: 1e-9,
        Miles: 1609.34,
        Yards: 0.9144,
        Feet: 0.3048,
        Inches: 0.0254,
        "Nautical Miles": 1852,
      }
      return `1 ${from} = ${(meterValues[from] / meterValues[to]).toFixed(6)} ${to}`
    },
  },
  {
    name: "Weight",
    units: ["Kilograms", "Grams", "Milligrams", "Metric Tons", "Pounds", "Ounces", "Stone", "US Tons", "Imperial Tons"],
    convert: (value, from, to) => {
      const gramValues: { [key: string]: number } = {
        Kilograms: 1000,
        Grams: 1,
        Milligrams: 0.001,
        "Metric Tons": 1e6,
        Pounds: 453.592,
        Ounces: 28.3495,
        Stone: 6350.29,
        "US Tons": 907185,
        "Imperial Tons": 1016000,
      }
      const grams = value * gramValues[from]
      return grams / gramValues[to]
    },
    formula: (from, to) => {
      const gramValues: { [key: string]: number } = {
        Kilograms: 1000,
        Grams: 1,
        Milligrams: 0.001,
        "Metric Tons": 1e6,
        Pounds: 453.592,
        Ounces: 28.3495,
        Stone: 6350.29,
        "US Tons": 907185,
        "Imperial Tons": 1016000,
      }
      return `1 ${from} = ${(gramValues[from] / gramValues[to]).toFixed(6)} ${to}`
    },
  },
  {
    name: "Temperature",
    units: ["Celsius", "Fahrenheit", "Kelvin"],
    convert: (value, from, to) => {
      if (from === "Celsius" && to === "Fahrenheit") {
        return (value * 9) / 5 + 32
      } else if (from === "Fahrenheit" && to === "Celsius") {
        return ((value - 32) * 5) / 9
      } else if (from === "Celsius" && to === "Kelvin") {
        return value + 273.15
      } else if (from === "Kelvin" && to === "Celsius") {
        return value - 273.15
      } else if (from === "Fahrenheit" && to === "Kelvin") {
        return ((value - 32) * 5) / 9 + 273.15
      } else if (from === "Kelvin" && to === "Fahrenheit") {
        return ((value - 273.15) * 9) / 5 + 32
      }
      return value // Same unit
    },
    formula: (from, to) => {
      if (from === "Celsius" && to === "Fahrenheit") {
        return "°F = (°C × 9/5) + 32"
      } else if (from === "Fahrenheit" && to === "Celsius") {
        return "°C = (°F - 32) × 5/9"
      } else if (from === "Celsius" && to === "Kelvin") {
        return "K = °C + 273.15"
      } else if (from === "Kelvin" && to === "Celsius") {
        return "°C = K - 273.15"
      } else if (from === "Fahrenheit" && to === "Kelvin") {
        return "K = (°F - 32) × 5/9 + 273.15"
      } else if (from === "Kelvin" && to === "Fahrenheit") {
        return "°F = (K - 273.15) × 9/5 + 32"
      }
      return `1 ${from} = 1 ${to}`
    },
  },
  {
    name: "Angle",
    units: ["Degrees", "Radians", "Gradians"],
    convert: (value, from, to) => {
      const toRadians: { [key: string]: number } = {
        Degrees: Math.PI / 180,
        Radians: 1,
        Gradians: Math.PI / 200,
      }
      const fromRadians: { [key: string]: number } = {
        Degrees: 180 / Math.PI,
        Radians: 1,
        Gradians: 200 / Math.PI,
      }
      const radians = value * toRadians[from]
      return radians * fromRadians[to]
    },
    formula: (from, to) => {
      if (from === "Degrees" && to === "Radians") {
        return "rad = deg × (π/180)"
      } else if (from === "Radians" && to === "Degrees") {
        return "deg = rad × (180/π)"
      } else if (from === "Degrees" && to === "Gradians") {
        return "grad = deg × (10/9)"
      } else if (from === "Gradians" && to === "Degrees") {
        return "deg = grad × (9/10)"
      } else if (from === "Radians" && to === "Gradians") {
        return "grad = rad × (200/π)"
      } else if (from === "Gradians" && to === "Radians") {
        return "rad = grad × (π/200)"
      }
      return `1 ${from} = 1 ${to}`
    },
  },
  {
    name: "Digital Storage",
    units: ["Bytes", "KiB", "MiB", "GiB", "TiB", "PiB"],
    convert: (value, from, to) => {
      const byteValues: { [key: string]: number } = {
        Bytes: 1,
        KiB: 1024,
        MiB: 1024 * 1024,
        GiB: 1024 * 1024 * 1024,
        TiB: 1024 * 1024 * 1024 * 1024,
        PiB: 1024 * 1024 * 1024 * 1024 * 1024,
      }
      const bytes = value * byteValues[from]
      return bytes / byteValues[to]
    },
    formula: (from, to) => {
      const byteValues: { [key: string]: number } = {
        Bytes: 1,
        KiB: 1024,
        MiB: 1024 * 1024,
        GiB: 1024 * 1024 * 1024,
        TiB: 1024 * 1024 * 1024 * 1024,
        PiB: 1024 * 1024 * 1024 * 1024 * 1024,
      }
      return `1 ${from} = ${(byteValues[from] / byteValues[to]).toFixed(6)} ${to}`
    },
  },

  {
    name: "Currency",
    units: ["USD", "EUR", "GBP", "JPY", "CAD", "AUD", "CHF", "CNY"],
    convert: (value, from, to) => {
      // Exchange rates as of October 2024 (approximate)
      const usdRates: { [key: string]: number } = {
        USD: 1.0,
        EUR: 0.92,
        GBP: 0.79,
        JPY: 147.5,
        CAD: 1.36,
        AUD: 1.51,
        CHF: 0.87,
        CNY: 7.13,
      }

      // Convert to USD first
      const usdValue = value / usdRates[from]

      // Convert from USD to target currency
      return usdValue * usdRates[to]
    },
    formula: (from, to) => {
      // Exchange rates as of October 2024 (approximate)
      const usdRates: { [key: string]: number } = {
        USD: 1.0,
        EUR: 0.92,
        GBP: 0.79,
        JPY: 147.5,
        CAD: 1.36,
        AUD: 1.51,
        CHF: 0.87,
        CNY: 7.13,
      }

      const rate = (usdRates[to] / usdRates[from]).toFixed(4)
      return `1 ${from} = ${rate} ${to} (Oct 2024)`
    },
  },
  {
    name: "Power",
    units: ["Watts", "Kilowatts", "Megawatts", "Horsepower", "BTU/hour"],
    convert: (value, from, to) => {
      const wattValues: { [key: string]: number } = {
        Watts: 1,
        Kilowatts: 1000,
        Megawatts: 1000000,
        Horsepower: 745.7,
        "BTU/hour": 0.2931,
      }

      const watts = value * wattValues[from]
      return watts / wattValues[to]
    },
    formula: (from, to) => {
      const wattValues: { [key: string]: number } = {
        Watts: 1,
        Kilowatts: 1000,
        Megawatts: 1000000,
        Horsepower: 745.7,
        "BTU/hour": 0.2931,
      }

      return `1 ${from} = ${(wattValues[from] / wattValues[to]).toFixed(6)} ${to}`
    },
  },
  {
    name: "Frequency",
    units: ["Hertz", "Kilohertz", "Megahertz", "Gigahertz", "Terahertz"],
    convert: (value, from, to) => {
      const hertzValues: { [key: string]: number } = {
        Hertz: 1,
        Kilohertz: 1000,
        Megahertz: 1000000,
        Gigahertz: 1000000000,
        Terahertz: 1000000000000,
      }

      const hertz = value * hertzValues[from]
      return hertz / hertzValues[to]
    },
    formula: (from, to) => {
      const hertzValues: { [key: string]: number } = {
        Hertz: 1,
        Kilohertz: 1000,
        Megahertz: 1000000,
        Gigahertz: 1000000000,
        Terahertz: 1000000000000,
      }

      return `1 ${from} = ${(hertzValues[from] / hertzValues[to]).toFixed(6)} ${to}`
    },
  },
]
