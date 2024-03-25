export interface DeckData {
    title: string;
    descr: string;
    tags: string[];
    deadline: Date | null;
    isEduc: boolean;
    isPriv: boolean;
}