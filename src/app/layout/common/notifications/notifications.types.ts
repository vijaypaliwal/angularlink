export interface Notification {
    id: string;
    icon?: string;
    image?: string;
    title?: string;
    description?: string;
    time: string;
    link?: string;
    useRouter?: boolean;
    read: boolean;
    reqid?: string;
    userId?: string;
    isAccecpted: boolean;
    Id: string;

}
