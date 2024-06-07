import clientPromise from "@/lib/mongodb";
import { NextResponse, NextRequest } from "next/server";
import { Cohort, Joy } from "@/types";

interface Props {
  params: {
    cohort: string;
  };
}

export const GET = async (req: NextRequest, { params }: Props) => {
  const cohortName = params.cohort;
  const client = await clientPromise;
  const db = client.db("makers-joy-challenge");
  const joys = await db.collection<Joy>("joys").find({}).toArray();
  joys.sort((a, b) => {
    const [aDay, aMonth, aYear] = a.date.split("/");
    const [bDay, bMonth, bYear] = b.date.split("/");

    const aDate = new Date(
      parseInt(aYear),
      parseInt(aMonth) - 1,
      parseInt(aDay)
    );
    const bDate = new Date(
      parseInt(bYear),
      parseInt(bMonth) - 1,
      parseInt(bDay)
    );
    return aDate.getTime() - bDate.getTime();
  });
  const cohort = await db
    .collection<Cohort>("cohorts")
    .findOne({ name: cohortName });
  if (!cohort) {
    return NextResponse.json({ message: "No Cohort Found" });
  }
  return NextResponse.json({ joys, cohort });
};

export const POST = async (req: NextRequest, { params }: Props) => {
  const client = await clientPromise;
  const db = client.db("makers-joy-challenge");
  const cohortName = params.cohort;
  const data = await req.json();
  data.cohort = cohortName;
  const joy = await db.collection<Joy>("joys").insertOne(data);
  
  return NextResponse.json({
    joy: joy,
    message: "Hello from the POST handler",
  });
};
