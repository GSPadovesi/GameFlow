import { prisma } from "@/lib";
import { NextRequest, NextResponse } from "next/server";

export async function getUser(req: NextRequest) {
  const idTemp = 'clx8k3h2a0000z8y1abc12345';
  
  try {
    const user = await prisma.user.findUnique({where: { id: idTemp }});

    if(!user) return new NextResponse('Usuário não existe no banco, crie uma conta', { status: 404 });

    return NextResponse.json(user);
  } catch (error) {
    return new NextResponse('Houve um problema para encontrar usuário, tente novamente mais tarde ou entre em contato com o suporte', { status: 500 });
  }
}
