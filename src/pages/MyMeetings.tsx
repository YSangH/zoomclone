import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import UseAuth from '../hooks/UseAuth'
import { MeetingType } from '../utils/Types'
import { meetingRef } from '../utils/FirebaseConfig'
import { getDocs, query, where } from 'firebase/firestore'
import { useAppSelector } from '../app/hooks'
import {
    EuiBadge,
    EuiBasicTable,
    EuiButtonIcon,
    EuiCopy,
    EuiFlexGroup,
    EuiFlexItem,
    EuiPanel
} from '@elastic/eui'
import moment from 'moment'
import { Link } from 'react-router-dom'

function MyMeetings() {
    UseAuth();
    const [meeting, setMeeting] = useState<Array<any>>([]);
    const userInfo = useAppSelector(zoom => zoom.auth.userInfo);
    useEffect(() => {
        console.log('in effect',userInfo);
        if (userInfo) {
            const getMyMeetings = async () => {
                const firestoreQuery = query(
                    meetingRef,
                    where("createBy", "==", userInfo?.uid)
                );
                const fetchedMeetings = await getDocs(firestoreQuery);
                if (fetchedMeetings.docs.length) {
                    const myMeetings: Array<MeetingType> = [];
                    fetchedMeetings.forEach((meeting) => {
                        myMeetings.push({
                            docId: meeting.id,
                            ...(meeting.data() as MeetingType),
                        });
                    });
                    setMeeting(myMeetings);
                }
            };
            getMyMeetings();
        }
    }, [userInfo]);
    
    const columns = [
        {
            field: "MeetingName",
            name: "Meeting Name",
        },
        {
            field: "MeetingType", 
            name: "Meeting Type",
        },
        {
            field: "MeetingDate",
            name: "Meeting Date",
        },
        {
            field: "",
            name: "Status",
            render: (meeting: MeetingType) => {
                if (meeting.status) {
                    if (meeting.meetingDate === moment().format("L")) {
                        return (<EuiBadge color='success'>
                            <Link
                                style={{ color: "black" }}
                                to={`/join/${meeting.meetingId}`}>
                                Join Now
                            </Link>
                        </EuiBadge>
                        );
                    } else if (moment(meeting.meetingDate).isBefore(moment().format("L"))
                    ) {
                        return <EuiBadge color='default'>Ended</EuiBadge>;
                    } else {
                        return <EuiBadge color='primary'>Upcoming</EuiBadge>;
                    }
                } else return <EuiBadge color='danger'>Cancelled</EuiBadge>;
            },
        },
        {
            field: "",
            name: "Edit",
            render: (meeting: MeetingType) => {
                <EuiButtonIcon
                    aria-label='meeting-edit'
                    iconType='indexEdit'
                    color='danger'
                    display='base'
                    isDisabled={!meeting.status || moment(meeting.meetingDate).isBefore(moment().format("L"))
                    }
                />;
            }
        },
        {
            field: "MeetingId",
            name: "Copy Link",
            render: (meetingId: string) => {
                return (<EuiCopy textToCopy={`${process.env.REACT_APP_HOST}/join/${meetingId}`}>
                    {(copy: any) => 
                        <EuiButtonIcon
                            iconType="copy"
                            onClick={copy}
                            display='base'
                        aria-label='Meeting-copy'
                        />
                    }
                </EuiCopy>);
            },
        },
    ];
    return (
      <div 
      style={{
      display: "flex",
      height: "100vh",
      flexDirection: "column",
    }}>
            <Header />
            <EuiFlexGroup justifyContent='center' style={{margin: "1rem"}}>
                <EuiFlexItem>
                    <EuiPanel>
                        <EuiBasicTable items={meeting} columns={meeting} />
                    </EuiPanel>
                </EuiFlexItem>
            </EuiFlexGroup>
    </div>
  )
}

export default MyMeetings