import React, {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import {Button, Error, FormField, Input, Label, Textarea} from "../styles";

function UpdateLog({user, onUpdateLog}) {
    const [log, setLog] = useState(null)
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams()

    const [logs, setLogs] = useState(user.logs);

    useEffect(() => {
        const foundLog = user.logs.find((log) => {
            return log.id == id
        });
        if (foundLog) {
            setLog(foundLog);
        }
    }, [id]);

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);

        const logData = { exercise_id: log.exercise_id, repetition_count: log.repetition_count, repetition_type: log.repetition_type };

        fetch(`/logs/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(logData),
        }).then((r) => r.json())
            .then((log) => {
            setIsLoading(false);
            if (id) {
                const updatedLogs = logs.map((l) => (l.id == log.id ? log : l));
                setLogs(updatedLogs);
            } else {
                setLogs((prevLogs) => [...prevLogs, log]);
            }
            setIsLoading(false);
            onUpdateLog(log); // call callback function here
            navigate("/history");
        }).catch((err) => {
            setErrors(["Something went wrong. Please try again."]);
            setIsLoading(false);
        });
    }

 // field is the way to pull onChange for every type of field i have below
 // for example onChange={onChange("exercise_id")}
    const onChange = (field) => (event) => {

        setLog({ [field]: event.target.value })
        return event
    }


    return (
        <Wrapper>
            <WrapperChild>
                <h2>Update Log</h2>
                {log ?
                    <form onSubmit={handleSubmit}>
                        <FormField>
                            <Label htmlFor="exercise_title">Exercise title</Label>
                            <Input
                                type="text"
                                id="exerciseTitle"
                                value={log.title}
                                disabled={true}
                            />
                        </FormField>
                        <FormField>
                            <Label htmlFor="exercise_description">Exercise description</Label>
                            <Textarea
                                id="description"
                                rows="5"
                                value={log.description}
                                disabled={true}
                            />
                        </FormField>
                        <FormField>
                            <Label htmlFor="repetitionCount">Repetition count</Label>
                            <Input
                                type="number"
                                id="repetitionCount"
                                value={log.repetition_count}
                                onChange={onChange("repetition_count")}
                                
                                
                            />
                        </FormField>
                        <FormField>
                            <Label htmlFor="repetitionType">Repetition type</Label>
                            <Input
                                type="text"
                                id="repetitionType"
                                value={log.repetition_type}
                                onChange={onChange("repetition_type")}
                            />
                        </FormField>
                        <FormField>
                            <Button color="primary" type="submit">
                                {isLoading ? "Loading..." : "Update Log"}
                            </Button>
                        </FormField>
                        <FormField>
                            {errors.map((err) => (
                                <Error key={err}>{err}</Error>
                            ))}
                        </FormField>
                    </form> : null
                }
            </WrapperChild>
        </Wrapper>
    );
}

const Wrapper = styled.section`
  max-width: 1000px;
  margin: 40px auto;
  padding: 16px;
  display: flex;
  gap: 24px;
`;

const WrapperChild = styled.div`
  flex: 1;
`;

export default UpdateLog;