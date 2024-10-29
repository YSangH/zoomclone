import React, { useState } from "react";
import Header from "../components/Header";
import NameField from "../components/form/NameField";
import UserField from "../components/form/UserField";
import DateField from "../components/form/DateField";

import { EuiFlexGroup, EuiForm, EuiSpacer} from "@elastic/eui";
import useAuth from "../hooks/UseAuth";
import useFetchUsers from "../hooks/UseFetchUsers";
import moment from "moment";

// Elastic UI 아이콘 불러오기
import { appendIconComponentCache } from '@elastic/eui/es/components/icon/icon';
import { icon as EuiIconArrowDown } from '@elastic/eui/es/components/icon/assets/arrow_down';
import { icon as EuiIconCalendar} from '@elastic/eui/es/components/icon/assets/calendar';
import { icon as EuiIconSortLeft} from '@elastic/eui/es/components/icon/assets/sortLeft';
import { icon as EuiIconSortRight} from '@elastic/eui/es/components/icon/assets/sortRight';
import MeetingButton from "../components/form/MeetingButton";
import { FieldErrorType } from "../utils/Types";

// Elastic UI 아이콘 적용
appendIconComponentCache({
  arrowDown: EuiIconArrowDown,
  calendar: EuiIconCalendar,
  sortLeft: EuiIconSortLeft,
  sortRight: EuiIconSortRight,
});

function SingleMeeting() {
  useAuth();
  const [users] = useFetchUsers();
  const [meetingName, setMeetingName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [startDate, setStartDate] = useState(moment());
  const [showError, setShowError] = useState<{
    meetingName: FieldErrorType;
    meetingUser: FieldErrorType;
  }>({
    meetingName: {
      show: false,
      message: [],
    },
    meetingUser: {
      show: false,
      message: [],
    }
  });

  const onUserChange = (selectedOptions: any) => {
    setSelectedUsers(selectedOptions);
  };

  
  const validateForm = () => {
    let errors = false;
    const clonedShowError = {...showError}
    if (!meetingName.length) {
      clonedShowError.meetingName.show = true;
      clonedShowError.meetingName.message = ["Please Enter Meeting Name"];
      errors = true;
    } else {
      clonedShowError.meetingName.show = false;
      clonedShowError.meetingName.message = [];
    }
    if (!selectedUsers.length) {
      clonedShowError.meetingUser.show = true;
      clonedShowError.meetingUser.message = ["Please select a User"];
    }else {
      clonedShowError.meetingUser.show = false;
      clonedShowError.meetingUser.message = [];
    }
    setShowError(clonedShowError);
    return errors;
  };
  
  const createMeeting = () => {
    if (!validateForm()) {
    }
  };

  return (
    <div
    style={{
      display: "flex",
      height: "100vh",
      flexDirection: "column",
    }}
    >
      <Header />
      <EuiFlexGroup justifyContent="center" alignItems="center">
        <EuiForm>
          <NameField
            label="Meeting Name"
            placeholder="Meeting Name" 
            value={meetingName}
            setMeetingName={setMeetingName}
            isInvalid={showError.meetingName.show}
            error={showError.meetingName.message}
          />
          <UserField
            label="Invite User"
            options={users}
            onChange={onUserChange}
            selectedOptions={selectedUsers}
            singleSelection={{ asPlainText: true }}
            isClearable={false}
            placeholder="Select a user"
          />
          <DateField selected={startDate} setStartDate={setStartDate} />
        <EuiSpacer />
        <MeetingButton createMeeting={createMeeting}/>
        </EuiForm>
      </EuiFlexGroup>
    </div>
  );
}
export default SingleMeeting;
