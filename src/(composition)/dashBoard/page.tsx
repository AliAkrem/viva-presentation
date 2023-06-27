"use client";
import { useGeneralStateContext } from "@/context/generalContext";
import { Button } from "@mantine/core";
import React, { useState } from "react";

function DashBoard() {
  const { session } = useGeneralStateContext();

  const [counter, setCounter] = useState(0);

  return (
    <>
      <Button
        onClick={() => {
          setCounter((counter) => counter + 1);
        }}
        variant="light"
      >
        inc ++{" "}
      </Button>

      <p>{counter}</p>

      <pre>{JSON.stringify(session, null, 2)}</pre>
    </>
  );
}

export default DashBoard;
