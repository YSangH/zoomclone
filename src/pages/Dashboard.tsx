import React from "react";
import { useAppSelector } from "../app/hooks";
import UseAuth from "../hooks/UseAuth";
import { useNavigate } from "react-router-dom";
import { EuiCard, EuiFlexGroup, EuiImage, EuiFlexItem } from "@elastic/eui";
import dashboard1 from "../assets/dashboard1.png";
import dashboard2 from "../assets/dashboard2.png";
import dashboard3 from "../assets/dashboard3.png";
import Header from "../components/Header";

function Dashboard() {
  UseAuth();
  const navigate = useNavigate();
  return (
    <>
      {/* Dashboard의 전체 영역 */}
      <div
        style={{
          display: "flex",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <Header />
        {/* ≒ flexContainer */}
        <EuiFlexGroup
          justifyContent="center"
          alignItems="center"
          style={{ margin: "5vh 10vw" }}
        >
          {/* 카드 영역 */}
          <EuiFlexItem>
            <EuiCard
              icon={<EuiImage size="5rem" alt="icon" src={dashboard1} />}
              title={"create Meeting"}
              description="Create a meeting and invite your people"
              onClick={() => navigate("/create")}
              paddingSize="xl"
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiCard
              icon={<EuiImage size="5rem" alt="icon" src={dashboard2} />}
              title={"My Meeting"}
              description="View your create meeting"
              onClick={() => navigate("/mymeetings")}
              paddingSize="xl"
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiCard
              icon={<EuiImage size="5rem" alt="icon" src={dashboard3} />}
              title={"Meeting"}
              description="View the meetings that you are invite to"
              onClick={() => navigate("/create")}
              paddingSize="xl"
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    </>
  );
}

export default Dashboard;
