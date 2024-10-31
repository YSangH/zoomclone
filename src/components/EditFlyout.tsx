import {
    EuiFlyout,
    EuiFlyoutBody,
    EuiFlyoutHeader,
    EuiForm,
    EuiFormRow,
    EuiSpacer,
    EuiSwitch,
    EuiTitle
} from '@elastic/eui';
import { useEffect, useState } from 'react'
import { FieldErrorType, MeetingType, UserType } from '../utils/Types';
import { firebaseDB } from '../utils/FirebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';
import moment from 'moment';
import UseToast from '../hooks/UseToast';
import useAuth from "../hooks/UseAuth";
import useFetchUsers from "../hooks/UseFetchUsers";

import DateField from './form/DateField';
import MeetingButton from './form/MeetingButton';
import UserField from './form/UserField';
import MeetingMaximum from './form/MeetingMaximum';
import NameField from './form/NameField';

export default function EditFlyout({
    closeFlyout,
    meetings
}: {
    closeFlyout: any;
    meetings: MeetingType;
}) {
    useAuth();
    const [users] = useFetchUsers();
    const [createToast] = UseToast();
    
    const [meetingName, setMeetingName] = useState("");
    const [selectedUsers, setSelectedUsers] = useState<Array<UserType>>([]);
    const [startDate, setStartDate] = useState(moment());
    const [size, setSize] = useState(1);
    
    const [status, setStatus] = useState(false);
    const [meetingType] = useState(meetings.meetingType);
    
    const [showError] = useState<{
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
    
    useEffect(() => {
        if (users) {
            const foundUsers: Array<UserType> = [];
            meetings.invateUsers.forEach((user: string) => {
                const findUser = users.find(
                    (tempUser: UserType) => tempUser.uid === user
                );
                if (findUser) foundUsers.push(findUser);
            });
            setSelectedUsers(foundUsers);
      }
  },[meetings,users])  

  const onUserChange = (selectedOptions: any) => {
    setSelectedUsers(selectedOptions);
  };
  
    const editMeeting = async () => {
        const editedMeeting = {
            ...meetings,
            meetingName,
            meetingType,
            invatedUsers: selectedUsers.map((user: UserType) => user.uid),
            maxUsers: size,
            meetingDate: startDate.format("L"),
            status: !status,
        };
        delete editedMeeting.docId;
        const docRef = doc(firebaseDB, "meetings", meetings.docId!);
        await updateDoc(docRef, editedMeeting);
        createToast({ title: "Meeting updated successfully" , type: "success",});
        closeFlyout(true);
    }


    return (
        <EuiFlyout ownFocus onClose={() => closeFlyout()}>
            <EuiFlyoutHeader hasBorder>
                <EuiTitle size="m">
                    <h2>{meetings.meetingName}</h2>
                </EuiTitle>
            </EuiFlyoutHeader>
            <EuiFlyoutBody>
                <EuiForm>
                    <NameField
                        label="Meeting name"
                        isInvalid={showError.meetingName.show}
                        error={showError.meetingName.message}
                        placeholder="Meeting name"
                        value={meetingName}
                        setMeetingName={setMeetingName}
                    />
                    {meetingType === "anyone-can-join" ? (
                        <MeetingMaximum value={size} setValue={setSize} />
                    ) : (
                        <UserField
                            label="Invite Users"
                            isInvalid={showError.meetingUser.show}
                            error={showError.meetingUser.message}
                            options={users}
                            onChange={onUserChange}
                            selectedOptions={selectedUsers}
                            singleSelection={
                                meetingType === "1-by-1" ? { asPlainText: true } : false
                            }
                            isClearable={false}
                            placeholder="Select a Users"
                        />
                    )}
                    <DateField selected={startDate} setStartDate={setStartDate} />
                    <EuiFormRow display="columnCompressedSwitch" label="Cancel Meeting">
                        <EuiSwitch
                            showLabel={false}
                            label="Cancel Meeting"
                            checked={status}
                            onChange={(e) => setStatus(e.target.checked)}
                        />
                    </EuiFormRow>
                    <EuiSpacer />
                    <MeetingButton
                        createMeeting={editMeeting}
                        isEdit
                        closeFlyout={closeFlyout}
                    />
                </EuiForm>
            </EuiFlyoutBody>
        </EuiFlyout>
    );
}
