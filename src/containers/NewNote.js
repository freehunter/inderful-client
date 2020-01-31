import React, { useRef, useState } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./NewNote.css";
import { API } from "aws-amplify";

export default function NewNote(props) {
  const file = useRef(null);
  const [content, setContent] = useState("");
  const [content2, setContent2] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return content.length > 0;
  }

  function handleFileChange(event) {
    file.current = event.target.files[0];
  }
  
  async function handleSubmit(event) {
    event.preventDefault();
  
    setIsLoading(true);
  
    try {
      const happy = content2
      console.log(happy)
  
      await createNote({ content, happy });
      props.history.push("/");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }
  
  function createNote(note) {
    return API.post("notes", "/notes", {
      body: note
    });
  }

  return (
    <div className="NewNote">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="content">
        <ControlLabel>What city did you spend most of the day in?</ControlLabel>
          <FormControl
            value={content}
            componentClass="textarea"
            onChange={e => setContent(e.target.value)}
          />
        </FormGroup>
        
        <FormGroup controlId="content">
        <ControlLabel>Were you generally happy today?</ControlLabel>
          <FormControl
            value={content2}
            componentClass="textarea"
            onChange={e2 => setContent2(e2.target.value)}
          />
        </FormGroup>

        <LoaderButton
          block
          type="submit"
          bsSize="large"
          bsStyle="primary"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Create
        </LoaderButton>
      </form>
    </div>
  );
}