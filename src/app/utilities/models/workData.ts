export interface workexpDataModel {
    company: string;
    job:string;
    description:string;
    duration:string;   
}

export interface timeDataModel {
    time: string;
    selected: boolean;
    // availableSlots: string
}
// export interface availableSlotModel{
//     availableSlots: any;
// }

export interface SearchModel {
   full_name: string;
   school: string;
   degree: string;
   board: string;
   company: string;
   job: string;
   id: number;
   profile_pic: string;
}

export interface InfoModel {
    name: string;
    higher_education:{
     
    };
    
    marks: string;
    degree: string;
    board: string;
    company: string;
    job: string;
    id: number;
    profile_pic: string;
 }
