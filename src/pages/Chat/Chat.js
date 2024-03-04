import React, { useEffect, useState, useContext } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat, Channel, ChannelList, Window, ChannelHeader, MessageList, MessageInput } from 'stream-chat-react';
import 'stream-chat-react/dist/css/index.css';

import AdminNavbar from '../../components/AdminNavbar';
import { AuthContext } from '../../Hooks/InfoContext';

const ChatComponent = () => {
    const { userInfo, streamToken } = useContext(AuthContext);
    const [client, setClient] = useState('');
    const [selectedChannel, setSelectedChannel] = useState(null);

    const chatClient = StreamChat.getInstance('77k783gt8gs7');

    useEffect(() => {
        const initChat = async () => {
            await chatClient.connectUser(
                {
                    id: userInfo.id,
                    name: userInfo.username,
                    // image: 'user-image-url' (if available)
                },
                streamToken // Token generated from your backend
            );
            console.log('InitCHat triggered')
            console.log('userInfo', userInfo.id, userInfo.username)
            setClient(chatClient);
        };

        if (userInfo && streamToken) {
            initChat();
            console.log("userinfo and streamToken is not null")
        }

        return () => {
            chatClient.disconnectUser();
        };

    }, [userInfo, streamToken]);

    if (!client || !selectedChannel) {
        return <div className='container'>
            Loading chat... 
        </div>;
    }


    return (
        <div className='container'>
            <AdminNavbar />
            <div className='right-side'>
                <Chat client={client}>
                    <div className='chat-container'>
                        <ChannelList onSelect={(channel) => setSelectedChannel(channel)} />
                        {selectedChannel && (
                            <Channel channel={selectedChannel}>
                                <Window>
                                    <ChannelHeader />
                                    <MessageList />
                                    <MessageInput />
                                </Window>
                            </Channel>
                        )}
                    </div>
                </Chat>
            </div>
        </div>
    );
};

export default ChatComponent;
