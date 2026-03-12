import { NextRequest, NextResponse } from "next/server";

const RAWGKEY = process.env.API_KEY;

export async function getGames(req: NextRequest) {
  if (!RAWGKEY) return new NextResponse('API key not configured', { status: 500 });

  try {
    const page = Math.max(Number(req.nextUrl.searchParams.get('page') ?? 1), 1);
    const search = req.nextUrl.searchParams.get('search')
    const params = new URLSearchParams({ key: RAWGKEY, page: String(page) });

    if (search) params.append('search', search);

    const response = await fetch(`https://api.rawg.io/api/games?${params.toString()}`);

    if (!response.ok) return new NextResponse('Failed to fetch games from RAWG', { status: response.status });
    

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return new NextResponse('Houve um problema para buscar a lista de games, tente novamente mais tarde ou entre em contato com o suporte', { status: 500 });
  }
}
