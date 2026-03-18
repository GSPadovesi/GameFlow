import { NextRequest, NextResponse } from "next/server";

const RAWGKEY = process.env.API_KEY;

type GetGameParams = {
  params: Promise<{
    gameId: string;
  }>;
};

export async function getGame(req: NextRequest, { params }: GetGameParams) {
  if (!RAWGKEY) return new NextResponse('API key not configured', { status: 500 });

  try {
    const { gameId } = await params;
    const rawParams = new URLSearchParams({
      key: RAWGKEY
    });

    const response = await fetch(
      `https://api.rawg.io/api/games/${gameId}?${rawParams.toString()}`
    );

    if (!response.ok) return new NextResponse('Failed to fetch games from RAWG', { status: response.status });
    

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return new NextResponse('Houve um problema para buscar a lista de games, tente novamente mais tarde ou entre em contato com o suporte', { status: 500 });
  }
}
