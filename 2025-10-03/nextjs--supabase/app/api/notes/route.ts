import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/ServerAdmin";

// CREATE
export async function POST(req: NextRequest) {
  const supabase = createAdminClient();
  const body = await req.json();

  const { title } = body;
  if (!title)
    return NextResponse.json({ error: "Missing title" }, { status: 400 });

  const { data, error } = await supabase
    .from("notes")
    .insert({ title })
    .select();
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data[0], { status: 201 });
}

// READ
export async function GET() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .order("id", { ascending: false });
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// UPDATE
export async function PUT(req: NextRequest) {
  const supabase = createAdminClient();
  const { id, title } = await req.json();
  if (!id || !title)
    return NextResponse.json({ error: "Missing id or title" }, { status: 400 });

  const { data, error } = await supabase
    .from("notes")
    .update({ title })
    .eq("id", id)
    .select();
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data[0]);
}

// DELETE
export async function DELETE(req: NextRequest) {
  const supabase = createAdminClient();
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const { error } = await supabase.from("notes").delete().eq("id", id);
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
