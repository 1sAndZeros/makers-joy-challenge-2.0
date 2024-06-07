import { Cohort, Joy, JoyWithId } from "@/types";

interface JoysResponse {
  joys: JoyWithId[];
  cohort: Cohort;
}

export const fetchJoys = async (cohort: string): Promise<JoysResponse> => {
  const URL = `${process.env.BASE_URL}/api/joys/${cohort}`;
  const res = await fetch(URL);
  const data = await res.json();
  if (!res.ok) throw Error("Could not get Joys!");
  return data;
};

export const createJoy = async (
  cohort: string,
  formData: Joy
): Promise<{ joy: JoyWithId; message: string }> => {
  const URL = `${process.env.BASE_URL}/api/joys/${cohort}`;
  const res = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const data = await res.json();
  return data;
};

export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set(type, value);
  const newPathName = `${window.location.pathname}?${searchParams.toString()}`;
  return newPathName;
};
