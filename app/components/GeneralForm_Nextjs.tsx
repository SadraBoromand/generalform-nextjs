"use client";
import Image from "next/image";
import React, { FormEvent } from "react";

export interface GeneralFormItem {
  title: string;
  name: string;
  required?: boolean;
  value?: string | number | File;
  type?: "text" | "file" | "select";
  options?: GeneralFormItem[];
}

const GeneralForm_Nextjs = ({
  data,
  setData,
  onSubmit,
}: {
  data: GeneralFormItem[];
  setData: React.Dispatch<React.SetStateAction<GeneralFormItem[]>>;
  onSubmit: (e: FormEvent) => void;
}) => {
  // const [state, formAction] = useFormState(formHandler, { ss: 0 });
  // const [data, setData] = useState<GeneralFormItem[]>(items);

  const handlerImg = async (e: FileList | null, itemName: string) => {
    setData([
      ...data.map((s) => {
        if (s.name == itemName) {
          return {
            ...s,
            value: e?.item(0) as File,
          };
        }
        return s;
      }),
    ]);
  };

  return (
    <form onSubmit={onSubmit} className="w-6/12 flex flex-col gap-3">
      {data?.map((item, i) => {
        if (item.type != "select") {
          return (
            <div key={i} className="flex flex-col gap-2">
              <label htmlFor={item.name}>{item.title}</label>
              {item.type == "file" ? (
                <>
                  <input
                    required={item.required || false}
                    className="border px-3 py-2 rounded-md outline-none hover:border-blue-500"
                    accept="image/*"
                    multiple={false}
                    onChange={(e) => handlerImg(e.target.files, item.name)}
                    type={item.type}
                    name={item.name}
                    id={item.name}
                  />
                  {item.value && (
                    <Image
                      width={200}
                      height={200}
                      src={URL.createObjectURL(item.value as File)}
                      alt="img"
                    />
                  )}
                </>
              ) : (
                <input
                  required={item.required || false}
                  className="border px-3 py-2 rounded-md outline-none hover:border-blue-500"
                  value={data
                    .find((s) => s.name == item.name)
                    ?.value?.toString()}
                  onChange={(e) =>
                    setData([
                      ...data.map((s) => {
                        if (s.name == item.name) {
                          return {
                            ...s,
                            value: e.target.value,
                          };
                        }
                        return s;
                      }),
                    ])
                  }
                  type={item?.type || "text"}
                  name={item.name}
                  id={item.name}
                />
              )}
            </div>
          );
        } else {
          return (
            <div key={i} className="flex flex-col gap-2">
              <label htmlFor={item.name}>{item.title}</label>
              <select
                required={item.required || false}
                className="border px-3 py-2 rounded-md outline-none hover:border-blue-500"
                value={data.find((s) => s.name == item.name)?.value?.toString()}
                onChange={(e) =>
                  setData([
                    ...data.map((s) => {
                      if (s.name == item.name) {
                        return {
                          ...s,
                          value: e.target.value,
                        };
                      }
                      return s;
                    }),
                  ])
                }
                name={item.name}
              >
                {item?.options?.map((item, i) => (
                  <option key={i} value={item.name}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>
          );
        }
      })}
      <button
        type="submit"
        className="mt-2 px-5 py-1 bg-green-600 hover:bg-green-700 rounded-md text-white"
      >
        Submit
      </button>
    </form>
  );
};

export default GeneralForm_Nextjs;
