export type User = {
    id: string;
    first_name?: string;
    tg_username?: string;
    tg_id: string;
    photo_url?: string;
    created_at: string;
}

export type tgUser = {
    first_name?: string,
    username?: string,
    id: string,
    photo_url?: string,
}