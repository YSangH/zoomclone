import React, { useState } from "react";
import Header from "../components/Header";
import NameField from "../components/form/NameField";
import UserField from "../components/form/UserField";
import DateField from "../components/form/DateField";
import MeetingButton from "../components/form/MeetingButton";

import { EuiFlexGroup, EuiForm, EuiFormRow, EuiSpacer, EuiSwitch } from "@elastic/eui";
import { FieldErrorType, UserType } from "../utils/Types";
import { meetingRef } from "../utils/FirebaseConfig";
import { generateMeetingId } from "../utils/generateMeetingId";
import { addDoc } from "firebase/firestore";
import moment from "moment";

import useAuth from "../hooks/UseAuth";
import useFetchUsers from "../hooks/UseFetchUsers";
import { useAppSelector } from "../app/hooks";
import { useNavigate } from "react-router-dom";
import UseToast from "../hooks/UseToast";

// Elastic UI 아이콘 불러오기
import { appendIconComponentCache } from '@elastic/eui/es/components/icon/icon';
import { icon as EuiIconArrowDown } from '@elastic/eui/es/components/icon/assets/arrow_down';
import { icon as EuiIconCalendar} from '@elastic/eui/es/components/icon/assets/calendar';
import { icon as EuiIconSortLeft} from '@elastic/eui/es/components/icon/assets/sortLeft';
import { icon as EuiIconSortRight} from '@elastic/eui/es/components/icon/assets/sortRight';
import { Navigate } from "react-router-dom";
import MeetingMaximum from "../components/form/MeetingMaximum";

// Elastic UI 아이콘 적용
appendIconComponentCache({
  arrowDown: EuiIconArrowDown,
  calendar: EuiIconCalendar,
  sortLeft: EuiIconSortLeft,
  sortRight: EuiIconSortRight,
});

function VideoConference() {
  useAuth();
    const [users] = useFetchUsers();
    const [createToast] = UseToast();
    const navigate = useNavigate(); 
    const uid = useAppSelector((zoom) => zoom.auth.userInfo?.uid);
    const [meetingName, setMeetingName] = useState("");
    const [selectedUsers, setSelectedUsers] = useState<Array<UserType>>([]);
    const [startDate, setStartDate] = useState(moment());
    const [size, setSize] = useState(1);
    const [anyJoin, setAnyJoin] = useState(false);
    const [showError, setShowError] = useState<{
    meetingName: FieldErrorType;
    meetingUser: FieldErrorType;
    }>
    
    ({
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
  
  const createMeeting = async () => {
    if (!validateForm()) {
      const meetingId = generateMeetingId();
      await addDoc(meetingRef, {
        createdBy: uid,
        meetingId,
        meetingName,
        meetingType: anyJoin ? "anyone-can-join" : "video-conference",
        invitedUsers: anyJoin ? [] : selectedUsers.map((user: UserType) => user.uid),
        meetingDate: startDate.format("L"),
        maxUsers: anyJoin ? 100 : size,
        status: true,
      });
      createToast({
        title: anyJoin? "Anyone can join meeting created successfully" : "Video Conference created successfully",
        type: "Success",
      })
      navigate("/");
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
                  <EuiFormRow display="columnCompressedSwitch" label="Anyone can Join">
                      <EuiSwitch
                          showLabel={false}
                          label="Anyone can Join"
                          checked={anyJoin}
                          onChange={(e) => setAnyJoin(e.target.checked)}
                          compressed
                      />
                  </EuiFormRow>
                  <EuiSpacer />
            {anyJoin ? (
            <MeetingMaximum value={size} setValue={setSize} />
            ) : (
                <NameField
                label="Meeting Name"
                placeholder="Meeting Name" 
                value={meetingName}
                setMeetingName={setMeetingName}
                isInvalid={showError.meetingName.show}
                error={showError.meetingName.message}
                />
            )}
            <UserField
            label="Invite User"
            options={users}
            onChange={onUserChange}
            selectedOptions={selectedUsers}
            singleSelection={false}
            isClearable={false}
            placeholder="Select a user"
            isInvalid={showError.meetingUser.show}
            error={showError.meetingUser.message}
            />
          <DateField selected={startDate} setStartDate={setStartDate} />
        <EuiSpacer />
        <MeetingButton createMeeting={createMeeting}/>
        </EuiForm>
      </EuiFlexGroup>
    </div>
  );
}
export default VideoConference;
