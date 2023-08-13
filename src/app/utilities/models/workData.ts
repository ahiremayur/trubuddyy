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
   username:string;
}

export interface JobModel {

  
    company: string;
    description: string;
  

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

 export interface PersonalityModel {
  strengths: string;
  weakness: string;
  likes: string;
  dislikes: string;
  describeMe: string
}

export interface SessionDataMentorModel {

date: string;
meet_link: string;
isPaid: boolean;
create_zoom_link: string;
mentee: string;
contact: string

}

export interface SessionDataMenteeModel {
  date: string;
  meet_link: string;
  isPaid: boolean;
  create_zoom_link: string;
  mentor: string;
  contact: string

  }