import React from "react";
import Header from "../components/Header";
import UseAuth from "../hooks/UseAuth";
import { EuiFlexGroup, EuiFlexItem, EuiCard, EuiImage } from "@elastic/eui";
import meeting1 from "../assets/meeting1.png";
import meeting2 from "../assets/meeting2.png";
import { useNavigate } from "react-router-dom";

function CreateMeeting() {
  UseAuth();
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <Header />
      <EuiFlexGroup
        justifyContent="center"
        alignItems="center"
        style={{ margin: "5vh 10vw" }}
      >
        <EuiFlexItem>
          <EuiCard
            icon={<EuiImage size="5rem" alt="icon" src={meeting1} />}
            title={"Create 1 by 1 Meeting"}
            description="Create a personal single person meeting "
            onClick={() => navigate("/1by1")}
            paddingSize="xl"
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiCard
            icon={<EuiImage size="5rem" alt="icon" src={meeting2} />}
            title={"Create Video Conference"}
            description="invite multiple persons to the meeting"
            onClick={() => navigate("/videoconference")}
            paddingSize="xl"
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  );
}

export default CreateMeeting;
