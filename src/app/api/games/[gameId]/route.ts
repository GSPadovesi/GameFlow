import { NextRequest, NextResponse } from "next/server";
import { getGame } from "./getGame";

type RouteParams = {
  params: Promise<{
    gameId: string;
  }>;
};

export async function GET(req: NextRequest, context: RouteParams) {
  return getGame(req, context);
}
