import { NextRequest } from "next/server";
import { getGames } from "./getGames";

export async function GET(req: NextRequest) {
  return getGames(req);
}
