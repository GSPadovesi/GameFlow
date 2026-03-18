import { NextRequest } from "next/server";
import { getUser } from "./getUser";

export async function GET(req: NextRequest) { return getUser(req) }