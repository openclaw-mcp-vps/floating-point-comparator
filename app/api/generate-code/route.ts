import { NextResponse } from "next/server";

import {
  generateCodeTemplate,
  SUPPORTED_LANGUAGES,
  type CodeTemplateOptions,
  type LanguageId
} from "@/lib/code-templates";
import { hasPaidAccess } from "@/lib/auth";

interface GenerateCodeRequest extends CodeTemplateOptions {
  language: LanguageId;
}

export async function POST(request: Request) {
  const paidAccess = await hasPaidAccess();
  if (!paidAccess) {
    return NextResponse.json(
      { error: "Pro access is required to generate code templates." },
      { status: 403 }
    );
  }

  const payload = (await request.json()) as Partial<GenerateCodeRequest>;

  if (!payload.language || !SUPPORTED_LANGUAGES.some((language) => language.id === payload.language)) {
    return NextResponse.json({ error: "Unsupported language." }, { status: 400 });
  }

  const functionName = payload.functionName?.trim();
  if (!functionName) {
    return NextResponse.json({ error: "Function name is required." }, { status: 400 });
  }

  const absoluteTolerance = Number(payload.absoluteTolerance);
  const relativeTolerance = Number(payload.relativeTolerance);

  if (!Number.isFinite(absoluteTolerance) || !Number.isFinite(relativeTolerance)) {
    return NextResponse.json(
      { error: "Absolute and relative tolerance must be numeric values." },
      { status: 400 }
    );
  }

  const code = generateCodeTemplate(payload.language, {
    functionName,
    absoluteTolerance,
    relativeTolerance
  });

  return NextResponse.json({ language: payload.language, code });
}
