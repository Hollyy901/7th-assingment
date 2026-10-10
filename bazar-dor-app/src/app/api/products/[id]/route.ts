import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const productData = {
    id: id,
    name: "বটম সাইজ চাল",
    category: "চাল",
    currentPrice: 66,
    priceChangePercentage: 3.1,
    priceChangeAmount: 2,
    lowestPrice: 59,
    highestPrice: 73,
    averagePrice: 66,
    markets: [
      { marketName: "মার্থ বাজার", division: "ময়মনসিংহ", minPrice: 59, maxPrice: 65, avgPrice: 62 },
      { marketName: "সদর বাজার", division: "রাজশাহী", minPrice: 60, maxPrice: 66, avgPrice: 63 },
      { marketName: "বাজারহাট", division: "খুলনা", minPrice: 60, maxPrice: 67, avgPrice: 63.50 },
      { marketName: "বাসারঘাট বাজার", division: "রাজশাহী", minPrice: 60, maxPrice: 68, avgPrice: 64 },
      { marketName: "চৌর বাজার", division: "ময়মনসিংহ", minPrice: 60, maxPrice: 69, avgPrice: 64.50 },
      { marketName: "আমতলী বাজার", division: "চট্টগ্রাম", minPrice: 61, maxPrice: 69, avgPrice: 65 },
      { marketName: "ডবলগেট বাজার", division: "খুলনা", minPrice: 62, maxPrice: 69, avgPrice: 65.50 },
      { marketName: "চৌরাস্তা বাজার", division: "সিলেট", minPrice: 63, maxPrice: 70, avgPrice: 67 },
      { marketName: "গ্রীন মার্কেট, মিরপুর", division: "ঢাকা", minPrice: 64, maxPrice: 70, avgPrice: 67.50 },
      { marketName: "চৌধগ্রাম বাজার", division: "চট্টগ্রাম", minPrice: 63, maxPrice: 73, avgPrice: 68 },
      { marketName: "আমবাজার", division: "সিলেট", minPrice: 64, maxPrice: 73, avgPrice: 68.50 },
      { marketName: "কারওয়ান বাজার", division: "ঢাকা", minPrice: 65, maxPrice: 73, avgPrice: 69 }
    ]
  };

  return NextResponse.json(productData);
}