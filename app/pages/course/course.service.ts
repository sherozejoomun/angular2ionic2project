
export class CourseService {
    posts: any;

    getCoursesname(): string[] {
        return ["Math1289 Analysis ", "CSE1231 Programming Concepts", "SCI1723 Project Management", "SOC1221 Psychology"];
    }

    getCoursesimage(): string[] {
        return ["../../../image/math.jpg", "../../../image/programming.jpg", "../../../image/projectmng.jpg", "../../../image/psychology.jpg"];
    }
}