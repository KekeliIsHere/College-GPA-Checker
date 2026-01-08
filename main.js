function gradeConverter(grade){
    switch (grade){
            case "A+":
                return 4.0;
            case "A":
                return 4.0;

            case "B+":
                return 3.5;
            case "B":
                return 3;
            case "C+":
                return 2.5;
            case "C":
                return 2;
            case "D+":
                return 1.5;
            case "D":
                return 1;
            case "E":
                return 0;
            default:
                console.log("Grade Not Found");
    }
}
numberOfCourses=5;
courseName=["Calculus","Statistics","Discrete structures and theory","Economics","Leadership"];
courseGrade=["A","A+","A+","A+","B+"];
courseCredits=[1,1,1,1,0.5];
let gradePoints=0;
let creditHours=0;
for(let i=0;i<numberOfCourses;i++){
    creditHours+=courseCredits[i];
    gradePoints+=gradeConverter(courseGrade[i])*courseCredits[i];
}
gpa=gradePoints/creditHours;
console.log(gpa);
