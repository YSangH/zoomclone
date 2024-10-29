export const generateMeetingId = () => {
    let meetingID = "";
    const chars =
        "1234567890qwertyiuopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
    const maxPos = chars.length;
    for (let i = 0; i < 8; i++){
        meetingID += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return meetingID;
}