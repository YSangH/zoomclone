import { EuiButton, EuiFlexGroup, EuiFlexItem } from '@elastic/eui'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function MeetingButton({createMeeting} : {
    createMeeting: () => void;
}) {
    const navigate = useNavigate();
  return (
    <div>
        <EuiFlexGroup>
            <EuiFlexItem grow={false}>
                <EuiButton color='danger' fill onClick={()=> navigate('/')} >Cancel</EuiButton>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
                <EuiButton fill onClick={createMeeting} >submit</EuiButton>
            </EuiFlexItem>
        </EuiFlexGroup>
    </div>
  )
}

export default MeetingButton