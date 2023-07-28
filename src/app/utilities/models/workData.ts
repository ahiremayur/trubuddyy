export interface workexpDataModel {
    company: string;
    job:string;
    description:string;
    duration:string; 
    id: number;
    user_id: number;  
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
    higher_education:[
        {
            id: number,
            user_id: number,
            qualification:string,
            degree: string,
            marks: string,
            school: string,
            year: string,
          },

          {
            id: number,
            user_id: number,
            qualification: string,
            degree: string,
            marks: string,
            school: string,
            year: string,
          },
          {
            id: number,
            user_id: number,
            qualification: string,
            degree:string,
            marks: string,
            school: string,
            year: string,
          },
    ];

    school_education:[
        {
            id: number,
            user_id: number,
            qualification:string,
            degree: string,
            marks: string,
            school: string,
            year: string,
          },

          {
            id: number,
            user_id: number,
            qualification: string,
            degree: string,
            marks: string,
            school: string,
            year: string,
          },
        
    ];
  
      board: string;
      company: string;
      job: string;
      // id: number;
      
    
    marks: string;
    degree: string;
  
    profile_pic: string;
    description:string;
    duration:string; 
    user_id: number;
    id: number;

 }
