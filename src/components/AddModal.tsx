"use client";

import refetchJoys from "@/app/actions";
import { Joy } from "@/types";
import { createJoy, updateSearchParams } from "@/utils";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useRef, useState } from "react";

const initialForm: Joy = {
  message: "",
  name: "",
  quote: {
    message: "",
    name: "",
  },
  date: new Date().toLocaleDateString("en-gb"),
  youtube: {
    artist: "",
    title: "",
    id: "",
  },
  question: "",
};

type JoyKeys = keyof typeof initialForm;

interface Props {
  names: string[];
}

const AddModal = ({ names }: Props) => {
  const router = useRouter();
  const ref = useRef<HTMLDialogElement>(null);
  const [formData, setFormData] = useState<Joy>({
    ...initialForm,
    name: names[0],
  });

  const toggleModal = () => {
    const isOpen = ref.current?.open;
    isOpen ? ref.current?.close() : ref.current?.showModal();
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formData.date = new Date(formData.date).toLocaleDateString("en-gb");
    const joy = await createJoy("deloitte", formData);
    console.log("joy", joy);
    toggleModal();
    resetForm();
    refetchJoys();
    router.push(updateSearchParams("id", joy.joy.insertedId));
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const keys = name.split(".");
    setFormData((prev) => {
      let newValue = { ...prev[keys[0]] };
      if (keys.length > 1) {
        keys.reduce((acc, key, i, arr) => {
          if (i === arr.length - 1) acc[key] = value;
          else if (acc[key] != null) return acc[key];
          else return acc;
        }, newValue);
      } else {
        newValue = value;
      }
      return {
        ...prev,
        [keys[0]]: newValue,
      };
    });
  };

  const resetForm = () => {
    setFormData(initialForm);
  };

  return (
    <>
      <button
        className="subheading"
        style={{
          position: "absolute",
          top: "0.5rem",
          right: "0.5rem",
          fontSize: "1.25rem",
        }}
        onClick={toggleModal}
      >
        Add Joy
      </button>
      <dialog ref={ref}>
        <form onSubmit={onSubmit}>
          <label htmlFor="name">Joy Giver</label>
          <select id="name" name="name" onChange={handleChange}>
            {names.map((option, i) => (
              <option value={option} key={i}>
                {option}
              </option>
            ))}
          </select>
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            name="date"
            value={formData.date}
            required
            onChange={handleChange}
          />
          <label htmlFor="quote">Quote</label>
          <input
            id="quote"
            type="text"
            name="quote.message"
            value={formData.quote.message}
            onChange={handleChange}
          />
          <label htmlFor="quoteBy">Quote By</label>
          <input
            id="quoteBy"
            type="text"
            name="quote.name"
            value={formData.quote.name}
            placeholder="Who was this quote by? (optional)"
            onChange={handleChange}
          />
          <label htmlFor="youtubeId">Youtube Video ID</label>
          <input
            id="youtubeId"
            type="text"
            name="youtube.id"
            value={formData.youtube.id}
            placeholder="Enter the YouTube ID. You can find it in the youtube URL after v="
            onChange={handleChange}
          />
          <label htmlFor="youtubeId">Artist</label>
          <input
            id="artist"
            type="text"
            name="youtube.artist"
            value={formData.youtube.artist}
            placeholder="e.g. The Beatles"
            onChange={handleChange}
          />
          <label htmlFor="youtubeId">Title</label>
          <input
            id="title"
            type="text"
            name="youtube.title"
            value={formData.youtube.title}
            placeholder="e.g. Yesterday"
            onChange={handleChange}
          />
          <label htmlFor="question">Question</label>
          <input
            id="question"
            type="text"
            name="question"
            value={formData.question}
            onChange={handleChange}
          />
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            placeholder="Write the message here"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
          />
          <button type="submit">Spread Joy</button>
          <button type="button" onClick={toggleModal}>
            Close
          </button>
        </form>
      </dialog>
    </>
  );
};

export default AddModal;
