import { useEffect } from "react";
import { connectToSocket } from "../../api/socket/socket";

const useSocket = (onNewPost: () => void) => {
    useEffect(() => {
        const socket = connectToSocket();

        const handleNewPost = () => {
            onNewPost();
        };

        socket.on('newPost', handleNewPost);

        return () => {
            socket.off('newPost', handleNewPost);
        };
    }, [onNewPost]);
};

export {useSocket};