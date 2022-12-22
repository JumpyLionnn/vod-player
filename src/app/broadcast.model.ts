export interface Message {
    _id: string;
    channel_id: string;
    commenter: {
        _id: string;
        bio: string | null;
        created_at: string;
        display_name: string;
        logo: string | null;
        name: string;
        type: string;
        updated_at: string;
    };
    content_id: string;
    content_offset_seconds: number;
    content_type: string;
    created_at: string;
    message: {
        bits_spent?: number;
        body: string;
        emoticons?: {
            _id: string;
            begin: number;
            end: number;
        }[]
        fragments: {
            text: string;
            emoticon: {
                emoticon_id: string;
                emoticon_set_id: string;
            } | null;
        }[];
        is_action: boolean;
        user_badges?: {
            _id: string;
            version: string;
        }[];
        user_color: string;
        user_notice_params: { [name: string]: string | undefined };
    },
    more_replies?: boolean;
    source: string;
    state: string;
    updated_at: string;
}

export interface Broadcast{
    title: string | null;
    videoUrl: string;
    startTime: number;
    userId: number;
    username: string;
    messages: Message[];
};