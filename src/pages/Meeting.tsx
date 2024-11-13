import React, { useCallback, useEffect, useState } from 'react'
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

import { appendIconComponentCache } from '@elastic/eui/es/components/icon/icon';
import { icon as EuiIconCopy } from '@elastic/eui/es/components/icon/assets/copy';

appendIconComponentCache({
  copy: EuiIconCopy,
});

function Meeting() {
    UseAuth();
    const userInfo = useAppSelector((zoom) => zoom.auth.userInfo);
    const [meetings, setMeetings] = useState<Array<MeetingType>>([]);
    
    useEffect(() => {
        if (userInfo) {
            const getUserMeetings = async () => {
                const firestoreQuery = query(meetingRef);
                const fetchedMeetings = await getDocs(firestoreQuery);
                if (fetchedMeetings.docs.length) {
                    const myMeetings: Array<MeetingType> = []
                    fetchedMeetings.forEach((meeting) => {
                        const data = meeting.data() as MeetingType;
                        if (data.createdBy === userInfo?.uid) myMeetings.push(data);
                        else if (data.meetingType === "anyone-can-join") myMeetings.push(data);
                        else {
                            const index = data.invateUsers.findIndex(user => user === userInfo.uid)
                            if (index !== -1) {
                                myMeetings.push(data);
                            }
                        }
                    });
                    setMeetings(myMeetings); 
                }
            }
            getUserMeetings();
        }
    }, [userInfo]);
    
    const meetingColumns = [
        {
            field: "meetingName",
            name: "Meeting Name",
        },
        {
            field: "meetingType", 
            name: "Meeting Type",
        },
        {
            field: "meetingDate",
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
            field: "MeetingId",
            name: "Copy Link",
            render: (meetingId: string) => {
                return (<EuiCopy textToCopy={`${import.meta.env.VITE_REACT_APP_HOST}/join/${meetingId}`}>
                    {(copy: any) => ( 
                        <EuiButtonIcon
                            iconType="copy"
                            onClick={copy}
                            display='base'
                        aria-label='Meeting-copy'
                        />
                    )}
                </EuiCopy>
                );
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
                    <EuiBasicTable items={meetings} columns={meetingColumns} />
                </EuiPanel>
            </EuiFlexItem>
        </EuiFlexGroup>
    </div>
    )
}

export default Meeting;