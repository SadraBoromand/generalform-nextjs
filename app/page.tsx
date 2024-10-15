"use client";
import GeneralForm_Nextjs, {
  GeneralFormItem,
} from "@/app/components/GeneralForm_Nextjs";
import { FormEvent, useState } from "react";

const items: GeneralFormItem[] = [
  {
    title: "test 1",
    name: "test1",
    type: "text",
    value: "edit value 1",
    required: false,
  },
  { title: "test 2", name: "test2", type: "file", required: true },
  {
    title: "test 3",
    name: "test3",
    type: "select",
    value: "val2",
    options: [
      { name: "val1", title: "val 1" },
      { name: "val2", title: "val 2" },
      { name: "val3", title: "val 3" },
    ],
  },
  {
    title: "test 4",
    name: "test4",
    type: "text",
    required: true,
    value: "",
  },
  { title: "test 5", name: "test5", type: "file" },
];

export default function Home() {
  const [data, setData] = useState<GeneralFormItem[]>(items);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(data);
  };

  return (
    <div className="container mx-auto my-5">
      <GeneralForm_Nextjs data={data} setData={setData} onSubmit={onSubmit} />
    </div>
  );
}
