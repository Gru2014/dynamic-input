import React, { useState, useRef, useCallback } from "react";
import { Tag } from "../types/Tag";
import { availableTags, generateRandomId } from "../utils/utils";
import TagElement from "./TagElement";

const DynamicInput: React.FC = () => {
  const [inputElements, setInputElements] = useState<(string | Tag)[]>([]);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const addTag = useCallback((tag: string) => {
    const newTag: Tag = { id: generateRandomId(), label: tag };
    setInputElements((prev) => [...prev, newTag]);
    inputRef.current?.focus();
  }, []);

  const removeTag = useCallback((id: number) => {
    setInputElements((prev) =>
      prev.filter((el) => !(typeof el === "object" && el.id === id))
    );
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      // Handle backspace key when input is empty
      if (e.key === "Backspace" && inputValue === "" && inputElements.length > 0) {
        const lastElement = inputElements[inputElements.length - 1];

        if (typeof lastElement === "object") {
          // If the last element is a tag, remove it in one go
          setInputElements((prev) => prev.slice(0, -1));
        } else {
          // If the last element is a string, delete characters one by one
          setInputElements((prev) => {
            const newElements = [...prev];
            const lastString = newElements[newElements.length - 1] as string;

            if (lastString.length > 1) {
              newElements[newElements.length - 1] = lastString.slice(0, -1); // Remove one character
            } else {
              newElements.pop(); // Remove the entire string if it's a single character
            }

            return newElements;
          });
        }
      }
    },
    [inputValue, inputElements]
  );

  const handleInputBlur = useCallback(() => {
    if (inputValue.trim()) {
      setInputElements((prev) => [...prev, inputValue]);
      setInputValue("");
    }
  }, [inputValue]);

  return (
    <div className="w-full max-w-lg bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4">
        <div
          className="flex flex-wrap items-center border border-gray-300 rounded-md p-2"
          onClick={() => inputRef.current?.focus()}
        >
          {inputElements.map((el, index) => (
            <TagElement
              key={typeof el === "string" ? index : el.id}
              element={el}
              onRemove={removeTag}
            />
          ))}
          <input
            ref={inputRef}
            className="flex-grow px-2 py-1 outline-none text-sm"
            type="text"
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onBlur={handleInputBlur}
            placeholder="Type here..."
          />
        </div>
      </div>
      <div className="bg-gray-100 p-4">
        <div className="flex flex-wrap -m-1">
          {availableTags.map((tag) => (
            <button
              key={tag}
              onClick={() => addTag(tag)}
              className="m-1 px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-full hover:bg-blue-600 transition-colors duration-200"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DynamicInput;
