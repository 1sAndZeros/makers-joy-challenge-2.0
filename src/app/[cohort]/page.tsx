import { JoyDetails, Nominate, Previous } from "@/components";
import { fetchJoys } from "@/utils";
import "./page.css";
import AddModal from "@/components/AddModal";

interface Props {
  params: { cohort: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Page({ params, searchParams }: Props) {
  const data = await fetchJoys(params.cohort);
  const { id } = searchParams;
  const { joys, cohort } = data;
  const selectedJoy =
    joys.find((joy) => joy._id == id) || joys.at(-1) || joys[0];

  return (
    <>
      <h1 className="title">✨ Makers Joy Challenge ✨</h1>
      <AddModal names={cohort.names} />
      <main>
        <Previous joys={joys} />
        <JoyDetails joy={selectedJoy} />
        <Nominate joys={joys} cohortNames={cohort.names} />
      </main>
    </>
  );
}
