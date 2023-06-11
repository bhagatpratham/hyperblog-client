/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { account, storage } from "../../config";

const Upload = () => {
  const [file, setFile] = useState();

  const uploadFile = async (e) => {
    e.preventdefault();
    const user = await account.getSession("current");

    if (user) {
      const newFile = await storage.createFile(file, ["*"], ["*"]);
      console.log(newFile);
    }
  };

  return (
    <div>
      <div>
        <form>
          <div>
            <label>
              <b>Upload your file</b> :
            </label>
            <input
              onChange={(e) => {
                setFile(e.target.value);
              }}
              type="file"
            />
          </div>
          <button onClick={(e) => uploadFile(e)}>Upload</button>
        </form>
      </div>
    </div>
  );
};

export default Upload;
