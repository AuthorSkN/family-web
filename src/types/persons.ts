import {Id} from "@/types/common";

export type Person = {
    id: Id;
    firstName: string;
    secondName: string;
    fatherName?: string;
    originalSecondName?: string;
    parents: {
        father?: Id;
        mother?: Id;
    }
}