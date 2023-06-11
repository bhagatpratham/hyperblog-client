// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import Editor from "./Editor";

const FileUploader = () => {
  const [file, setFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(null);
  const [userText, setUserText] = useState("");
  const [responseFromServer, setResponseFromServer] = useState(null); // add this line
  const [selectedOption, setSelectedOption] = useState("beginner");
  const [selectedTone, setSelectedTone] = useState("informal");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleToneChange = (event) => {
    setSelectedTone(event.target.value);
  };

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
    setUploadSuccess(null);
  };

  const onUserTextInput = (event) => {
    setUserText(event.target.value);
  };

  const onFileUpload = () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "userText",
      `Write an article for ${selectedOption} level audience on this subject ` +
        `${userText}, I Want You To Act As A Content Writer Very Proficient SEO Writer Writes Fluently. First Create Two Tables. First Table Should be the Outline of the Article and the Second Should be the Article. Bold the Heading of the Second Table using Markdown language. Write an outline of the article separately before writing it, Use H1 H2 H3 And H4 Headings  Then, start writing based on that outline step by step. Write= 100% Unique, SEO-optimized, Human-Written article with = headings and subheadings #Including H1 H2 H3 And H4 Headings that covers the topic provided in the Prompt. Write The article In Your Own Words Rather Than Copying And Pasting From Other Sources. ` +
        `Write In A Conversational Style As Written By A Human #Use An ${selectedTone} Tone Utilize Personal Pronouns Keep It Simple Engage The Reader Use The Active Voice Keep It Brief Use Rhetorical Questions And Incorporate Analogies And Metaphors.  End with a conclusion paragraph and 5 unique FAQs After The Conclusion. this is important to Bold the Title and all headings of the article, and use appropriate headings for H tags.`
    );

    axios
      .post("http://localhost:5000/upload", formData)
      .then((response) => {
        setUploadSuccess("File upload successful");
        setResponseFromServer(`Response: ${response.data.response.response}`);
        // add this line
      })
      .catch((error) => {
        console.error("Error uploading file: ", error);
      });
  };

  return (
    <div>
      <div className="userInput">
        <h1 className="h1">HyperBlog.io</h1>
        <h2 className="h2">Ship Your Blogs 10X Faster🚀 With AI 🪄</h2>
        <input
          className="takeFile inputs"
          type="file"
          onChange={onFileChange}
        />
        <input
          className="takeText inputs"
          type="text"
          placeholder="Enter text"
          onChange={onUserTextInput}
        />
      </div>
      <form className="mod-forms">
        <div>
          <label>
            <input
              type="radio"
              value="beginner"
              checked={selectedOption === "beginner"}
              onChange={handleOptionChange}
            />
            Beginner
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="intermediate"
              checked={selectedOption === "intermediate"}
              onChange={handleOptionChange}
            />
            Intermediate
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="expert"
              checked={selectedOption === "expert"}
              onChange={handleOptionChange}
            />
            Expert
          </label>
        </div>
      </form>
      <form className="mod-forms">
        <div>
          <label>
            <input
              type="radio"
              value="informal"
              checked={selectedTone === "informal"}
              onChange={handleToneChange}
            />
            Informal
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="formal"
              checked={selectedTone === "formal"}
              onChange={handleToneChange}
            />
            Formal
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="neutral"
              checked={selectedTone === "neutral"}
              onChange={handleToneChange}
            />
            Neutral
          </label>
        </div>
      </form>
      <button className="uploadBtn" onClick={onFileUpload}>
        Generate ✨
      </button>
      {uploadSuccess && <p>{uploadSuccess}</p>}
      {responseFromServer && (
        <div>
          <Editor response={responseFromServer} />
          {/* <h3>Response from server:</h3>
          <p>{responseFromServer}</p> */}
        </div>
      )}
    </div>
  );
};

export default FileUploader;
