export const getParticipantInfo = (members = [], userInfo) => {
    return members.find(member => member.id !== userInfo.id);
}