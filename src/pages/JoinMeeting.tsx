import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { firebaseAuth, meetingRef } from '../utils/FirebaseConfig';
import { useNavigate, useParams } from 'react-router-dom';
import UseToast from '../hooks/UseToast';
import { getDocs, query, where } from 'firebase/firestore';
import moment from 'moment';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { generateMeetingId } from '../utils/generateMeetingId';

export default function JoinMeeting() {
    const params = useParams();
    const navigate = useNavigate();
    const [createToast] = UseToast();
    const [isAllowed, setIsAllowed] = useState(false);
    const [user, setUser] = useState<any>(undefined);
    const [userLoaded, setUserLoaded] = useState(false);
    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (currentUser) {
            setUser(currentUser);
        }
        setUserLoaded(true)
    });
  
    useEffect(() => {
        const getMeetingData = async () => { 
            if (params.id && userLoaded) {
            const firestoreQuery = query(
                meetingRef,
                where("meetingId", "==", params.id)
            );
            const fetchedMeetings = await getDocs(firestoreQuery);
                if (fetchedMeetings.docs.length) {
                    const meeting = fetchedMeetings.docs[0].data();
                    const isCreator = meeting.createBy === user?.uid;
                    if (meeting.meetingType === "1-by-1") {
                        if (meeting.invateUsers[0] === user?.uid || isCreator) {
                            if (meeting.meetingDate === moment().format("L")) {
                                setIsAllowed(true);
                            } else if (
                                moment(meeting.meetingDate).isBefore(moment().format("L"))
                            ) {
                                createToast({ title: "Meeting has ended", type: "danger" });
                                navigate(user ? "/" : "/login");
                            } else if (
                                moment(meeting.meetingDate).isAfter()) {
                                createToast({
                                    title: `Meeting is on ${meeting.meetingDate}`,
                                    type: "warning",
                                });
                                navigate(user ? "/" : "/login");
                            }
                        } else navigate(user ? "/" : "/login");
                    } else if (meeting.meetingType === "viedo-conference") {
                         const index = meeting.invitedUsers.findIndex(
              (invitedUser: string) => invitedUser === user?.uid
            );
            if (index !== -1 || isCreator) {
              if (meeting.meetingDate === moment().format("L")) {
                setIsAllowed(true);
              } else if (
                moment(meeting.meetingDate).isBefore(moment().format("L"))
              ) {
                createToast({ title: "Meeting has ended.", type: "danger" });
                navigate(user ? "/" : "/login");
              } else if (moment(meeting.meetingDate).isAfter()) {
                createToast({
                  title: `Meeting is on ${meeting.meetingDate}`,
                  type: "warning",
                });
              }
            } else {
              createToast({
                title: `You are not invited to the meeting.`,
                type: "danger",
              });
              navigate(user ? "/" : "/login");
            }
                    }else {
                        setIsAllowed(true); 
                    }
                } else navigate("/");
            }
        };
        getMeetingData();
    }, [userLoaded]);
    const appId = 1254178188;
    const serverSecret = "da6d772357f9f6435866e40db685197c";

    const myMeeting = async (element: any) => {
        const KitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appId,
            serverSecret,
            params.id as string,
            user.displayName ? user.displayName : generateMeetingId()
        );
        const zp = ZegoUIKitPrebuilt.create(KitToken);
        zp.joinRoom({
            container: element,
            maxUsers: 50,
            sharedLinks: [
                {
                    name: "Personal Link",
                    url: window.location.origin,
                },
            ],
            scenario: {
                mode: ZegoUIKitPrebuilt.VideoConference,
            },
        })
    }


    return (
        <div>
            {isAllowed && ( 
                <div
                className='myCallContainer'
                ref={myMeeting}
                style={{width: "100%", height: "100vh"}}
                >
            </div>
            )}
      </div>
  )
}
