import { setReceivedMails } from "../../states/Reducers/AuthReducer";


export const fetchReceivedMails = async (currentMail, dispatch) => {
    try {
        const updatedReceiver = currentMail.replace(/[.@]/g, '');
        const response = await fetch(
            `https://mail-box-4cd6a-default-rtdb.firebaseio.com/mailbox/users/${updatedReceiver}/received.json`
        );
        if (response.ok) {
            const data = await response.json();
            if (data) {
                const mails = Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key],
                }));
                dispatch(setReceivedMails(mails));
            }
        } else {
            throw new Error('Failed to fetch received mails');
        }
    } catch (error) {
        console.log(error);
    }
};
